import { useState, useEffect, useRef } from "react";
import Simon from "./components/Simon";
import InfoButton from "./components/InfoButton";
import Infos from "./components/Infos";
import { useMediaQuery } from "./hooks/useMediaQuery";
import "./App.css";

function App() {
  const [infos, setInfos] = useState(false);

  const mobile = useMediaQuery("(max-width: 1024px)");

  const height = useRef();

  useEffect(() => {
    const cc = () => {
      if (mobile) {
        height.current = `${window.innerHeight}px`;
      } else {
        height.current = "100vh";
      }
    };
    window.addEventListener("resize", () => {
      cc()
    });
    cc();
    return () => window.removeEventListener("resize", cc)
  });

  const AppHeight = {
    height: height.current,
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
