// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://7142a5c38dd6586fb36b403f9bc8cf73@o4508761047760896.ingest.us.sentry.io/4508761051693056",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
