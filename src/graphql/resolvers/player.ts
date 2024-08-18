import { Team } from "../../db/models/Team";
import { League } from "../../db/models/League";
import { handleError } from "../../utils/errorHandler";

export const playerResolver = {
  Query: {
    async players(_: unknown, { leagueCode, teamName }: { leagueCode: string, teamName?: string }) {
      try {
        const league = await League.findOne({ code: leagueCode });
        if (!league) {
          throw new Error(`No league found with code ${leagueCode}`);
        }

        const teams = await Team.find({
          leagues: { $in: [league._id] },
          ...(teamName && { name: teamName })
        }).populate('players');

        const players = teams.flatMap(team => team.players);

        return players;
      } catch (error) {
        handleError(error, 'Error fetching players');
      }
    }
  }
};
