import { createContext, useContext, useState } from "react";
import api from '../middleware/auth';
import { useQuery } from "@tanstack/react-query";

const ValidatePermissionContext = createContext();
export const useValidatePermission = () => useContext(ValidatePermissionContext);

export const ValidatePermissionProvider = ({ children }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['fetchProfile'],
        queryFn: async () => {
            const { data } = await api.get('/auth/profile');
            const { name, email, role } = data ?? {};
            return { email, name, role };
        }
    });

    const validatePermission = (permissionType, optType) => {
        if (!data?.role) return false;

        if (data.role === 'Admin' && permissionType === 'add') return true;

        // Support role doesn't have permissions to edit or delete certain resources
        if ((optType === "role" || optType === "user" || optType === "permission") && data.role === 'Support' && (permissionType === 'add' || permissionType === 'edit' || permissionType === 'delete')) return false;

        // Manager role cannot add, delete, or edit roles
        if ((optType === "role" || optType == "permission") && data.role === 'Manager' && (permissionType === 'add' || permissionType === 'delete' || permissionType === 'edit')) return false;

        // Manager role can add or edit users, but not delete
        if (optType === "user" && data.role === 'Manager' && (permissionType === 'add' || permissionType === 'edit')) return true;
        if (optType === "user" && data.role === 'Manager' && permissionType === 'delete') return false; // Manager can't delete users

        return true;
    };



    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;

    return (
        <ValidatePermissionContext.Provider value={{ data, isLoading, error, validatePermission }}>
            {children}
        </ValidatePermissionContext.Provider>
    );
};
