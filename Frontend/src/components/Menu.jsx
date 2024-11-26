import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faKey, faTag, faUser } from '@fortawesome/free-solid-svg-icons'
import { useMenu } from "../context/MenuContext";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
const Menu = () => {
    const { menu, handleMenu } = useMenu();
    const { theme } = useTheme();
    const [themeColor, setThemeColor] = useState('bg-white');
    useEffect(() => {
        // let themeColor = 'bg-white';
        if (theme == "light") {
            setThemeColor("bg-white");
        } else {
            setThemeColor("bg-gray-900")
        }
    }, [theme])
    return (
        <div className="flex items-center">
            <div className=
                {`flex items-center gap-1 ${menu === 'users' ? `${themeColor} border-theme border border-b-0 rounded-tl-md rounded-tr-md text-theme font-semibold` : 'bg-light text-light_title border-b border-light_theme'} py-2 px-5`}
                onClick={() => handleMenu("users")}>
                <FontAwesomeIcon icon={faUser} className="" />
                <button className="">Users</button>
            </div>
            <div className=
                {`flex items-center gap-1  ${menu == 'roles' ? `${themeColor} border-theme border border-b-0 rounded-tl-md rounded-tr-md text-theme font-semibold` : 'bg-light text-light_title border-b border-light_theme'} py-2 px-5`}
                onClick={() => handleMenu("roles")}>
                <FontAwesomeIcon icon={faTag} className="" />
                <button className="">Roles</button>
            </div>
            <div className={`flex items-center gap-1  ${menu == 'permissions' ? `${themeColor} border-theme border border-b-0 rounded-tl-md rounded-tr-md text-theme font-semibold` : 'bg-light text-light_title border-b border-light_theme'} py-2 px-5`}
                onClick={() => handleMenu("permissions")}>
                <FontAwesomeIcon icon={faKey} className="" />
                <button className="">Permission</button>
            </div>
        </div >
    )
}

export default Menu