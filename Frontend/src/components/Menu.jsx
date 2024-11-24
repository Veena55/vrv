import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faKey, faTag, faUser } from '@fortawesome/free-solid-svg-icons'
const Menu = () => {
    return (
        <div className="flex items-center">
            <div className="flex items-center gap-1 bg-white border-theme border border-b-0 rounded-tl-md rounded-tr-md text-theme font-semibold py-2 px-5">
                <FontAwesomeIcon icon={faUser} size="md" className="text-theme" />
                <button className="">Users</button>
            </div>
            <div className="flex items-center gap-1 bg-light text-light_title border-b border-light_theme py-2 px-5 rounded-tl-lg">
                <FontAwesomeIcon icon={faTag} size="md" className="text-light_title" />
                <button className="">Roles</button>
            </div>
            <div className="flex items-center gap-1 bg-light text-light_title border-b border-light_theme py-2 px-5 rounded-tl-lg">
                <FontAwesomeIcon icon={faKey} size="md" className="text-light_title" />
                <button className="">Permission</button>
            </div>
        </div>
    )
}

export default Menu