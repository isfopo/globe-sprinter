import { AddCommandModal } from "./AddCommandModal";
import { AddDirectoryModal } from "./AddDirectoryModal";
import { RemoveModal } from "./RemoveModal";

export const Modals = () => {
  return (
    <>
      <AddDirectoryModal />
      <AddCommandModal />
      <RemoveModal />
    </>
  );
};
