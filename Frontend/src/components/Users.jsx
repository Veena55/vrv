import { faCircle, faEdit, faPlus, faSearch, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify';
import AddUser from './AddUser';
import Modal from './Modal';
import { useModal } from '../context/ModalContext';
import EditUser from './EditUser';
import { useUser } from '../context/UserContext';
import DeleteUser from './DeleteUser';
import { useTheme } from '../context/ThemeContext';
import { useValidatePermission } from '../context/ValidatePermissionContext';
import { useEffect, useState } from 'react';

const Users = () => {
    const { theme } = useTheme();
    const { validatePermission } = useValidatePermission();
    const { isModalOpen, openModal, getModalContent } = useModal();
    const { users, isLoading } = useUser();
    const [searchText, setSearchText] = useState('');
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        if (!isLoading) {
            setAllUsers(users);
        }
    }, [users, isLoading]);
    if (isLoading) {
        return <p>Loading Data...</p>
    }


    const handleModal = (id = null, modalType) => {
        if (!validatePermission(modalType, "user")) {
            toast.info("You don't have permission!");
            return;
        }
        if (modalType == 'add') {
            openModal();
            getModalContent({ component: <AddUser />, title: "Add New User" })
        } else if (modalType == 'edit') {
            openModal();
            const filteredUser = users.filter(user => user.id == id);
            getModalContent({ component: <EditUser user={filteredUser[0]} />, title: "Edit User" })
        }
        else if (modalType == 'delete') {
            openModal();
            const filteredUser = users.filter(user => user.id == id);
            getModalContent({ component: <DeleteUser data={filteredUser[0]} />, title: "Delete User" })
        }
    }


    const handleSearch = (e) => {
        console.log(e.target.value);
        setSearchText(e.target.value)
    }
    const searchQuery = () => {
        console.log(searchText);
        const filteredUsers = users.filter(item => item.username.includes(searchText));
        setAllUsers(filteredUsers);
    }
    //fetch all users
    const clearSearch = () => {
        setSearchText('');
        setAllUsers(users);
    }
    return (
        <div className='px-5 pb-10 overflow-auto'>
            <div className='flex justify-between flex-col md:flex-row lg:justify-end py-5 lg:pb-5 gap-3'>
                <div className="flex border rounded-lg bg-light items-center px-2">
                    <input type="text" className='w-full focus-within:outline-none p-2 bg-light' value={searchText} placeholder='search user here' onChange={handleSearch} />
                    <FontAwesomeIcon icon={faSearch} className='text-theme cursor-pointer' onClick={searchQuery} />
                    {searchText && (
                        <button onClick={clearSearch} className='ml-2 text-red-500'>
                            Clear
                        </button>
                    )}
                </div>
                <button className='bg-theme px-3 py-1 border-theme border text-white rounded-md' onClick={() => handleModal(null, "add")}><FontAwesomeIcon icon={faPlus} /> Add</button>
            </div>
            <div className={`grid grid-cols-[80px_1fr_1.5fr_.5fr_1fr_1fr] items-center py-2 px-5 rounded-lg ${theme == 'light' ? 'bg-light text-[#9a989a]' : 'bg-gray-800 text-white'}  font-semibold`}>
                <div>ID</div>
                <div>Name</div>
                <div className=''>Email</div>
                <div className='text'>Role</div>
                <div className='text-center'>Status</div>
                <div className='text-center'>Action</div>
            </div>
            {allUsers && allUsers.map((user, index) => {
                return (
                    <div key={user.id} className={`grid grid-cols-[80px_1fr_1.5fr_.5fr_1fr_1fr] items-center mt-1 py-2 px-5 rounded-lg ${theme == 'light' ? (index % 2 == 0 ? 'bg-white' : 'bg-light') : (index % 2 == 0 ? 'bg-gray-900 text-white' : 'bg-black text-white')}`}>
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

        </div >
    )
}

export default Users