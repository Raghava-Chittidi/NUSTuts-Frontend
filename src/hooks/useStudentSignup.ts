import { useState } from "react";
import axios from "axios";

export const useStudentSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean | null>(null);

    const signup = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        const response = await axios.post("/api/auth/signupStudent", {
            Name: name,
            Email: email,
            Password: password
        });

        if (response.status !== 200) {
            setIsLoading(false);
            setError(response.data);
            return;
        }

        setIsLoading(false);
    }
     return { signup, isLoading, error };
};