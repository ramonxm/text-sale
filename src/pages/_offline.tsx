import { get } from "idb-keyval";
import Head from "next/head";
import { useEffect, useState } from "react";

const Offline = () => {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    void (async () => {
      const textsDbs = (await get("texts")) as never[];

      setTexts(textsDbs);
    })();
  }, []);
  return (
    <>
      <Head>
        <title>TextSale</title>
      </Head>
      <pre>{JSON.stringify(texts, null, 4)}</pre>
    </>
  );
};

export default Offline;
