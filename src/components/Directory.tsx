import { useState } from "react";
import { Config } from "../hooks/useConfig";
import { DirectoryCell } from "./cells/DirectoryCell";
import { ConfigList } from "./lists/ConfigList";

export interface DirectoryProps {
  title: string;
  config: Config;
  hide?: boolean;
}

export const Directory: React.FC<DirectoryProps> = ({
  title,
  config,
  hide,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <>
      <DirectoryCell
        title={title}
        location={`${location}/${title}`}
        hide={hide}
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
};
