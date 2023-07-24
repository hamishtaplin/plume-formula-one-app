import Link from 'next/link';
import cn from 'classnames';

import api from '@/lib/api';
import { RankingsType, Seasons } from '@/lib/types';

interface Props {
  selectedSeason: string;
  selectedRankingType: RankingsType;
}

interface SeasonLinkProps {
  season: number;
  isSelected: boolean;
  selectedRankingType: RankingsType;
}

function SeasonLink({
  season,
  selectedRankingType,
  isSelected,
}: SeasonLinkProps) {
  return (
    <Link
      className={cn(
        'block py-3 text-center w-20 bg-white rounded-lg font-medium',
        {
          'outline outline-primary outline-[3px] shadow-lg shadow-primary/20':
            isSelected,
        }
      )}
      href={`/${season}/${selectedRankingType}`}
      scroll={false}
    >
      {season}
    </Link>
  );
}

export default async function SeasonsSelector({
  selectedSeason,
  selectedRankingType,
}: Props) {
  const { data, error } = await api<Seasons>('seasons');

  if (error) {
    console.log(error);
    return <div>Unable to fetch seasons</div>;
  }

  return (
    <ul className="flex gap-4 flex-wrap">
      {data.map(function (season: number) {
        return (
          <li key={season}>
            <SeasonLink
              season={season}
              isSelected={season.toString() === selectedSeason}
              selectedRankingType={selectedRankingType}
            />
          </li>
        );
      })}
    </ul>
  );
}
