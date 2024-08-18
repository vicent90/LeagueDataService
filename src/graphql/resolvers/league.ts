import { League } from '../../db/models/League';
import { importQueue } from '../../queue/importLeague';
import { handleError } from '../../utils/errorHandler';

export const leagueResolver = {
  Mutation: {
    async importLeague(_: unknown, { leagueCode }: { leagueCode: string }) {
      try {
        const job = await importQueue.add('importLeagueJob', { leagueCode });
        return {
          message: 'Import process started',
          jobId: job.id,
        };
      } catch (error) {
        handleError(error, 'Import process start');
      }
    },
  },
  Query: {
    async leagues() {
      try {
        const leagues = await League.find();
        return leagues;
      } catch (error) {
        handleError(error, 'Fetching leagues');
      }
    },
  },
};
