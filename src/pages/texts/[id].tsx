import { useQuery } from "@tanstack/react-query";
import { type NextPage } from "next";
import Head from "next/head";
import { type ParsedUrlQuery } from "querystring";
import SceneText from "~/components/SceneText";
import { set } from "idb-keyval";

type Props = {
  query: ParsedUrlQuery;
};

const fetcher = async (id: number) => {
  const res = await fetch(`/api/texts/${id}`);
  const data = (await res.json()) as {
    character: {
      name: string | null;
    };
    id: number;
    text: string;
    textType: number;
    sceneId: number;
    dialogType: number | null;
  }[];

  if (res.status !== 200) {
    throw new Error((data as unknown as { message: string }).message);
  }

  await set("texts", data);
  return data;
};

const Texts: NextPage<Props> = (props) => {
  const { id } = props.query;
  const { data, error } = useQuery({
    queryKey: ["texts"],
    queryFn: () => fetcher(Number(id)),
  });

  if (error) {
    return <div>Error: {(error as { message: string })?.message}</div>;
  }

  return (
    <>
      <Head>
        <title>Textos</title>
      </Head>
      <SceneText elementosTexto={data ?? []} titleScene="" />
    </>
  );
};

Texts.getInitialProps = (ctx) => {
  return { query: ctx.query };
};

export default Texts;
