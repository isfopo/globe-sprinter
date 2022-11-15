import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalsState } from "../state/modalsState";

export const useModalListener = <T>(
  id: string,
  onOpen: () => void,
  onClose: () => void
) => {
  const [modals, setModals] = useRecoilState(modalsState);
  const [args, setArgs] = useState<{ [key: string]: any }>();

  useEffect(() => {
    if (modals.map((m) => m.id).includes(id)) {
      onOpen();
      setArgs(modals.filter((m) => m.id === id)[0].args);
    } else {
      onClose();
    }
  }, [modals, onOpen, id]);

  const close = useCallback(() => {
    setModals((m) => m.filter((n) => n.id !== id));
  }, [setModals]);

  return { close, args: (args ?? {}) as T };
};
