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
    <div className="m-auto flex w-8/12 flex-col rounded-lg border border-gray-200 bg-white p-12 shadow dark:border-gray-700 dark:bg-gray-800">
      <div>
        <h1 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          {titleScene}
        </h1>
        {elementosTexto.map((elementoTexto) => {
          return (
            <div key={elementoTexto.id}>
              {elementoTexto?.character ? (
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {getDescription(
                      elementoTexto.character?.name ?? "",
                      elementoTexto.textType
                    )}
                  </p>
                  <p className="mb-3 text-gray-500 dark:text-gray-400">
                    {elementoTexto.text}
                  </p>
                </div>
              ) : (
                <p className="mb-5 text-gray-500 dark:text-gray-400">
                  {getDescription(elementoTexto.text, elementoTexto.textType)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SceneText;
