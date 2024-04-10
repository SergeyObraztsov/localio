import { nanoid } from 'nanoid';
import { env } from '~/env';
import { minioClient } from '~/server/minio';
// Disable body parser built-in to Next.js to allow formidable to work
export const config = {
  api: {
    bodyParser: false
  }
};

export async function saveFileInBucket(file: File) {
  const imageBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(imageBuffer);
  const fileName = `${nanoid(10)}-${file.name}`;
  // const fileExists = await checkFileExistsInBucket({
  //   bucketName: env.S3_BUCKET_NAME,
  //   fileName
  // });

  // if (fileExists) {
  //   throw new Error('File already exists');
  // }

  await minioClient.putObject(env.S3_BUCKET_NAME, fileName, buffer);
  return fileName;
}

export async function checkFileExistsInBucket({
  bucketName,
  fileName
}: {
  bucketName: string;
  fileName: string;
}) {
  try {
    await minioClient.statObject(bucketName, fileName);
  } catch (error) {
    return false;
  }
  return true;
}

// Set error status and result body if error occurs
export function setErrorStatus(status: number, resultBody: { status: string; message: string }) {
  status = 500;
  resultBody = {
    status: 'fail',
    message: 'Upload error'
  };
  return { status, resultBody };
}
