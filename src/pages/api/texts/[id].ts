import { type NextApiHandler } from "next";
import { prisma } from "~/server/db";

const handler: NextApiHandler = async (req, res) => {
  try {
    const textElements = await prisma.tB_CENA_TEXTO.findMany({
      where: { id_cena: Number(req.query.id) },
      select: {
        id: true,
        ds_texto: true,
        id_tp_texto: true,
        id_cena: true,
        id_tp_dialogo: true,
        nm_temporario_personagem: true,
      },
    });

    const mappedToPersistence = textElements.map((text) => ({
      character: {
        name: text.nm_temporario_personagem,
      },
      id: text.id,
      text: text.ds_texto,
      textType: text.id_tp_texto,
      sceneId: text.id_cena,
      dialogType: text.id_tp_dialogo,
    }));

    return res.status(200).json(mappedToPersistence);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default handler;
