import { get } from "idb-keyval";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SceneText from "~/components/SceneText";

const Offline = () => {
  const [texts, setTexts] = useState([]);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    void (async () => {
      const textsDbs = (await get("texts")) as never[];

      setTexts(textsDbs);
    })();
  }, []);

  useEffect(() => {
    const handleOffline = () => setIsOnline(false);
    const handleOnline = () => setIsOnline(true);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  const router = useRouter();

  if (isOnline && typeof window !== "undefined") {
    void router.push("/");
  }

  return (
    <>
      <Head>
        <title>Offline Texts</title>
      </Head>

      <div className="flex h-full min-h-screen w-full  flex-col items-center gap-3 border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
        <h1 className="flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-7xl font-extrabold text-transparent">
          TextSale
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-11 w-11"
            version="1.0"
            viewBox="0 0 512 512"
            fill="url(#grad1)"
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#b794f4", stopOpacity: 1 }}
                />
                <stop
                  offset="50%"
                  style={{ stopColor: "#ed64a6", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#f56565", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <path d="M400.8 1c-24.6 4.5-45.1 17.9-58.6 38.4-2.8 4.4-5.3 8.3-5.4 8.8-.2.4-15 .1-33-.8-36.3-1.7-39.9-1.4-49.8 4.3C248.3 55 71.4 231.4 70.1 235.1c-.7 2-.5 3.6.7 6.1 1.4 2.8 2.3 3.4 5.6 3.6l3.9.3 90.1-90c66.6-66.4 91.1-90.4 94.1-91.6 3.5-1.5 6.6-1.6 25-1.1 11.6.4 25.5.9 31 1.3l10.1.6-1.4 7.6c-1.6 9.1-1 25.9 1.3 34.5l1.5 5.8-3.1 3.6c-7.1 8-10.7 20.7-9 31.3 2.8 17 15.7 30 32.9 33 16.4 2.9 33.7-6.3 41.4-21.9 3.1-6.2 3.3-7.4 3.3-16.7 0-9.1-.3-10.6-3.1-16.5-4.1-8.6-10.8-15.3-19.2-19.3-5.8-2.7-7.8-3.1-15.2-3.2-4.7 0-9.7.3-11.2.8-2.4.6-2.8.4-3.5-2-1.3-4.5-.9-27.4.5-32.1l1.3-4.3 15.2.6c29.1 1.2 35.3 2.1 43.5 6 13 6.2 22.9 19 25.2 33 1.2 6.8 7 107.6 7 120 0 5.7-.6 9.2-1.9 12-1.3 2.8-37.7 39.7-117.7 119.7-128 127.7-118.6 119.3-129.1 116.7-4.3-1.1-6.7-3.1-23.9-20.1-20.7-20.4-22.1-21.2-26.9-16.3-5 4.9-4.2 6.2 16.8 27.2 21.4 21.6 25.2 24.2 35.9 25 6 .4 10.1-.4 18.4-3.8 2.9-1.2 3.9-.7 27 11.9 13.2 7.2 26.1 13.6 28.7 14.3 10 2.5 24.9-2 31.5-9.5 2.5-2.8 21.1-35.5 28.1-49.3 2.7-5.4 2.7-8.4-.1-11-3.5-3.1-4.3-3.4-7.6-2.2-2.7.9-4.8 4.1-15.8 24.2-14.3 26.1-16.2 29-20.6 31.3-4.1 2.1-11.6 2.1-15.9-.1-10.3-5.2-39.9-21.8-39.9-22.3 0-.4 35.6-36.3 79.1-79.7 48-47.9 78.4-77.6 77.4-75.5-1 1.9-13.2 24.3-27.2 49.8-13.9 25.4-25.9 47.3-26.5 48.7-3.3 7.4 7.7 13.6 13 7.2.7-.8 19.5-34.7 41.8-75.3l40.5-73.8 12-12.2c13.5-13.9 17.4-20.3 18.3-30.8.3-3.3-.2-19.4-1.2-35.6-1.6-24.3-1.6-29.7-.6-30.5.8-.6 4.1-2.6 7.5-4.5 7.7-4.4 19.6-15.4 25.4-23.5 34.6-48.4 11.1-116.2-46-133C428.6.6 409.7-.7 400.8 1zm33.7 17c12.6 3.9 20.2 8.6 30 18.4 6.3 6.4 10.2 11.2 12.7 16.1 14.2 27.2 10 59.9-10.4 82.1-4.1 4.4-16.6 14-17.2 13.3-.2-.2-.8-10.1-1.5-21.9-.6-11.8-1.8-24.4-2.7-27.9C441 79 425.2 61.5 406.7 55c-7.5-2.6-15.8-3.7-35.9-4.5-9.3-.4-16.8-.9-16.8-1.2 0-1.6 7-10 12.9-15.5 9.8-9.1 22.5-15.4 35.9-17.8 7.6-1.4 23.8-.4 31.7 2zm-69.1 100.4c6.2 1.9 10.9 5.6 14.3 11.3 2.2 3.8 2.7 5.9 2.7 11.4.1 3.7-.2 7.1-.6 7.5-.9.9-10.3-5.2-16-10.4-4.5-4-13.8-16.7-13.8-18.8 0-1.2 2.2-2 6.6-2.3 1.1 0 4.2.5 6.8 1.3zm-22.8 15.3c4.6 7.2 17.1 19.8 24.3 24.3l5.3 3.5-3.8 1.7c-5.5 2.5-14.7 2.3-20.1-.3-11-5.3-16.3-19.3-11.7-30.9.9-2.2 1.8-4 2-4 .2 0 2 2.6 4 5.7z" />
            <path d="M271.8 180.8C261.3 191.2 260 193 260 196c0 3.1 2.1 5.6 25.2 28.7 23.5 23.6 25.5 25.3 28.8 25.3 3.2 0 4.7-1.2 15.3-11.8 10.6-10.6 11.7-12.1 11.7-15.3 0-3.8-1.9-6.2-5.7-7.3-3.2-1-5.8.7-14 8.7l-7.3 7.1-6-5.9-6-5.9 6.4-6.6c3.5-3.6 6.9-7.5 7.5-8.7 2.4-4.7-1.5-10.6-7-10.6-2.4 0-4.5 1.4-10.5 7.4l-7.4 7.4-6.2-6.2-6.2-6.2 8.2-8.4c6.1-6.3 8.2-9.1 8.2-11.1 0-3.8-4.1-7.6-8.2-7.6-2.8 0-4.8 1.6-15 11.8zM226.6 226.1c-1.9 1.5-2.6 2.9-2.6 5.7 0 3.4 1.5 5.1 24.7 28.4 13.6 13.6 25.9 25.2 27.4 25.7 3.8 1.3 6.9-.6 16.1-9.6 9.1-9.1 11-12.3 9.6-16.5-1.2-3.3-3.5-4.8-7.5-4.8-2.2 0-4.4 1.5-9.3 6.5l-6.4 6.5-22.1-22c-23.7-23.6-24.5-24.1-29.9-19.9zM33.8 269.8c-20 20.2-22.2 23.8-22.3 36.7 0 13.9-1.3 12.3 55.8 69.4 53.8 53.7 52.4 52.5 58.2 48.7 1.9-1.3 2.5-2.5 2.5-5.4 0-3.6-1.8-5.5-47.6-51.2-26.2-26.1-48.9-49.5-50.5-51.9-3.1-4.9-3.9-11.4-1.8-16.7.5-1.6 8.4-10.3 17.5-19.5 14.1-14.2 16.4-17 16.4-19.7 0-3.8-3.9-7.2-8.3-7.2-2.7 0-5.5 2.3-19.9 16.8zM188.9 263.9c-1.7 1.8-2.9 4-2.9 5.5 0 3.3 28.5 67.3 31.3 70.3 4.3 4.8 12.7 1.7 12.7-4.6 0-1.6-1.2-5.5-2.6-8.7l-2.5-5.8 10.4-10.4 10.5-10.5 5.7 2.7c6.9 3.1 10.8 3.3 13.5.6 2.3-2.3 2.7-7.7.8-10.3-1.9-2.4-67.4-31.7-71-31.7-1.9 0-4 1-5.9 2.9zm31 24.1c5.6 2.4 10.1 4.7 10.1 5 0 .3-2.7 3.2-6 6.5l-5.9 5.9-3.7-8c-5.4-11.9-6.4-14.6-5.5-14.2.5.2 5.4 2.3 11 4.8zM154 304.9c-10.9 3.4-20.9 12.6-23.6 21.8-4 13.6 4.3 26.6 17.7 27.9 4.9.5 6.5.1 18.6-5 17.1-7.2 21.5-7.3 22.9-.2 1.6 8.9-9.9 18.6-22.3 18.6-2.2 0-3.8.8-5.2 2.6-2.8 3.6-2.6 7 .5 10.1 2.4 2.4 3.1 2.5 9.4 2.1 18.3-1.3 33-15.5 33-31.9 0-8.5-2.8-14.2-9.2-18.5-8.7-5.9-15.9-5.4-33.3 2.1-11.3 5-14.9 5.5-16.5 2.6-3.3-6.3 3-14.4 13.7-17.4 7-2 9.3-4.1 9.3-8.5 0-6.2-6.5-8.9-15-6.3z" />
          </svg>
        </h1>
        <div
          id="alert-border-4"
          className="mb-4 flex border-t-4 border-yellow-300 bg-yellow-50 p-4 text-yellow-800 dark:border-yellow-800 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
        >
          <svg
            className="h-5 w-5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div className="ml-3 text-sm font-medium">
            Aviso! Você está desconectado, mas não se preocupe, se você estiver
            visualizando algum texto, ele foi salvo localmente para você!
          </div>
        </div>
        {texts && texts.length > 0 ? (
          <SceneText
            elementosTexto={texts ?? []}
            titleScene="CENA 5 / APARTAMENTO / SALA 4 / Interior / Manhã"
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Offline;
