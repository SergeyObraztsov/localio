import dynamic from 'next/dynamic';
import { getUserProfile, getUserSpots } from '~/actions/user-actions';
import type { User, UserSpot } from '~/types/common';

const Form = dynamic(() => import('./form'), {
  ssr: false
});

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const id = params.id;
  const user = await getUserProfile(Number(id));
  const spots = await getUserSpots(Number(id));

  return <Form user={user as User} spots={spots as UserSpot[]} />;
}
