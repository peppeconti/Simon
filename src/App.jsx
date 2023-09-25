import { useState } from "react";
import Simon from "./components/Simon";
import InfoButton from "./components/InfoButton";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [infos, setInfos] = useState(false);

  return (
    <div className="App">
      <Simon />
      {infos && <Modal infos={infos} setInfos={setInfos} />}
      <InfoButton setInfos={setInfos} />
    </div>
  );
}

export default App;
