import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

    const getAllUsers = async () => {
        const { data } = await axios.get('http://localhost:8080/user/');
        return data;
    }

    const { data, isLoading, error } = useQuery({ queryKey: ['fetchUsers'], queryFn: getAllUsers });
    // console.log(data);



    // setUsers((prev) => ({ ...prev, data }))
    return (
        <UserContext.Provider value={{ users: data, isLoading, error }}>
            {children}
        </UserContext.Provider>
    )
}
