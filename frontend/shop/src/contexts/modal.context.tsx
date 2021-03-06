import React, { useContext, useReducer } from "react";

type StateType = {
  isOpen: boolean;
  component?: React.FC<any> | Element;
  modalProps?: ModalProps;
};

type ModalProps = {
  onClose?: () => void;
  closeOnClickOutside?: boolean;
};

type ModalContextType = {
  state: StateType;
  openModal: (comp: React.FC<any> | Element, props?: ModalProps) => void;
  closeModal: () => void;
};

const initState: StateType = {
  isOpen: false,
};

type ActionType =
  | {
      type: "OPEN_MODAL";
      component: React.FC<any> | Element;
      modalProps?: ModalProps;
    }
  | { type: "CLOSE_MODAL" };

function modalReducer(state: StateType, { type, ...action }: ActionType) {
  switch (type) {
    case "OPEN_MODAL":
      return { ...state, isOpen: true, ...action };
    case "CLOSE_MODAL":
      return { ...state, isOpen: false };
  }
}

const initCtxValue: ModalContextType = {
  state: initState,
  openModal: (_) => null,
  closeModal: () => null,
};

const ModalContext = React.createContext<ModalContextType>(initCtxValue);

export const ModalProvider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, initState);
  function openModal(
    component: React.FC<any> | Element,
    modalProps?: ModalProps
  ) {
    dispatch({ type: "CLOSE_MODAL" });
    dispatch({ type: "OPEN_MODAL", component, modalProps });
  }
  function closeModal() {
    dispatch({ type: "CLOSE_MODAL" });
  }

  const value = {
    state,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (context === undefined) throw "Please wrap this on ModalProvider";

  return context;
};
