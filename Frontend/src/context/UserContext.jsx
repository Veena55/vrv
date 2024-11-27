import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import api from "../middleware/auth";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

    const getAllUsers = async () => {
        const { data } = await api.get('/user/');

        return data;
    }

    const { data, isLoading, error } = useQuery({ queryKey: ['fetchUsers'], queryFn: getAllUsers });

    return (
        <UserContext.Provider value={{ users: data, isLoading, error }}>
            {children}
        </UserContext.Provider>
    )
}
