import { createContext, useContext } from 'react';

interface ModalContextValue {
  onClose?: () => void;
}

export const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const useModalContext = () => {
  return useContext(ModalContext);
};
