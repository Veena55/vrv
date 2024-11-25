import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Modal = ({ children, title, isVisible }) => {
    return (
        <div className="fixed flex justify-center items-center h-screen inset-0 backdrop-blur-[2px]">
            <div className="bg-white opacity-1 fixed z-50 shadow-2xl shadow-light_theme rounded-lg w-1/2">
                <div className="flex justify-between py-3">
                    <p className="text-theme font-semibold text-center pl-8 text-lg">{title}</p>
                    <FontAwesomeIcon icon={faClose} className="text-red-500 text-lg float pr-5 cursor-pointer" onClick={() => isVisible({ isVisible: false })} />
                </div>
                <hr />
                {children}
            </div>
        </div>
    )
}

export default Modal