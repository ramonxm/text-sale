import * as S from "./styles";

export const TYPE_TEXT = {
  dialog: 1,
  rubric: 2,
  off: 3,
};

type TextElement = {
  character: {
    name: string | null;
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
  const getDescription = (description: string, typeText: number) => {
    if (typeText === TYPE_TEXT.off) return `(OFF) ${description}`;
    return description;
  };

  return (
    <div>
      <S.Content>
        <h1>{titleScene}</h1>
        {elementosTexto.map((elementoTexto) => {
          return (
            <S.ContainerElementText key={elementoTexto.id}>
              {elementoTexto?.character ? (
                <div>
                  <S.WrapperPersonaName>
                    <p>
                      {getDescription(
                        elementoTexto.character?.name ?? "",
                        elementoTexto.textType
                      )}
                    </p>
                  </S.WrapperPersonaName>
                  <div>
                    <p>{elementoTexto.text}</p>
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
