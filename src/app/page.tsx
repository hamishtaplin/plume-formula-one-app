import { redirect } from 'next/navigation';
import api from '@/lib/api';
import { Seasons } from '@/lib/types';

export default async function Home() {
  const { data, error } = await api<Seasons>('seasons');

  if (error) {
    return <div>Unable to fetch seasons</div>;
  }

  const [firstSeason] = data;

  return redirect(firstSeason + '/drivers');
}
