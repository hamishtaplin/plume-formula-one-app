import { Suspense } from 'react';
import Image from 'next/image';

import { RankingsType } from '@/lib/types';

import SeasonsSelector from './SeasonsSelector';
import RankingsDriver from './RankingsDriver';
import RankingsTeams from './RankingsTeams';
import RankingsTypeSelector from './RankingsTypeSelector';
import PageSection from './PageSection';

interface Props {
  params: { season: string; ranking: RankingsType };
}

export default function Home({ params }: Props) {
  const { season, ranking } = params;

  return (
    <main className="min-h-screen">
      <header className="bg-[#2D2D2D] relative flex flex-col items-center px-4 md:px-9">
        <div className="max-w-6xl w-full">
          <div className="py-12 md:py-16 lg:py-24 relative z-10">
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-semibold">
              Formula 1 <br /> Rankings
            </h1>
          </div>
          <Image
            src="/hero.png"
            alt=""
            width={1920}
            height={1080}
            className="object-contain right-0 absolute w-auto l-auto top-0 h-full"
            priority
          />
        </div>
      </header>
      <div className="py-6 md:py-16 px-4 md:px-9 flex flex-col items-center">
        <div className="max-w-6xl w-full flex flex-col gap-12">
          <PageSection title="Seasons">
            <SeasonsSelector
              selectedSeason={season}
              selectedRankingType={ranking}
            />
          </PageSection>
          <PageSection title="Rankings">
            <div className="absolute right-0">
              <RankingsTypeSelector
                selectedSeason={season}
                selectedRanking={ranking}
              />
            </div>
            {ranking === 'drivers' ? (
              <Suspense fallback={<p>Loading drivers&hellip;</p>}>
                <RankingsDriver selectedSeason={season} />
              </Suspense>
            ) : (
              <Suspense fallback={<p>Loading teams&hellip;</p>}>
                <RankingsTeams selectedSeason={season} />
              </Suspense>
            )}
          </PageSection>
        </div>
      </div>
    </main>
  );
}
