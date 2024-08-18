export interface League {
  id: number;
  name: string;
  code: string;
  area: {
    id: number;
    name: string;
  };
}

export interface Team {
  id: number;
  name: string;
  tla: string;
  shortName: string;
  area: {
    id: number;
    name: string;
  };
  address: string;
  coach?: Coach;
}

export interface Player {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
  role: string;
}

export interface TeamSquad {
  squad: Player[];
}

export interface Coach {
  name: string;
  dateOfBirth: string;
  nationality: string;
}