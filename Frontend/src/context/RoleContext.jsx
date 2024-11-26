import { createContext, useContext } from "react";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const RoleContext = createContext();

export const useRole = () => useContext(RoleContext);

export const RoleProvider = ({ children }) => {

    const getAllRoles = async () => {
        const { data } = await axios.get('http://localhost:8080/role/');
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