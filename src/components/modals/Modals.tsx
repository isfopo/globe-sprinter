import { AddCommandModal } from "./AddCommandModal";
import { AddDirectoryModal } from "./AddDirectoryModal";
import { RemoveModal } from "./RemoveModal";
import { SettingsModal } from "./SettingsModal";

export const Modals = () => {
  return (
    <>
      <AddDirectoryModal />
      <AddCommandModal />
      <RemoveModal />
      <SettingsModal />
    </>
  );
};
