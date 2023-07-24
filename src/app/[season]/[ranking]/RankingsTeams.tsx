import Image from 'next/image';
import api from '@/lib/api';
import { RankingsTeam } from '@/lib/types';

import Table from './Table';

interface Props {
  selectedSeason: string;
}

const TeamPosition = ({ position }: { position: number }) => (
  <span className="text-xl">{position}</span>
);

const TeamLogo = ({ logo, name }: { logo: string; name: string }) => (
  <div className="h-12 overflow-hidden">
    <Image
      src={logo}
      alt={name}
      width={100}
      height={56}
      className="block h-full w-auto"
    />
  </div>
);

export default async function Rankings({ selectedSeason }: Props) {
  const { data: teamsData, error } = await api<RankingsTeam[]>(
    'rankings/teams',
    {
      season: selectedSeason,
    }
  );

  if (!teamsData || error) {
    return <div>Error loading teams data</div>;
  }

  const columnData = [
    { id: 'position', header: 'Position' },
    { id: 'name', header: 'Team name' },
    { id: 'logo', header: 'Logo' },
    { id: 'points', header: 'Points' },
  ];

  const rowData = teamsData
    .sort((a, b) => a.position - b.position)
    .map((ranking: RankingsTeam) => ({
      position: <TeamPosition position={ranking.position} />,
      name: <>{ranking.team.name}</>,
      logo: <TeamLogo logo={ranking.team.logo} name={ranking.team.name} />,
      points: <>{ranking.points}</>,
    }));

  return <Table rowData={rowData} columnData={columnData} />;
}
