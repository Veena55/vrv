import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';
import { usePermission } from '../context/PermissionContext';

const AddPermission = () => {
    const [formData, setformData] = useState({ permissionName: '' });
    // const [role, setRole] = useState({ id: null, name: '' });s
    const queryClient = useQueryClient();
    const { closeModal } = useModal();
    const { permissions, isLoading, error } = usePermission();

    console.log(permissions);

    //fetch all roles
    // const getAllRoles = async () => {
    //     const { data } = await axios.get('http://localhost:8080/role/');
    //     console.log(data);
    //     return data;
    // }

    //fetch all users
    const addPermission = async () => {
        const { data } = await axios.post('http://localhost:8080/permission/add', formData);
        return data;
    }

    //call allUsers with useQuery
    // const { data: roles, isLoading, error } = useQuery({ queryKey: ['fetchRoles'], queryFn: getAllRoles });
    // console.log(roles);

    //create mutation
    const mutation = useMutation({
        mutationFn: addPermission,
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchPermissions']);
            closeModal();
        },
        onError: (error) => {
            console.error('Error adding permission:', error);
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

    // const handleRole = (id, roleVal) => {
    //     setRole({ id: id, name: roleVal });
    //     setformData(prev => ({ ...prev, roleId: id }));
    // }

    return (
        <div className='py-5 px-10'>
            <form className='w-full' onSubmit={handleSubmit}>
                <div className='flex flex-col mb-3'>
                    <label className='text-light_title font-semibold'>Enter Permission Name:</label>
                    <input type="text" name='permissionName' className='bg-white px-2 py-2 mt-2 rounded-lg focus-within:outline-none border focus-within:outline-theme focus-within:outline-[2px]'
                        onChange={handleChangeData} />
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

export default AddPermission;
