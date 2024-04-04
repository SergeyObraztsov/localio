import type { NextApiRequest, NextApiResponse } from 'next';
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

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // get the file from the bucket and pipe it to the response object
  const data = await getFileFromBucket({
    bucketName: 'main',
    fileName: 'Альберт Геворкян.png'
  });

  if (!data) {
    return new Response('Item not found', { status: 404 });
  }

  //@ts-ignore
  return new Response(data);
}
