import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { configState } from "../state/configState";

export interface Config {
  [key: string]: string | Config;
}

export const useConfig = (): {
  config: Config;
  loading: boolean;
  insert: (location: string, key: string, command?: string) => void;
} => {
  const [config, setConfig] = useRecoilState(configState);

  const insert = useCallback(
    (location: string, key: string, command?: string) => {
      const branch = location?.split("/").filter((step) => step) ?? [];

      setConfig((config) => {
        if (!config) return;
        let place = config;
        for (const step of branch) {
          place = place[step] as Config;
        }
        place[key] = command ?? ({} as Config);
        return config;
      });
    },
    [setConfig]
  );

  return { config: config ?? {}, loading: !config, insert };
};
