import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useModal } from "../context/ModalContext";

const Modal = () => {
    const { isModalOpen, closeModal, modalContent } = useModal();
    if (!isModalOpen) return null;
    console.log(modalContent, "---content");

    return (
        <div className="fixed flex justify-center items-center h-screen inset-0 backdrop-blur-[2px] backdrop-brightness-50">
            <div className="bg-white opacity-1 fixed z-50 shadow-2xl shadow-light_theme rounded-lg lg:w-1/2">
                <div className="flex justify-between py-3">
                    <p className="text-theme font-semibold text-center pl-8 text-lg">{modalContent.title}</p>
                    <FontAwesomeIcon icon={faClose} className="text-red-500 text-lg float pr-5 cursor-pointer" onClick={closeModal} />
                </div>
                <hr />
                {modalContent.component}
            </div>
        </div>
    )
}

export default Modal