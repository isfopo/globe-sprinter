import { atom } from "recoil";
import { Config } from "../hooks/useConfig";

export const configState = atom<Config | undefined>({
  key: "Config",
  default: undefined,
  dangerouslyAllowMutability: true,
});
