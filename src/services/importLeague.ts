import { Types } from 'mongoose';
import { Coach } from '../db/models/Coach';
import { League } from '../db/models/League';
import { Player } from '../db/models/Player';
import { Team } from '../db/models/Team';
import { fetchLeagueData, fetchTeamsInLeague, fetchTeamSquad } from './footballAPI';

export async function importLeague(leagueCode: string) {
  if (!leagueCode) {
    throw new Error("leagueCode is required");
  }

  const leagueData = await fetchLeagueData(leagueCode);

  const league = await League.findOneAndUpdate(
    { code: leagueCode },
    {
      name: leagueData.name,
      code: leagueData.code,
      areaName: leagueData.area.name,
    },
    { new: true, upsert: true }
  );

  const teams = await fetchTeamsInLeague(leagueCode);

  for (const teamData of teams) {
    const team = await Team.findOneAndUpdate(
      { tla: teamData.tla },
      {
        name: teamData.name,
        tla: teamData.tla,
        shortName: teamData.shortName,
        areaName: teamData.area.name,
        address: teamData.address,
        $addToSet: { leagues: league._id },
        players: [],
        coach: undefined
      },
      { new: true, upsert: true }
    );

    if (!team._id) {
      continue;
    }

    const squad = await fetchTeamSquad(teamData.id);

    if (squad.length > 0) {
      const playerIds = await Promise.all(
        squad.map(async (playerData) => {
          const player = await Player.findOneAndUpdate(
            { name: playerData.name, team: team._id },
            {
              name: playerData.name,
              position: playerData.position,
              dateOfBirth: playerData.dateOfBirth,
              nationality: playerData.nationality,
              team: team._id,
            },
            { new: true, upsert: true }
          );
          return player._id;
        })
      );

      team.players = playerIds as Types.ObjectId[];
      await team.save();
    } else {
      const coach = await Coach.findOneAndUpdate(
        { name: teamData.coach?.name },
        {
          name: teamData.coach?.name || 'Unknown Coach',
          dateOfBirth: teamData.coach?.dateOfBirth || 'Unknown',
          nationality: teamData.coach?.nationality || 'Unknown',
          team: team._id,
        },
        { new: true, upsert: true }
      );
      team.coach = coach._id as Types.ObjectId;
      await team.save();
    }
  }

  return league;
}
