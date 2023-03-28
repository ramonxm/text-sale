import { type NextApiHandler } from "next";
import { prisma } from "~/server/db";

const handler: NextApiHandler = async (req, res) => {
  try {
    const data = req.body as {
      idCena: number;
      idPrograma: number;
      numero: number;
      tipoTexto: number;
      descricao: string;
      tipoDialogo: number;
      idPersonagem: number;
    };

    await prisma.tB_CENA_TEXTO.create({
      data: {
        id_numero: data.numero,
        id_cena: data.idCena,
        nm_temporario_personagem: "OTO",
        id_personagem: data.idPersonagem,
        cd_usuario_criacao: new Date()
          .toLocaleString()
          .replace(",", "")
          .replace(/:.. /, " "),
        cd_usuario_modificacao: new Date()
          .toLocaleString()
          .replace(",", "")
          .replace(/:.. /, " "),
        ds_texto: data.descricao,
        dt_criacao: new Date(),
        dt_modificacao: new Date(),
        id_tp_texto: data.tipoTexto,
        id_tp_dialogo: data.tipoDialogo,
      },
    });

    return res.status(201).json({ message: "Criado com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
};

export default handler;
