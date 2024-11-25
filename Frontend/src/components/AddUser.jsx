import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const AddUser = () => {
    return (
        <div className='py-5 px-5'>
            <form className='w-full'>
                <div className='flex flex-col mb-3'>
                    <label className='text-light_title font-semibold'>Enter User Name:</label>
                    <input type="text" className='bg-white px-2 py-2 mt-2 rounded-lg focus-within:outline-none border focus-within:outline-theme focus-within:outline-[2px]' />
                </div>
                <div className='flex flex-col mb-3'>
                    <label className='text-light_title font-semibold'>Enter Email Address:</label>
                    <input type="text" className='bg-white px-2 py-2 rounded-lg mt-2 focus-within:outline-none border focus-within:outline-theme focus-within:outline-[2px]' />
                </div>
                <div className='flex flex-col mb-3'>
                    <label className='text-light_title font-semibold'>Assign Role</label>
                    <div className='border relative group mt-2 rounded-lg'>
                        <label className='p-2 block'>-- Select --</label>
                        <div className='shadow-lg bg-white absolute top-full w-full h-0 rounded-lg overflow-hidden group-hover:h-[6rem] group-hover:overflow-auto transition-all duration-300 ease-in-out'>
                            <div className="flex items-center gap-2 px-5 py-1 hover:bg-theme hover:text-white rounded-tl-lg rounded-tr-lg">
                                <FontAwesomeIcon icon={faCheck} className={`text-light_title`} />
                                <label>Admin</label>
                            </div>
                            <div className="flex items-center gap-2 px-5 py-1 hover:bg-theme hover:text-white">
                                <FontAwesomeIcon icon={faCheck} className={`text-light_title`} />
                                <label>Supervisor</label>
                            </div>
                            <div className="flex items-center gap-2 px-5 py-1 hover:bg-theme hover:text-white rounded-bl-lg rounded-br-lg">
                                <FontAwesomeIcon icon={faCheck} className={`text-light_title`} />
                                <label>Editor</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex gap-1 my-3 items-center'>
                    <input type="checkbox" className='bg-white px-2 py-2 mt-2 focus-within:outline-none border focus-within:border-theme' />
                    <label>Set Active</label>
                </div>
                <div className="mb-2 mt-5">
                    <button className='bg-theme w-full py-2 px-5 rounded-lg text-white'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddUser