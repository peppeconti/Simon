import { useState } from "react";
import Simon from "./components/Simon";
import InfoButton from "./components/InfoButton";
import Infos from "./components/Infos";
import { useInnerHeight } from "./hooks/useInnerHeight";
import "./App.css";

function App() {
  const [infos, setInfos] = useState(false);

  const [altezza] = useInnerHeight("(max-width: 1024px)");

  return (
    <div style={altezza} className="App">
      <Simon />
      {infos && <Infos setInfos={setInfos} />}
      <InfoButton setInfos={setInfos} />
    </div>
  );
}

export default App;
