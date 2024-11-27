import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';
import { usePermission } from '../context/PermissionContext';
import api from '../middleware/auth';

const EditPermission = ({ permission }) => {

    const [formData, setformData] = useState({ permissionName: permission.permissionName });
    const queryClient = useQueryClient();
    const { closeModal } = useModal();
    const { permissions, isLoading, error } = usePermission();



    //edit
    const editPermission = async () => {
        const { data } = await api.put(`/permission/edit/${permission.id}`, formData);
        return data;
    }

    //create mutation
    const mutation = useMutation({
        mutationFn: editPermission,
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchUsers']);
            closeModal();
        },
        onError: (error) => {
            console.error('Error adding permission:', error);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        mutation.mutate(formData);
    }

    const handleChangeData = (e) => {
        const { name, value } = e.target;
        setformData(prev => ({
            ...prev,
            [name]: value
        }));
    }


    return (
        <div className='py-5 px-10'>
            <form className='w-full' onSubmit={handleSubmit}>
                <div className='flex flex-col mb-3'>
                    <label className='text-light_title font-semibold'>Enter Permission Name:</label>
                    <input type="text" name='permissionName' className='bg-white px-2 py-2 mt-2 rounded-lg focus-within:outline-none border focus-within:outline-theme focus-within:outline-[2px]'
                        value={formData.permissionName}
                        onChange={handleChangeData} />
                </div>
                <div className="mb-2 mt-5">
                    <button
                        type="submit"
                        className='bg-theme w-full py-2 px-5 rounded-lg text-white'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPermission;
