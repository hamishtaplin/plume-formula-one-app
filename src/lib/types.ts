export type Seasons = number[];

export type Driver = {
  id: number;
  name: string;
  abbr: string;
  number: number;
  image: string;
};

export type Team = {
  id: number;
  name: string;
  logo: string;
};

export type RankingsDriver = {
  position: number;
  driver: Driver;
  team: Team;
  points: number;
  wins: number;
  behind: number;
  season: number;
};

export type RankingsTeam = {
  position: number;
  team: Team;
  points: number;
  season: number;
};

export type RankingsType = 'drivers' | 'teams';
