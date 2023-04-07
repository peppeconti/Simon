import { useState, useEffect } from "react";
import Simon from "./components/Simon";
import InfoButton from "./components/InfoButton";
import Infos from "./components/Infos";
import "./App.css";

function App() {
  const [infos, setInfos] = useState(false);
  const [sectionHeight, setSectionHeight] = useState(`${window.innerHeight}px`);

  const mobile = window.matchMedia("(max-width: 1024px)");

  useEffect(() => {
    alert(`${window.innerHeight}`)
    window.addEventListener("resize", () => {
      if (mobile.matches) {
        setSectionHeight(`${window.innerHeight}px`);
        alert(`${window.innerHeight}`)
      }
    });
  }, [mobile.matches]);

  const alt = {
    height: sectionHeight
  }

  return (
    <div style={alt} className="App">
      <Simon />
      {infos && <Infos setInfos={setInfos} />}
      <InfoButton setInfos={setInfos} />
    </div>
  );
}

export default App;
