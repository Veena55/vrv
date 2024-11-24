import { faKey, faMoon, faSignOut, faSun, faTag, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const SideBar = () => {
    return (
        <div className='h-screen bg-theme w-20 text-white flex items-center gap-2 justify-start flex-col'>
            <h1 className='font-bold mb-0 pt-2 pb-0'>Logo</h1>
            <div className='border border-b-5 w-full border-light_theme'></div>
            <FontAwesomeIcon icon={faUser} className='pt-5 text-xl' tooltip="jjui" />
            <FontAwesomeIcon icon={faTag} className='pt-5 text-xl' />
            <FontAwesomeIcon icon={faKey} className='pt-5 text-xl' />
            <FontAwesomeIcon icon={faMoon} className='pt-5 text-xl' />
            <FontAwesomeIcon icon={faSun} className='pt-5 text-xl' />
            <FontAwesomeIcon icon={faSignOut} className='pt-5 text-xl' />
        </div>
    )
}

export default SideBar