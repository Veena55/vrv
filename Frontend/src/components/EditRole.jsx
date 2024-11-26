import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';
import { usePermission } from '../context/PermissionContext';

const EditRole = ({ role }) => {

    const [formData, setFormData] = useState({ roleName: role.roleName });
    const [selectedPermissions, setSelectedPermissions] = useState(role.Permissions.map(permission => permission.id));
    const queryClient = useQueryClient();
    const { closeModal } = useModal();
    const { permissions, isLoading, error } = usePermission();

    // Function to edit a role
    const editRole = async () => {
        const { data } = await axios.put(`http://localhost:8080/role/edit/${role.id}`, {
            roleName: formData.roleName,
            permissions: selectedPermissions,
        });
        return data;
    }

    // Create mutation
    const mutation = useMutation({
        mutationFn: editRole,
        onSuccess: () => {
            console.log('Mutation succeeded, closing modal');
            queryClient.invalidateQueries(['fetchRoles']);
            closeModal();
        },
        onError: (error) => {
            console.error('Error adding user:', error);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Include selected permissions in the formData
        const dataToSubmit = {
            ...formData,
            permissions: selectedPermissions,
        }

        mutation.mutate(dataToSubmit);
    }

    const handleChangeData = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    // Toggle permission selection
    const handlePermissionToggle = (id, permissionName) => {
        console.log(id);

        setSelectedPermissions(prev => {
            if (prev.includes(id)) {
                // Deselect permission
                return prev.filter(permissionId => permissionId !== id);
            } else {
                // Select permission
                return [...prev, id];
            }
        });
    }

    // Get the permission names for selected permissions
    const selectedPermissionNames = permissions.filter(permission => selectedPermissions.includes(permission.id))
        .map(permission => permission.permissionName).join(', ');
    // console.log(selectedPermissions);

    return (
        <div className='py-5 px-10'>
            <form className='w-full' onSubmit={handleSubmit}>
                <div className='flex flex-col mb-3'>
                    <label className='text-light_title font-semibold'>Enter Role Name:</label>
                    <input
                        type="text"
                        name='roleName'
                        className='bg-white px-2 py-2 mt-2 rounded-lg focus-within:outline-none border focus-within:outline-theme focus-within:outline-[2px]'
                        value={formData.roleName}
                        onChange={handleChangeData}
                    />
                </div>

                <div className='flex flex-col mb-3'>
                    <label className='text-light_title font-semibold'>Assign Permissions</label>
                    <div className='border relative group mt-2 rounded-lg'>
                        <label className='p-2 block'>{selectedPermissionNames || '-- Select --'}</label>

                        <div className='shadow-lg bg-white absolute top-full w-full h-0 rounded-lg overflow-hidden group-hover:h-auto group-hover:overflow-auto transition-all duration-300 ease-in-out'>
                            {permissions && permissions.map((item, index) => {
                                const isChecked = selectedPermissions.includes(item.id);
                                return (
                                    <div key={index} className="flex items-center gap-2 px-5 py-1 hover:bg-light_theme hover:text-black rounded-tl-lg rounded-tr-lg">
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => handlePermissionToggle(item.id, item.permissionName)}
                                        />
                                        <label>{item.permissionName}</label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
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

export default EditRole;
