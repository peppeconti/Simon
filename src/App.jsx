import { useState, useEffect } from "react";
import Simon from "./components/Simon";
import InfoButton from "./components/InfoButton";
import Infos from "./components/Infos";
import "./App.css";

function App() {

  const [infos, setInfos] = useState(false);
  const [mobile, setMobile] = useState(true);

  const media = window.matchMedia('max-width: 1024px');

  useEffect(() => {
    console.log(media.matches);
    if (!media.matches) setMobile(false);
    if (media.matches) setMobile(true);
  }, [media.matches]);

  const altezza = {
    height: mobile ?  `${window.innerHeight}px` : '100vh'
  }

  return (
    <div style={altezza} className="App">
      <Simon />
      {infos && <Infos setInfos={setInfos} />}
      <InfoButton setInfos={setInfos} />
    </div>
  );
}

export default App;
