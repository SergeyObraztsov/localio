import { db } from '~/server/db';
import { getServerAuthSession } from '~/server/auth';

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    return <div className="flex justify-center mt-10">Not logged in to see this</div>;
  }

  const user = await db.query.users.findFirst({
    where: (posts, { eq }) => eq(posts.id, Number(session.user.id))
  });

  return (
    <div className="flex flex-col items-center mt-10">
      <h1>{user?.username}</h1>
      <h1 className="truncate max-w-[300px]">{user?.image}</h1>
      <h1>{user?.id}</h1>
      <h1>{user?.createdAt.getTime()}</h1>
    </div>
  );
}
