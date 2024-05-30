import { useState } from "react";
import axios, { AxiosError } from "axios";

export const useStudentSignup = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean | null>(null);

    const signup = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post("/api/auth/signupStudent", {
                Name: name,
                Email: email,
                Password: password
            });
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
     return { signup, isLoading, error };
};