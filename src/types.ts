export interface Program {
  id: string;
  title: string;
  description: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  category: string;
}

export interface Channel {
  id: string;
  name: string;
  logo: string;
  category: string;
  streamUrl: string;
  currentProgram?: Program;
  upcomingPrograms: Program[];
}

export type Category = 'All' | 'News' | 'Sports' | 'Movies' | 'Entertainment' | 'Documentary';
