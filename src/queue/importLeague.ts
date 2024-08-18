/* eslint-disable no-console */
import { Queue, Worker, QueueEvents } from 'bullmq';
import { importLeague } from '../services/importLeague';
import env from '../environment';

const redisConfig = {
  host: env.redisUrl,
  port: env.redisPort,
};

export const importQueue = new Queue('importLeagueQueue', {
  connection: redisConfig,
});

export const queueEvents = new QueueEvents('importLeagueQueue', {
  connection: redisConfig,
});

queueEvents.on('completed', ({ jobId }) => {
  console.log(`Job ${jobId} has been completed`);
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
  console.error(`Job ${jobId} has failed with reason ${failedReason}`);
});


export const importWorker = new Worker(
  'importLeagueQueue',
  async (job) => {
    const { leagueCode } = job.data;
    console.log(`Processing job for league: ${leagueCode}`);

    try {
      await importLeague(leagueCode);
      console.log(`League ${leagueCode} imported successfully`);
    } catch (error) {
      console.error(`Failed to import league ${leagueCode}:`, error);
      throw error;
    }
  },
  {
    connection: redisConfig,
  }
);
