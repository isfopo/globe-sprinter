import { readTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import { Config } from "../hooks/useConfig";

export const readConfig = async (): Promise<Config> => {
  return JSON.parse(
    await readTextFile("config.json", {
      dir: BaseDirectory.AppData,
    })
  );
};
