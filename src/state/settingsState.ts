import { atom } from "recoil";
import { Settings } from "../hooks/useSettings";

export const settingsState = atom<Settings | undefined>({
  key: "settings",
  default: undefined,
  dangerouslyAllowMutability: true,
});
