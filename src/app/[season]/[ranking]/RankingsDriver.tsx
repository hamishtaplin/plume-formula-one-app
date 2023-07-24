import Image from 'next/image';
import api from '@/lib/api';
import type { Driver, RankingsDriver } from '@/lib/types';

import Table from './Table';

interface Props {
  selectedSeason: string;
}

const DriverPosition = ({ position }: { position: number }) => (
  <span className="text-xl">{position}</span>
);

const DriverImage = ({ image, name }: { image: string; name: string }) => (
  <div className="w-12 h-12 overflow-hidden rounded-full bg-[#eae8e8] relative">
    <Image
      src={image}
      alt={name}
      fill
      style={{ objectFit: 'cover' }}
      sizes="48px"
    />
  </div>
);

type Row = {
  position: React.ReactNode;
  name: React.ReactNode;
  image: React.ReactNode;
  number: React.ReactNode;
  points: React.ReactNode;
};

export default async function Rankings({ selectedSeason }: Props) {
  const { data: driversData, error } = await api<RankingsDriver[]>(
    'rankings/drivers',
    {
      season: selectedSeason,
    }
  );

  if (!driversData || error) {
    return <div>Error loading drivers data</div>;
  }

  const columnData = [
    { id: 'position', header: 'Position' },
    { id: 'name', header: 'Driver name' },
    { id: 'image', header: 'Image' },
    { id: 'number', header: 'Number' },
    { id: 'points', header: 'Points' },
  ];

  const rowData = driversData
    .sort((a, b) => a.position - b.position)
    .map((ranking: RankingsDriver) => ({
      position: <DriverPosition position={ranking.position} />,
      name: <>{ranking.driver.name}</>,
      image: (
        <DriverImage image={ranking.driver.image} name={ranking.driver.name} />
      ),
      number: <>{ranking.driver.number}</>,
      points: <>{ranking.points || 0}</>,
    }));

  return <Table rowData={rowData} columnData={columnData} />;
}
