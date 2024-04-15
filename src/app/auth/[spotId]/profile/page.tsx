import dynamic from 'next/dynamic';

const ProfileForm = dynamic(() => import('./form'), {
  ssr: false
});

export default function ProfilePage() {
  return <ProfileForm />;
}
