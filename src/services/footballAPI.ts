/* eslint-disable no-console */
import axios from 'axios';
import env from '../environment';
import { League, Player, Team, TeamSquad } from './types';

const apiClient = axios.create({
  baseURL: env.footballApiUrl,
  headers: {
    'X-Auth-Token': env.footballApiKey,
  },
});

async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      const retryAfter = parseInt(error.response.headers['x-requestcounter-reset'], 10) || 60;
      console.error(`Rate limit reached. Retrying after ${retryAfter} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      return fetchData<T>(endpoint);
    }
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }
}
export async function fetchLeagueData(leagueCode: string): Promise<League> {
  return await fetchData<League>(`/competitions/${leagueCode}`);
}

export async function fetchTeamsInLeague(leagueCode: string): Promise<Team[]> {
  const data = await fetchData<{ teams: Team[] }>(`/competitions/${leagueCode}/teams`);
  return data.teams;
}

export async function fetchTeamSquad(teamId: number): Promise<Player[]> {
  const data = await fetchData<TeamSquad>(`/teams/${teamId}`);
  return data.squad;
}
