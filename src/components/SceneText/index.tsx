import { useState } from "react";
import * as S from "./styles";

export const TYPE_TEXT = {
  dialog: 1,
  rubric: 2,
  off: 3,
};

type TextElement = {
  character: {
    name: string | null;
    id: number | null;
  };
  id: number;
  text: string;
  textType: number;
  sceneId: number;
  dialogType: number | null;
};

type SceneTextProps = {
  titleScene: string;
  elementosTexto: TextElement[];
};

const SceneText = ({ titleScene, elementosTexto }: SceneTextProps) => {
  const [selectedLineText, setSelectedLineText] = useState<
    number | undefined
  >();

  const handleClickText = (textId: number) => {
    setSelectedLineText((prev) => (prev === textId ? undefined : textId));
  };

  const getDescription = (description: string, typeText: number) => {
    if (typeText === TYPE_TEXT.off) return `(OFF) ${description}`;
    return description;
  };

  return (
    <div>
      <S.Content>
        <h1>{titleScene}</h1>
        {elementosTexto.map((elementoTexto) => {
          const isSelectedLine = selectedLineText === elementoTexto.id;
          return (
            <S.ContainerElementText
              key={elementoTexto.id}
              onClick={() => handleClickText(elementoTexto.id)}
              title={isSelectedLine ? "Deselecionar texto" : "Selecionar texto"}
            >
              {elementoTexto?.character ? (
                <div>
                  <div>
                    <div>
                      <S.WrapperPersonaName>
                        <p>
                          {getDescription(
                            elementoTexto.character?.name ?? "",
                            elementoTexto.textType
                          )}
                        </p>
                      </S.WrapperPersonaName>
                    </div>
                    <div>
                      <div>
                        <p>{elementoTexto.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>
                  {getDescription(elementoTexto.text, elementoTexto.textType)}
                </p>
              )}
            </S.ContainerElementText>
          );
        })}
      </S.Content>
    </div>
  );
};

export default SceneText;
