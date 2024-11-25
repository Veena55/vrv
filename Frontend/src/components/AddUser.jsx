import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';

const AddUser = () => {
    const [formData, setformData] = useState({ username: '', email: '', passwordHash: '', roleId: null, isActive: false });
    const [role, setRole] = useState('');
    const queryClient = useQueryClient();
    const { closeModal } = useModal();

    const addUser = async () => {
        const { data } = await axios.post('http://localhost:8080/user/add', formData);
        return data;
    }

    const mutation = useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchUsers']);
            closeModal();
        },
        onError: (error) => {
            console.error('Error adding user:', error);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        // if (!formData.username || !formData.email) {
        //     alert('Please fill in all fields');
        //     return;
        // }

        mutation.mutate(formData);
        // setformData({ username: '', email: '', passwordHash: '', roleId: '', isActive: false }); // Reset after submission
    }

    const handleChangeData = (e) => {
        const { name, value, type, checked } = e.target;
        setformData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    const handleRole = (roleVal) => {
        setRole(roleVal);
        setformData(prev => ({ ...prev, role: roleVal }));
    }

    return (
        <div className='py-5 px-10'>
            <form className='w-full' onSubmit={handleSubmit}>
                <div className='flex flex-col mb-3'>
                    <label className='text-light_title font-semibold'>Enter User Name:</label>
                    <input type="text" name='username' className='bg-white px-2 py-2 mt-2 rounded-lg focus-within:outline-none border focus-within:outline-theme focus-within:outline-[2px]'
                        onChange={handleChangeData} />
                </div>
                <div className='flex flex-col mb-3'>
                    <label className='text-light_title font-semibold'>Enter Email Address:</label>
                    <input type="email" name='email' className='bg-white px-2 py-2 rounded-lg mt-2 focus-within:outline-none border focus-within:outline-theme focus-within:outline-[2px]'
                        onChange={handleChangeData} />
                </div>
                <div className='flex flex-col mb-3'>
                    <label className='text-light_title font-semibold'>Enter Temporary Password:</label>
                    <input type="text" name='passwordHash' className='bg-white px-2 py-2 rounded-lg mt-2 focus-within:outline-none border focus-within:outline-theme focus-within:outline-[2px]'
                        onChange={handleChangeData} />
                </div>
                <div className='flex flex-col mb-3'>
                    <label className='text-light_title font-semibold'>Assign Role</label>
                    <div className='border relative group mt-2 rounded-lg'>
                        <label className='p-2 block'>{!role ? '-- Select --' : role}</label>
                        <div className='shadow-lg bg-white absolute top-full w-full h-0 rounded-lg overflow-hidden group-hover:h-[6rem] group-hover:overflow-auto transition-all duration-300 ease-in-out'>
                            <div className="flex items-center gap-2 px-5 py-1 hover:bg-theme hover:text-white rounded-tl-lg rounded-tr-lg"
                                onClick={() => handleRole('Admin')}>
                                {role == 'Admin' && <FontAwesomeIcon icon={faCheck} className={`text-white group-hover:text-green-500`} />}
                                <label>Admin</label>
                            </div>
                            <div className="group flex items-center gap-2 px-5 py-1 hover:bg-theme hover:text-white"
                                onClick={() => handleRole('Supervisor')}>
                                {role == 'Supervisor' && <FontAwesomeIcon icon={faCheck} className={`text-white group-hover:text-green-500`} />}
                                <label>Supervisor</label>
                            </div>
                            <div className="group flex items-center gap-2 px-5 py-1 hover:bg-theme hover:text-white"
                                onClick={() => handleRole('Editor')}>
                                {role == 'Editor' && <FontAwesomeIcon icon={faCheck} className={`text-white group-hover:text-green-500`} />}
                                <label>Editor</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex gap-1 my-3 items-center'>
                    <input type="checkbox" name='isActive' className='bg-white px-2 py-2 mt-2 focus-within:outline-none border focus-within:border-theme'
                        onChange={handleChangeData} />
                    <label>Set Active</label>
                </div>
                <div className="mb-2 mt-5">
                    <button
                        type="submit"
                        className='bg-theme w-full py-2 px-5 rounded-lg text-white'
                        disabled={mutation.isLoading}
                    >
                        {mutation.isLoading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddUser;
