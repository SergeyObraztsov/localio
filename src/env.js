import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes("YOUR_SQL_URL_HERE"),
        "You forgot to change the default URL"
      ),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    BOT_TOKEN: z.string(),
    BOT_USERNAME: z.string(),
    SMS_RU_TOKEN: z.string(),
    NEXTAUTH_SECRET: z.string(),
    S3_API_SECRET_TOKEN: z.string(),
    S3_API_ACCESS_TOKEN: z.string(),
    SERVER_URL: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    BOT_TOKEN: process.env.BOT_TOKEN,
    BOT_USERNAME: process.env.BOT_USERNAME,
    SMS_RU_TOKEN: process.env.SMS_RU_TOKEN,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    S3_API_SECRET_TOKEN: process.env.S3_API_SECRET_TOKEN,
    S3_API_ACCESS_TOKEN: process.env.S3_API_ACCESS_TOKEN,
    SERVER_URL: process.env.SERVER_URL
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
