import { ReactNode } from "react";

export interface ModalOptions {
  defaultClose?: boolean; // Allow customization like showing/hiding the close button
  boxStyles?: string;
  closeOutClick?: boolean;
  onClose?: () => void;
  containerStyles?: string;
}

export interface ModalContextType {
  openModal: (
    modalContent: ReactNode,
    modalOptions?: ModalOptions,
    name?: string
  ) => void; // openModal accepts content and optional options
  closeModal: (name?: string) => void;
}

export interface openedModal {
  modalContent: ReactNode;
  modalOptions: ModalOptions;
  name?: string;
}
