// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

import withPWAFunction from "next-pwa";

const withPWA = withPWAFunction({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    swcPlugins: [
      [
        "next-superjson-plugin",
        {
          excluded: [],
        },
      ],
    ],
  },
  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default withPWA(config);
