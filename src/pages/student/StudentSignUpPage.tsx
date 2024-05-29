import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, CircularProgress, Input } from '@nextui-org/react';
import { Eye, EyeOff } from '@geist-ui/react-icons';
import bgpic from "../../assets/designlogin.jpg";

const StudentSignUpPage = () => {
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = {
        status: 'none',
        currentUser: null,
        response: '',
        error: '',
        currentRole: ''
    }

    const [toggle, setToggle] = useState(false);
    const [message, setMessage] = useState("");

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
    
        if (!name || !email || !password) {
            if (!name) setNameError(true);
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }
    
        const fields = { name, email, password };
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        if (name === 'name') setNameError(false);
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
    };

    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            navigate('/student/dashboard');
        }
        else if (status === 'failed') {
            setMessage(response)
        }
        else if (status === 'error') {
            setMessage("Network Error")
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <div className="min-h-screen flex">
            <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="flex-1 max-w-md p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">Student Sign Up</h2>
                    <h5 className="text-sm text-center text-gray-500 mb-4">Join tutorials by signing up as a a student.</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm text-gray-700">Full Name</label>
                            <Input
                                type="text"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                className={`w-full border rounded-md px-4 py-2 mt-2 ${nameError ? 'border-red-500' : 'border-gray-300'}`}
                                onChange={handleInputChange}
                            />
                            {nameError && <p className="text-xs text-red-500 mt-1">Name is required</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-gray-700">Enter your email</label>
                            <Input
                                type="email"
                                name="email"
                                autoComplete="email"
                                className={`w-full border rounded-md px-4 py-2 mt-2 ${emailError ? 'border-red-500' : 'border-gray-300'}`}
                                onChange={handleInputChange}
                            />
                            {emailError && <p className="text-xs text-red-500 mt-1">Email is required</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-gray-700">Password</label>
                            <div className="relative">
                                <Input
                                    type={toggle ? 'text' : 'password'}
                                    name="password"
                                    autoComplete="new-password"
                                    className={`w-full border rounded-md px-4 py-2 mt-2 ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
                                    onChange={handleInputChange}
                                />
                                <Button
                                    type="button"
                                    variant="light"
                                    onClick={() => setToggle(!toggle)}
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 z-10"
                                >
                                    {toggle ? <EyeOff /> : <Eye />}
                                </Button>
                            </div>
                            {passwordError && <p className="text-xs text-red-500 mt-1">Password is required</p>}
                        </div>
                        <Button
                            type="submit"
                            variant="ghost"
                            className="mb-4"
                            style={{
                                width: '100%',
                                backgroundColor: '#7f56da',
                                color: 'white',
                            }}
                        >
                            SIGN UP
                        </Button>
                        <div className="flex items-center">
                            <span className="text-sm">Already have an account?</span>
                            <Link to="/student/login" className="text-sm text-purple-600 ml-2">Log in</Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${bgpic})` }} />
        </div>
    );
}

export default StudentSignUpPage;