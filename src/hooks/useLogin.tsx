import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useLogin = (userType: string) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuthContext();

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        const url = userType === "Student" ? "/api/auth/loginStudent" : "/api/auth/loginTA";
        const response = await axios.post(url, {
            Email: email,
            Password: password
        });


        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({type: "LOGIN", payload: response.data})
        setIsLoading(false);
    }
     return { login, isLoading, error };
};