import { useState, useEffect } from "react";
import Simon from "./components/Simon";
import InfoButton from "./components/InfoButton";
import Infos from "./components/Infos";
import "./App.css";

function App() {
  const [infos, setInfos] = useState(false);
  const [sectionHeight, setSectionHeight] = useState({height: `${window.innerHeight}px`});

  const mobile = window.matchMedia("(max-width: 1024px)");

  useEffect(() => {
    //console.log(media.matches);
    //if (!media.matches) setMobile(false);
    //if (media.matches) setMobile(true);
    window.addEventListener("resize", () => {
      //if (!media.matches) setMobile(false);
      //if (media.matches) setMobile(true);
      if (mobile.matches) setSectionHeight({height: `${window.innerHeight}px`});
    });
  }, [mobile.matches]);

  return (
    <div style={sectionHeight} className="App">
      <Simon />
      {infos && <Infos setInfos={setInfos} />}
      <InfoButton setInfos={setInfos} />
    </div>
  );
}

export default App;
