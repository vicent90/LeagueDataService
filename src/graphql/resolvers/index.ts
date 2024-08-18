import { leagueResolver } from './league';
import { teamResolver } from './team';
import { playerResolver } from './player';

export const resolvers = {
  Query: {
    ...teamResolver.Query,
    ...playerResolver.Query,
    ...leagueResolver.Query,
  },
  Mutation: {
    ...leagueResolver.Mutation,
  }
};