import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { ModalDispatch, modalsState } from "../state/modalsState";

export const useModalDispatch = () => {
  const setModals = useSetRecoilState(modalsState);

  const openModal = useCallback(
    (id: string, args?: { [key: string]: any }) => {
      setModals((m) => [...m, { id, args: args ?? {} }]);
    },
    [setModals]
  );

  return openModal;
};
