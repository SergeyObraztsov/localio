import { env } from '~/env';
import { minioClient } from '~/server/minio';

async function getFileFromBucket({
  bucketName,
  fileName
}: {
  bucketName: string;
  fileName: string;
}) {
  try {
    await minioClient.statObject(bucketName, fileName);
  } catch (error) {
    console.error(error);
    return null;
  }
  return await minioClient.getObject(bucketName, fileName);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get('fileName');

  if (!fileName) {
    return new Response('Item not found', { status: 404 });
  }

  const data = await getFileFromBucket({
    bucketName: env.S3_BUCKET_NAME,
    fileName
  });

  if (!data) {
    return new Response('Item not found', { status: 404 });
  }

  //@ts-ignore
  return new Response(data);
}
