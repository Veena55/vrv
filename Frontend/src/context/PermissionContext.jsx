import { createContext, useContext } from "react";
import { useQuery } from '@tanstack/react-query';
import api from "../middleware/auth";

const PermissionContext = createContext();

export const usePermission = () => useContext(PermissionContext);

export const PermissionProvider = ({ children }) => {

    const getAllPermissions = async () => {
        const { data } = await api.get('/permission/');
        console.log(data);

        return data;
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ['fetchPermissions'],
        queryFn: getAllPermissions
    });

    return (
        <PermissionContext.Provider value={{ permissions: data, isLoading, error }}>
            {children}
        </PermissionContext.Provider>
    )
}