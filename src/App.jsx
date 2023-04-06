import { useState, useEffect, useRef } from "react";
import Simon from "./components/Simon";
import InfoButton from "./components/InfoButton";
import Infos from "./components/Infos";
import "./App.css";

function App() {
  const [infos, setInfos] = useState(false);

  const header = useRef();

  const setHeight = () => {
    header.current.style.height = window.innerHeight + "px";
  };

  useEffect(() => {
    let deviceWidth = window.matchMedia("(max-width: 1024px)");

    if (deviceWidth.matches) {
      window.addEventListener("resize", setHeight);
      setHeight();
    }
  }, []);

  return (
    <div ref={header} className="App">
      <Simon />
      {infos && <Infos setInfos={setInfos} />}
      <InfoButton setInfos={setInfos} />
    </div>
  );
}

export default App;
