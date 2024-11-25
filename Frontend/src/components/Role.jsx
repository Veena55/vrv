import { faEdit, faTrash, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Role = () => {
    return (
        <div className='p-5'>
            <div className='flex justify-between py-2 px-10 rounded-lg bg-light text-[#9a989a] font-semibold'>
                <div>ID</div>
                <div>Name</div>
                <div>Action</div>
            </div>
            <div className='flex justify-between py-2 px-10 rounded-lg bg-white'>
                <div>ID</div>
                <div>Name</div>
                <div className='flex gap-2 items-center'>
                    <FontAwesomeIcon icon={faEdit} className='text-theme' />
                    <FontAwesomeIcon icon={faTrashCan} className='text-red-500' />
                </div>
            </div>
            <div className='flex justify-between py-2 px-10 rounded-lg bg-[#FAFAFC]'>
                <div>ID</div>
                <div>Name</div>
                <div>Email</div>
            </div>
        </div>
    )
}

export default Role