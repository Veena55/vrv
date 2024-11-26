import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faKey, faTag, faUser } from '@fortawesome/free-solid-svg-icons'
import { useMenu } from "../context/MenuContext";
const Menu = () => {
    const { menu, handleMenu } = useMenu();
    return (
        <div className="flex items-center">
            <div className={`flex items-center gap-1  ${menu == 'users' ? 'bg-white border-theme border border-b-0 rounded-tl-md rounded-tr-md text-theme font-semibold' : 'bg-light text-light_title border-b border-light_theme'}  py-2 px-5`} onClick={() => handleMenu("users")}>
                <FontAwesomeIcon icon={faUser} className="" />
                <button className="">Users</button>
            </div>
            <div className={`flex items-center gap-1  ${menu == 'roles' ? 'bg-white border-theme border border-b-0 rounded-tl-md rounded-tr-md text-theme font-semibold' : 'bg-light text-light_title border-b border-light_theme'}  py-2 px-5`} onClick={() => handleMenu("roles")}>
                <FontAwesomeIcon icon={faTag} className="" />
                <button className="">Roles</button>
            </div>
            <div className={`flex items-center gap-1  ${menu == 'permissions' ? 'bg-white border-theme border border-b-0 rounded-tl-md rounded-tr-md text-theme font-semibold' : 'bg-light text-light_title border-b border-light_theme'}  py-2 px-5`} onClick={() => handleMenu("permissions")}>
                <FontAwesomeIcon icon={faKey} className="" />
                <button className="">Permission</button>
            </div>
        </div>
    )
}

export default Menu