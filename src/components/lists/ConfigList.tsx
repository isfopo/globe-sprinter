import { Config } from "../../hooks/useConfig";

export interface ConfigListProps {
  config: Config;
}

export const ConfigList: React.FC<ConfigListProps> = ({ config }) => {
  Object.keys(config).map((key) => console.log(config[key]));
  return (
    <div>
      {Object.keys(config).map((key, i) => {
        if (typeof config[key] === "string") {
          return <h2 key={i}>{`${key} ${config[key]}`}</h2>;
        } else {
          return (
            <>
              <h1>{key}</h1>
              <ConfigList config={config[key] as Config} />
            </>
          );
        }
      })}
    </div>
  );
};
