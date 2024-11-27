import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';
import api from '../middleware/auth';
import { toast } from 'react-toastify';

const AddUser = () => {
    const [formData, setformData] = useState({ username: '', email: '', passwordHash: '', roleId: null, isActive: false });
    const [role, setRole] = useState({ id: null, name: '' });
    const queryClient = useQueryClient();
    const { closeModal } = useModal();


    //fetch all roles
    const getAllRoles = async () => {
        const { data } = await api.get('/role/');
        console.log(data);
        return data;
    }

    //fetch all users
    const addUser = async () => {
        const { data } = await api.post('/user/add', formData);
        return data;
    }

    //call allUsers with useQuery
    const { data: roles } = useQuery({ queryKey: ['fetchRoles'], queryFn: getAllRoles });
    console.log(roles);

    //create mutation
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

        if (!formData.username || !formData.email || !formData.passwordHash) {
            toast.error('Please fill in all fields');
            return;
        }

        mutation.mutate(formData);
    }

    const handleChangeData = (e) => {
        const { name, value, type, checked } = e.target;
        setformData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    const handleRole = (id, roleVal) => {
        setRole({ id: id, name: roleVal });
        setformData(prev => ({ ...prev, roleId: id }));
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
                        <label className='p-2 block'>{!role.name ? '-- Select --' : role.name}</label>

                        <div className='shadow-lg bg-white absolute top-full w-full h-0 rounded-lg overflow-hidden group-hover:h-[6rem] group-hover:overflow-auto transition-all duration-300 ease-in-out'>
                            {roles && roles.map((item, index) => {
                                return (
                                    <div key={index} className="flex items-center gap-2 px-5 py-1 hover:bg-theme hover:text-white rounded-tl-lg rounded-tr-lg"
                                        onClick={() => handleRole(item.id, item.roleName)}>
                                        {role == item.roleName && <FontAwesomeIcon icon={faCheck} className={`text-white group-hover:text-green-500`} />}
                                        <label>{item.roleName}</label>
                                    </div>
                                )
                            })}
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
