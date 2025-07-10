import { useState, useEffect } from "react";
import { Background, View as ViewUi, List as ListUi } from "../../components/ui";

function VerPregunta({ route }) {
  const { dataPregunta } = route.params;

  const [pregunta, setPregunta] = useState({});

  useEffect(() => {
    if (dataPregunta) {
      setPregunta(dataPregunta);
    }
  }, []);

  return (
    <Background.Image source={require("../../assets/fondos/menu4.png")}>
      <ViewUi.Scroll.Parent>
        <ListUi.Header image={pregunta.images} title={`Hola: ${pregunta.nick} `} />
        <ViewUi.Child>
          <ListUi.Parent>
            <ListUi.Item icon={"message-question"} color={"blue"} title={"A tu pregunta"} subtitle={pregunta.name} />
            <ListUi.Item
              icon={"paw"}
              color={"green"}
              title={"Te recomendamos"}
              subtitle={pregunta.respuesta}
            />
          </ListUi.Parent>
        </ViewUi.Child>
      </ViewUi.Scroll.Parent>
    </Background.Image>
  );
}
export default VerPregunta;
