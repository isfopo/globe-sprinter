import { useState } from "react";
import { Config } from "../../../hooks/useConfig";
import { CommandCell } from "../../cells/CommandCell";
import { DirectoryCell } from "../../cells/DirectoryCell";
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
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div
      className={`${styles["container"]} ${
        isExpanded ? styles["expanded"] : ""
      } ${isChild ? styles["child"] : ""}`}
    >
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
            <>
              <DirectoryCell
                title={title}
                location={`${location}/${title}`}
                isExpanded={isExpanded}
                expand={() => setIsExpanded((e) => !e)}
              />
              <ConfigList
                config={config[title] as Config}
                isChild={true}
                location={`${location}/${title}`}
                hide={!isExpanded}
              />
            </>
          );
        }
      })}
    </div>
  );
};
