import { faKey, faLandMineOn, faMoon, faSignOut, faSun, faTag, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import api from '../middleware/auth'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMenu } from '../context/MenuContext'

const SideBar = () => {
    const navigate = useNavigate();
    const { theme, darkTheme, lightTheme } = useTheme();
    const { menu, handleMenu } = useMenu();

    const handleLogout = async () => {
        console.log("hoooo")
        const { data } = await api.get('/auth/logout');
        if (data) {
            toast.success('Logged Out!!');
            navigate('/');
        }

    }

    return (
        <div className='h-screen bg-theme  text-white flex items-center gap-2 justify-start flex-col sticky top-0 bottom-0'>
            <h1 className='font-bold mb-0 pt-2 pb-0'><FontAwesomeIcon className='text-3xl' icon={faLandMineOn} /></h1>
            <div className='border border-b-5 w-full border-light_theme'></div>
            <FontAwesomeIcon icon={faUser} className='p-5 text-xl hover:bg-light_theme rounded-md' onClick={() => handleMenu("users")} />
            <FontAwesomeIcon icon={faTag} className='p-5 text-xl hover:bg-light_theme rounded-md' onClick={() => handleMenu("roles")} />
            <FontAwesomeIcon icon={faKey} className='p-5 text-xl hover:bg-light_theme rounded-md' onClick={() => handleMenu("permissions")} />
            {theme == 'light' && <FontAwesomeIcon icon={faMoon} className='p-5 text-xl bg-light_theme rounded-md' onClick={() => darkTheme()} />}
            {theme == 'dark' && <FontAwesomeIcon icon={faSun} className='p-5 text-xl cursor-pointer bg-light_theme rounded-md' onClick={() => lightTheme()} />}
            <FontAwesomeIcon icon={faSignOut} className='p-5 text-xl cursor-pointer hover:bg-light_theme rounded-md' onClick={handleLogout} />
        </div>
    )
}

export default SideBar