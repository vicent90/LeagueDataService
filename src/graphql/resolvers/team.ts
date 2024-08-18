import { Coach } from "../../db/models/Coach";
import { Player } from "../../db/models/Player";
import { Team } from "../../db/models/Team";
import { handleError } from "../../utils/errorHandler";

export const teamResolver = {
  Query: {
    async team(_: unknown, { name }: { name: string }) {
      try {
        const team = await Team
          .findOne({ name })
          .populate({ path: 'players', model: Player })
          .populate({ path: 'coach', model: Coach });

        if (!team) {
          throw new Error('Team not found');
        }

        return team;
      } catch (error) {
        handleError(error, 'Error fetching team');
      }
    }
  }
};
