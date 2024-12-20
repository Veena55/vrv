import React, { useState } from 'react'
import { useModal } from '../context/ModalContext'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import api from '../middleware/auth';

const DeleteUser = ({ data }) => {
    const queryClient = useQueryClient();

    console.log(data);

    const { closeModal } = useModal();

    // delete user function
    const deleteUser = async () => {
        await api.delete(`/user/delete/${data.id}`)
    }

    const mutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchUsers']);
            closeModal();
        }, onError: (error) => {
            console.error('Error in deleting user:', error);
        },
    })

    const handleDelete = (val) => {
        if (val == 'cancel') closeModal();
        else mutation.mutate();
    }

    return (
        <div className='flex justify-center flex-col items-center'>
            <div className='mt-5'>
                <h1 className='font-semibold text-xl'>User will be <span className='text-red-500 underline'>Deleted Premanantly</span>, are you sure?</h1>
                <div className='pt-3'>
                    {/* <p className='text-theme font-bold text-lg'>User Details</p> */}
                    {/* <hr className='text-theme' /> */}
                    <p className='text-light_title'>Name: <span className='font-medium text-theme'>{data.username}</span></p>
                    <p className='text-light_title'>Email: <span className='font-medium text-theme'>{!data.email ? "Not Available" : data.email}</span></p>
                </div>
            </div>
            <div className='border-t-2 mt-5 w-full text-center'>
                <button className='mx-1 my-5 px-5 py-2 hover:bg-red-800 bg-red-500 text-white rounded-md' onClick={() => handleDelete("id")}>Yes</button>
                <button className='mx-1 my-5 px-5 py-2 hover:bg-gray-400 bg-light_theme rounded-md' onClick={() => handleDelete('cancel')}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteUser

