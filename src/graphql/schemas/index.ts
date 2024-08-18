export const typeDefs = `
  type League {
    id: String
    name: String
    code: String
    areaName: String
  }

  type Team {
    id: String
    name: String
    tla: String
    shortName: String
    areaName: String
    address: String
    players: [Player]
    coach: Coach
  }

  type Player {
    id: String
    name: String
    position: String
    dateOfBirth: String
    nationality: String
  }

  type Coach {
    name: String
    dateOfBirth: String
    nationality: String
  }

  type Query {
    players(leagueCode: String!, teamName: String): [Player]
    team(name: String!): Team
    leagues: [League]
  }

  type Mutation {
    importLeague(leagueCode: String!): ImportResponse
  }

  type ImportResponse {
    message: String
    jobId: String
  }
`;
