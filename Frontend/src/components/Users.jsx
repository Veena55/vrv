import { faCircle, faEdit, faPlus, faSearch, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';
import AddUser from './AddUser';
import Modal from './Modal';
import { useModal } from '../context/ModalContext';
import EditUser from './EditUser';
import { useUser } from '../context/UserContext';
import DeleteUser from './DeleteUser';
import { useTheme } from '../context/ThemeContext';

const Users = () => {
    const { theme, darkTheme, lightTheme } = useTheme();
    const { isModalOpen, openModal, getModalContent } = useModal();
    const { users, isLoading, error } = useUser();
    console.log("uuu", users);
    ;

    if (isLoading) {
        return <p>Loading Data...</p>
    }



    const handleModal = (id = null, modalType) => {
        openModal();
        if (modalType == 'add') {
            getModalContent({ component: <AddUser />, title: "Add New User" })
        } else if (modalType == 'edit') {
            const filteredUser = users.filter(user => user.id == id);
            getModalContent({ component: <EditUser user={filteredUser[0]} />, title: "Edit User" })
        }
        else if (modalType == 'delete') {
            const filteredUser = users.filter(user => user.id == id);
            getModalContent({ component: <DeleteUser data={filteredUser[0]} />, title: "Delete User" })
        }
    }


    return (
        <div className='px-5 pb-10 overflow-auto'>
            <div className='flex justify-end pb-5 gap-3'>
                <div className={`inline-flex justify-end gap-1 items-center rounded-lg ${theme == 'light' ? 'bg-white border' : 'bg-gray-800'} shadow  pl-2 pr-5 py-1`}>
                    <input className={`${theme == 'light' ? 'bg-white' : 'bg-gray-900 text-white'}  pr-5 py-1 focus-within:outline-none`} />
                    <FontAwesomeIcon icon={faSearch} className='text-[#9a989a]' />
                </div>
                <button className='bg-theme px-3 py-1 border-theme border text-white rounded-md' onClick={() => handleModal(null, "add")}><FontAwesomeIcon icon={faPlus} /> Add</button>
            </div>
            <div className={`grid grid-cols-[80px_1fr_1.5fr_.5fr_1fr_1fr] items-center py-2 px-5 rounded-lg ${theme == 'light' ? 'bg-white text-[#9a989a]' : 'bg-gray-800 text-white'}  font-semibold`}>
                <div>ID</div>
                <div>Name</div>
                <div className=''>Email</div>
                <div className='text'>Role</div>
                <div className='text-center'>Status</div>
                <div className='text-center'>Action</div>
            </div>
            {users && users.map((user, index) => {
                return (
                    <div key={user.id} className={`grid grid-cols-[80px_1fr_1.5fr_.5fr_1fr_1fr] items-center mt-1 py-2 px-5 rounded-lg ${theme == 'light' ? (index % 2 == 0 ? 'bg-light' : 'bg-white') : (index % 2 == 0 ? 'bg-gray-900 text-white' : 'bg-black text-white')}`}>
                        <div>
                            <p>{index + 1}</p>
                        </div>
                        <div className='inline-flex gap-4 items-center'>
                            <div className={`w-12 h-12 p-1 rounded-full shadow-md flex justify-center items-center font-bold text-theme uppercase ${index % 2 == 0 ? 'bg-light_theme' : 'bg-white'}`}>{user.username.charAt(0)}</div>
                            <p>{user.username}</p>
                        </div>
                        <div className='truncate'>{user.email}</div>
                        <div className={`${!user.Role ? 'text-red-500' : 'text-theme'} `}>{!user.Role ? 'NA' : user.Role.roleName}</div>
                        <div className="flex justify-center">
                            {user.isActive == "1" ?
                                <div className='bg-successBg text-succesText rounded-full shadow flex w-[max-content]  items-center justify-start px-5 text-sm gap-1 font-semibold'>
                                    <FontAwesomeIcon icon={faCircle} className='text-[8px]' />
                                    <p className='text-center m-0 p-0'>Active</p>
                                </div> :
                                <div className='bg-red-100 text-red-500 rounded-full shadow flex w-[max-content]  items-center justify-start px-3 gap-1 font-semibold'>
                                    <FontAwesomeIcon icon={faCircle} className='text-[8px]' />
                                    <p>In Active</p>
                                </div>}
                        </div>
                        <div className='flex gap-2 justify-center items-center'>
                            <FontAwesomeIcon icon={faEdit} className='text-theme cursor-pointer' onClick={() => handleModal(user.id, "edit")} />
                            <FontAwesomeIcon icon={faTrashCan} className='text-red-500 cursor-pointer' onClick={() => handleModal(user.id, "delete")} />
                        </div>
                    </div >)
            })}

            {isModalOpen && <Modal />}

            {/* {(modal.isVisible) && <Modal children={modal.component} title={modal.title} isVisible={setModal} />} */}

        </div >
    )
}

export default Users