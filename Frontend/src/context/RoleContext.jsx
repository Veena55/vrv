import { createContext, useContext } from "react";
import { useQuery } from '@tanstack/react-query';
import api from "../middleware/auth";

const RoleContext = createContext();

export const useRole = () => useContext(RoleContext);

export const RoleProvider = ({ children }) => {

    const getAllRoles = async () => {
        const { data } = await api.get('/role/');
        return data;
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ['fetchRoles'],
        queryFn: getAllRoles
    });

    return (
        <RoleContext.Provider value={{ roles: data, isLoading, error }}>
            {children}
        </RoleContext.Provider>
    )
}