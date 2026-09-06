import { useModalContext } from '@/features/world/context/ModalStateContext';

export function useModalState() {
  return useModalContext();
}
