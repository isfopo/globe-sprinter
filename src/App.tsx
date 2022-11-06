import { useState } from "react";
import "./App.css";
import { ConfigList } from "./components/lists/ConfigList";
import { useConfig } from "./hooks/useConfig";

export default () => {
  const { config, loading } = useConfig();

  if (loading) {
    return <></>;
  }

  return (
    <div className="container">
      <div className="row">
        <p>Configs:</p>
        <ConfigList config={config} />
      </div>
    </div>
  );
};
