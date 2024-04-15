import { getSpot } from '~/actions/user-actions';
import { type Spot as SpotType } from '~/types/common';
// import Spot from './spot';
import dynamic from 'next/dynamic';
const Spot = dynamic(() => import('./spot'), {
  ssr: false
});

export default async function SpotPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const spotInfo = await getSpot(id);

  return <Spot spot={spotInfo as SpotType} />;
}
