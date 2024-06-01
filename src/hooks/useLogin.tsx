import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useAuthContext } from "./useAuthContext";

export const useLogin = (userType: string) => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuthContext();

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        const url = userType === "Student" ? "/api/auth/loginStudent" : "/api/auth/loginTA";
        try {
            const response = await axios.post(url, {
                Email: email,
                Password: password
            });
            localStorage.setItem("user", JSON.stringify(response.data.data));
            dispatch({type: "LOGIN", payload: response.data.data})
        } catch (error: unknown) {
            console.log("error: ", error);
            if (error instanceof AxiosError) {
                setError(error.response?.data.message || error.message)
            } else if (error instanceof Error) {
                setError(error.message);
            }
        }

        setIsLoading(false);
    }
     return { login, isLoading, error };
};