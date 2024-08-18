import { Coach } from '../../db/models/Coach';
import { handleError } from '../../utils/errorHandler';

export const coachResolver = {
  Query: {
    async coaches(_: unknown, { teamName }: { teamName?: string }) {
      try {
        const query: { teamName?: string } = {};
        if (teamName) {
          query.teamName = teamName;
        }

        const coaches = await Coach.findOne({
          where: query,
        });

        if (!coaches) {
          throw new Error('No coaches found for the given criteria');
        }

        return coaches;
      } catch (error) {
        handleError(error, 'Error fetching coaches');
      }
    }
  }
};
