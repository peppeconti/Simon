import { useState } from "react";
import Simon from "./components/Simon";
import InfoButton from "./components/InfoButton";
import Infos from "./components/Infos";
import { useMediaQuery } from "./hooks/useMediaQuery";
import "./App.css";

function App() {
  const [infos, setInfos] = useState(false);

  const mobile = useMediaQuery("(max-width: 1024px)");

  let height;

  if (mobile) {
    height = `${window.outerHeight}px`;
  } else {
    height = "100vh";
  }

  const AppHeight = {
    minHeight: height,
  };

  return (
    <div style={AppHeight} className="App">
      <Simon />
      {infos && <Infos setInfos={setInfos} />}
      <InfoButton setInfos={setInfos} />
    </div>
  );
}

export default App;
