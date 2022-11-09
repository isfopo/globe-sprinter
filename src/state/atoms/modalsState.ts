import { atom } from "recoil";

export const modalsState = atom<string[]>({
  key: "Modals",
  default: [],
});
