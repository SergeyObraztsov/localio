import { minioClient } from '~/server/minio';

// Disable body parser built-in to Next.js to allow formidable to work
export const config = {
  api: {
    bodyParser: false
  }
};

export async function saveFileInBucket({
  bucketName,
  fileName,
  file
}: {
  bucketName: string;
  fileName: string;
  file: Buffer;
}) {
  const fileExists = await checkFileExistsInBucket({
    bucketName,
    fileName
  });

  if (fileExists) {
    throw new Error('File already exists');
  }

  await minioClient.putObject(bucketName, fileName, file);
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
