import { useState } from "react";
import { Config } from "../../../hooks/useConfig";
import { CommandCell } from "../../cells/CommandCell";
import { DirectoryCell } from "../../cells/DirectoryCell";
import styles from "./index.module.scss";

export interface ConfigListProps {
  config: Config;
  isChild?: boolean;
}

export const ConfigList: React.FC<ConfigListProps> = ({ config, isChild }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className={`${styles["container"]} ${isChild ? styles["child"] : ""}`}>
      {Object.keys(config).map((title, key) => {
        if (typeof config[title] === "string") {
          return (
            <CommandCell
              title={title}
              command={config[title] as string}
              key={key}
            />
          );
        } else {
          return (
            <>
              <DirectoryCell
                title={title}
                isExpanded={isExpanded}
                expand={() => setIsExpanded((e) => !e)}
              />
              {isExpanded && (
                <ConfigList config={config[title] as Config} isChild={true} />
              )}
            </>
          );
        }
      })}
    </div>
  );
};
