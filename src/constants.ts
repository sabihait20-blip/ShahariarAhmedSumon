import { Channel } from './types';
import { addMinutes, startOfHour, formatISO } from 'date-fns';

const now = new Date();
const hourStart = startOfHour(now);

const createPrograms = (baseTitle: string, category: string) => {
  return [
    {
      id: `${baseTitle}-1`,
      title: `${baseTitle} Live`,
      description: `Stay updated with the latest in ${category.toLowerCase()}. Expert analysis and live reporting.`,
      startTime: formatISO(hourStart),
      endTime: formatISO(addMinutes(hourStart, 60)),
      category
    },
    {
      id: `${baseTitle}-2`,
      title: `${baseTitle} Evening Edition`,
      description: `A deep dive into today's biggest stories with our panel of experts.`,
      startTime: formatISO(addMinutes(hourStart, 60)),
      endTime: formatISO(addMinutes(hourStart, 120)),
      category
    },
    {
      id: `${baseTitle}-3`,
      title: `${baseTitle} Global`,
      description: `International perspectives and stories from around the world.`,
      startTime: formatISO(addMinutes(hourStart, 120)),
      endTime: formatISO(addMinutes(hourStart, 180)),
      category
    }
  ];
};

export const CHANNELS: Channel[] = [
  {
    id: 'ch-1',
    name: 'Global News 24',
    logo: 'https://picsum.photos/seed/news/100/100',
    category: 'News',
    streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    upcomingPrograms: createPrograms('Global News', 'News')
  },
  {
    id: 'ch-2',
    name: 'Velocity Sports',
    logo: 'https://picsum.photos/seed/sports/100/100',
    category: 'Sports',
    streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    upcomingPrograms: createPrograms('Velocity Sports', 'Sports')
  },
  {
    id: 'ch-3',
    name: 'Cinema One',
    logo: 'https://picsum.photos/seed/movies/100/100',
    category: 'Movies',
    streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    upcomingPrograms: createPrograms('Cinema One', 'Movies')
  },
  {
    id: 'ch-4',
    name: 'Nature Pulse',
    logo: 'https://picsum.photos/seed/nature/100/100',
    category: 'Documentary',
    streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    upcomingPrograms: createPrograms('Nature Pulse', 'Documentary')
  },
  {
    id: 'ch-5',
    name: 'Starlight Ent',
    logo: 'https://picsum.photos/seed/star/100/100',
    category: 'Entertainment',
    streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    upcomingPrograms: createPrograms('Starlight', 'Entertainment')
  },
  {
    id: 'ch-6',
    name: 'Tech Today',
    logo: 'https://picsum.photos/seed/tech/100/100',
    category: 'News',
    streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    upcomingPrograms: createPrograms('Tech Today', 'News')
  },
  {
    id: 'ch-7',
    name: 'Arena HD',
    logo: 'https://picsum.photos/seed/arena/100/100',
    category: 'Sports',
    streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    upcomingPrograms: createPrograms('Arena HD', 'Sports')
  },
  {
    id: 'ch-8',
    name: 'Retro Films',
    logo: 'https://picsum.photos/seed/retro/100/100',
    category: 'Movies',
    streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    upcomingPrograms: createPrograms('Retro Films', 'Movies')
  }
].map(ch => ({
  ...ch,
  currentProgram: ch.upcomingPrograms[0],
  upcomingPrograms: ch.upcomingPrograms.slice(1)
}));

export const CATEGORIES: string[] = ['All', 'News', 'Sports', 'Movies', 'Entertainment', 'Documentary'];
