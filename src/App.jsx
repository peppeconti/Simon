import { useState } from "react";
import Simon from "./components/Simon";
import InfoButton from "./components/InfoButton";
import Infos from "./components/Infos";
import "./App.css";

function App() {
  const [infos, setInfos] = useState(false);
/*const app = useRef();
  
  useEffect(() => {

    app.current.style.minHeight = window.innerHeight + "px";

    window.addEventListener('resize', () => {
      app.current.style.minHeight = window.innerHeight + "px";
    });
    
  }, []);*/

  return (
    <div className="App">
      <Simon />
      {infos && <Infos setInfos={setInfos} />}
      <InfoButton setInfos={setInfos} />
    </div>
  );
}

export default App;
