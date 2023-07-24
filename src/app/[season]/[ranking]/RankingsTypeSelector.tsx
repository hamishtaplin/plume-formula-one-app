import Link from 'next/link';
import cn from 'classnames';

import type { RankingsType } from '@/lib/types';

type RankingOptionsTypes = {
  title: string;
  type: RankingsType;
}[];

const rankingsOptions: RankingOptionsTypes = [
  {
    title: 'Drivers',
    type: 'drivers',
  },
  {
    title: 'Teams',
    type: 'teams',
  },
];

type NewType = string;

interface Props {
  selectedSeason: NewType;
  selectedRanking: RankingsType;
}

export default function RankingsTypeSelector({
  selectedSeason,
  selectedRanking,
}: Props) {
  return (
    <div className="flex flex-row gap-[1px]">
      {rankingsOptions.map(({ title, type }) => (
        <Link
          key={type}
          href={`/${selectedSeason}/${type}`}
          scroll={false}
          className={cn(
            'block py-3 text-center w-24 bg-white first:rounded-l-lg last:rounded-r-lg font-medium',
            {
              'outline outline-primary outline-[3px] shadow-lg shadow-primary/20 z-10':
                selectedRanking === type,
            }
          )}
        >
          {title}
        </Link>
      ))}
    </div>
  );
}
