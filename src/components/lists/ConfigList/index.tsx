import { useState } from "react";
import { Config } from "../../../hooks/useConfig";
import { CommandCell } from "../../cells/CommandCell";
import { DirectoryCell } from "../../cells/DirectoryCell";
import { Directory } from "../../Directory";
import styles from "./index.module.scss";

export interface ConfigListProps {
  config: Config;
  location?: string;
  isChild?: boolean;
  hide?: boolean;
}

export const ConfigList: React.FC<ConfigListProps> = ({
  config,
  location = "",
  isChild,
  hide,
}) => {
  return (
    <div className={`${styles["container"]} ${isChild ? styles["child"] : ""}`}>
      {Object.keys(config).map((title, key) => {
        if (typeof config[title] === "string") {
          return (
            <CommandCell
              title={title}
              command={config[title] as string}
              key={key}
              hide={hide}
            />
          );
        } else {
          return (
            <Directory
              config={config}
              title={title}
              key={key}
              hide={hide}
              location={location}
            />
          );
        }
      })}
    </div>
  );
};
