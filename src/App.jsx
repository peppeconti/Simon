import { useState, useEffect, useRef } from "react";
import Simon from "./components/Simon";
import InfoButton from "./components/InfoButton";
import Infos from "./components/Infos";
//import { useInnerHeight } from "./hooks/useInnerHeight";
import "./App.css";

function App() {
  const [infos, setInfos] = useState(false);
  const header = useRef();
  //const [innerHeight] = useInnerHeight("(max-width: 1024px)");

  useEffect(() => {
    const appHeight = () => {
      header.current.style.setProperty("--app-height", `${window.innerHeight}px`);
    };

    window.addEventListener("resize", appHeight);
    appHeight();
    return () => window.removeEventListener("resize", appHeight)
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
