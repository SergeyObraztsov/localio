import * as Minio from 'minio';
import { env } from '~/env';

export const minioClient = new Minio.Client({
  endPoint: env.SERVER_URL,
  port: 9000,
  useSSL: false,
  accessKey: env.S3_API_ACCESS_TOKEN,
  secretKey: env.S3_API_SECRET_TOKEN
});
