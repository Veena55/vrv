import { faCircle, faEdit, faPlus, faSearch, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import AddUser from './AddUser';
import Modal from './Modal';
import { useModal } from '../context/ModalContext';

const Users = () => {
    const [modal, setModal] = useState({ component: null, title: '' });
    const { isModalOpen, openModal, closeModal } = useModal();
    const getAllUsers = async () => {
        const { data } = await axios.get('http://localhost:8080/user/');
        return data;
    }

    const { data: users, isLoading, error } = useQuery({ queryKey: ['fetchUsers'], queryFn: getAllUsers });
    console.log(users);

    if (isLoading) {
        return <p>Loading Data...</p>
    }

    const handleAddUser = () => {
        openModal();
        setModal({ component: <AddUser />, title: "Add New User" })
    }


    return (
        <div className='px-5 pb-10 overflow-auto'>
            <div className='flex justify-end pb-5 gap-3'>
                <div className='inline-flex justify-end gap-1 items-center border rounded-lg bg-white shadow  pl-2 pr-5 py-1'>
                    <input className=' bg-white pr-5 py-1 focus-within:outline-none' />
                    <FontAwesomeIcon icon={faSearch} className='text-[#9a989a]' />
                </div>
                <button className='bg-theme px-3 py-1 border-theme border text-white rounded-md' onClick={handleAddUser}><FontAwesomeIcon icon={faPlus} /> Add</button>
            </div>
            <div className='grid grid-cols-[80px_1fr_1.5fr_.5fr_1fr_1fr] items-center py-2 px-5 rounded-lg bg-light text-[#9a989a] font-semibold'>
                <div>ID</div>
                <div>Name</div>
                <div className=''>Email</div>
                <div className='text'>Role</div>
                <div className='text-center'>Status</div>
                <div className='text-center'>Action</div>
            </div>
            {users && users.map((user, index) => {
                return (
                    <div key={user.id} className={`grid grid-cols-[80px_1fr_1.5fr_.5fr_1fr_1fr] items-center py-2 px-5 rounded-lg ${index % 2 == 0 ? 'bg-white' : 'bg-light'}`}>
                        <div>
                            <p>{index + 1}</p>
                        </div>
                        <div className='inline-flex gap-4 items-center'>
                            <div className='w-12 h-12 bg-light p-1 rounded-full shadow-md flex justify-center items-center font-bold text-theme uppercase'>{user.username.charAt(0)}</div>
                            <p>{user.username}</p>
                        </div>
                        <div className='truncate'>{user.email}</div>
                        <div className=''>{!user.role ? 'NA' : user.role}</div>
                        <div className="flex justify-center">
                            {user.isActive ?
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
                            <FontAwesomeIcon icon={faEdit} className='text-theme' />
                            <FontAwesomeIcon icon={faTrashCan} className='text-red-500' />
                        </div>
                    </div>)
            })}

            {isModalOpen && <Modal children={modal.component} title={modal.title} />}

            {/* {(modal.isVisible) && <Modal children={modal.component} title={modal.title} isVisible={setModal} />} */}

        </div>
    )
}

export default Users