import { useState } from "react";
import "./App.css";
import { useConfig } from "./assets/hooks/useConfig";

function App() {
  const [name, setName] = useState("");

  const config = useConfig();

  return (
    <div className="container">
      <div className="row">
        <div>
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="button" onClick={() => {}}>
            Greet
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
