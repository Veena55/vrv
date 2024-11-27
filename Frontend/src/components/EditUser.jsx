import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';
import api from '../middleware/auth';

const EditUser = ({ user }) => {
    const [formData, setformData] = useState({ username: user.username, email: user.email, roleId: null, isActive: user.isActive === '1' });
    const [role, setRole] = useState({ id: null, name: user.Role?.roleName });
    const queryClient = useQueryClient();
    const { closeModal } = useModal();
    console.log(user);


    //fetch all roles
    const getAllRoles = async () => {
        const { data } = await axios.get('http://localhost:8080/role/');
        console.log(data);
        return data;
    }

    //edit user
    const editUser = async () => {
        const { data } = await api.put(`/user/edit/${user.id}`, formData);
        return data;
    }

    //fetch roles with useQuery
    const { data: roles, isLoading, error } = useQuery({ queryKey: ['fetchRoles'], queryFn: getAllRoles });


    //create mutation
    const mutation = useMutation({
        mutationFn: editUser,
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchUsers']);
            closeModal();
        },
        onError: (error) => {
            console.error('Error editing user:', error);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.username || !formData.email) {
            alert('Please fill in all fields');
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
                        value={formData.username}
                        onChange={handleChangeData} />
                </div>
                <div className='flex flex-col mb-3'>
                    <label className='text-light_title font-semibold'>Enter Email Address:</label>
                    <input type="email" name='email' className='bg-white px-2 py-2 rounded-lg mt-2 focus-within:outline-none border focus-within:outline-theme focus-within:outline-[2px] disabled:cursor-not-allowed disabled:bg-light_theme'
                        value={formData.email}
                        onChange={handleChangeData} readOnly disabled />
                </div>

                <div className='flex flex-col mb-3'>
                    <label className='text-light_title font-semibold'>Modify Role</label>
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
                        onChange={handleChangeData}
                        checked={formData.isActive == '1'}
                    />
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

export default EditUser;
