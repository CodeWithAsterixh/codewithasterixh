import { MapLocationEntry } from '../data/mapLayout';
import { InteractiveWorldObject } from '../data/mapObjects';

export interface ModalStateContextType {
  isPauseModalOpen: boolean;
  setIsPauseModalOpen: (open: boolean) => void;
  activeStationModal: MapLocationEntry | null;
  setActiveStationModal: (station: MapLocationEntry | null) => void;
  bookModalState: { isOpen: boolean; mode: 'about' | 'works' };
  setBookModalState: React.Dispatch<React.SetStateAction<{ isOpen: boolean; mode: 'about' | 'works' }>>;
  infoTilesetState: { isOpen: boolean; mode: 'project' | 'contact'; projectSlug?: string };
  setInfoTilesetState: React.Dispatch<
    React.SetStateAction<{ isOpen: boolean; mode: 'project' | 'contact'; projectSlug?: string }>
  >;
  isAnyModalOpen: boolean;
  handleOpenPauseMenu: () => void;
  handleInspectObject: (obj: InteractiveWorldObject) => void;
  handleInspectStation: (loc?: MapLocationEntry) => void;
  handleOpenAboutBook: () => void;
  handleOpenWorksBook: () => void;
  handleOpenContactTileset: () => void;
  handleOpenProjectDetailFromBook: (projectSlug: string) => void;
  handleExitWorld: () => void;
}
