import { type GetServerSideProps } from "next";
import SceneText from "~/components/SceneText";
import { prisma } from "~/server/db";

type Props = {
  texts: {
    character: {
      name: string | null;
      id: number | null;
    };
    id: number;
    text: string;
    textType: number;
    sceneId: number;
    dialogType: number | null;
  }[];
};

const Texts = (props: Props) => {
  return <SceneText elementosTexto={props.texts} titleScene="" />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const textElements = await prisma.tB_CENA_TEXTO.findMany({
    where: { id_cena: Number(ctx.query.id) },
  });

  const mappedToPersistence = textElements.map((text) => ({
    character: {
      name: text.nm_temporario_personagem,
      id: text.id_personagem,
    },
    id: text.id,
    text: text.ds_texto,
    textType: text.id_tp_texto,
    sceneId: text.id_cena,
    dialogType: text.id_tp_dialogo,
  }));

  return {
    props: { texts: mappedToPersistence },
  };
};

export default Texts;
