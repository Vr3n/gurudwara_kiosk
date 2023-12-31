import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "swiper/css";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "~/styles/globals.css";
import Head from "next/head";
import "mapbox-gl/dist/mapbox-gl.css";
import "yet-another-react-lightbox/styles.css";
import "@uploadthing/react/styles.css";
import { cn } from "~/lib/utils";
import { fontSans } from "~/layouts/AdminBaseLayout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const getLayout =
    //@ts-expect-error Any returned as Component Layout cannot pe added.
    (Component?.getLayout as unknown) ?? ((page: unknown) => page);

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Sikh Society, Calgary</title>
        <meta name="description" content="Sikh Society calgary kiosk." />
        <style jsx global>{`
          html {
            font-family: ${fontSans.style.fontFamily};
          }
        `}</style>
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className={cn("font-sans", fontSans.variable)}>
        {
          // @ts-expect-error The get Layout error.
          getLayout(<Component {...pageProps} />)
        }
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
