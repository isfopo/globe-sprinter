import { useState } from "react";
import "./App.scss";
import { ConfigList } from "./components/lists/ConfigList";
import { AddMenu } from "./components/menus/AddMenu";
import { useConfig } from "./hooks/useConfig";

export default () => {
  const { config, loading } = useConfig();

  if (loading) {
    return <></>;
  }

  return (
    <div className="container">
      <div className="menu">
        <AddMenu location="/" />
      </div>
      <div className="row">
        <ConfigList config={config} />
      </div>
    </div>
  );
};
