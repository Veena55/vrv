import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ component: null, title: '' });

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);
    const getModalContent = (data) => setModalContent({ ...data });

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, modalContent, getModalContent }}>
            {children}
        </ModalContext.Provider>
    )
}
