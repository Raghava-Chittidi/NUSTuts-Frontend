import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Input } from '@nextui-org/react';
import { Eye, EyeOff } from '@geist-ui/react-icons';
import studentBg from "../assets/student.jpg";
import taBg from "../assets/ta2.png";

const LoginPage = ({ userType }: { userType: string }) => {
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = {
        status: 'none',
        currentUser: null,
        response: '',
        error: '',
        currentRole: ''
    };

    const [toggle, setToggle] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
    
        if (!email || !password) {
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
    };

    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            if (userType === 'Student') {
                navigate('/student/dashboard');
            } else {
                navigate('/teachingAssistant/dashboard');
            }
        } else if (status === 'failed') {
            setMessage(response);
        } else if (status === 'error') {
            setMessage("Network Error");
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <div className="min-h-screen flex">
            <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="flex-1 max-w-md p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">{userType} Login</h2>
                    <h5 className="text-sm text-center text-gray-500 mb-4">Welcome back! Please enter your details</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm text-gray-700">Enter your email</label>
                            <Input
                                type="email"
                                name="email"
                                autoComplete="email"
                                autoFocus
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
                                    autoComplete="current-password"
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
                        <div className="flex items-center justify-between mb-4">
                            <Checkbox value="remember">Remember me</Checkbox>
                            <Link to="#" className="text-sm text-purple-600">Forgot password?</Link>
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
                            LOGIN
                        </Button>
                        {userType === "Student" &&
                            <div className="flex items-center">
                                <span className="text-sm">Don't have an account?</span>
                                <Link to="/student/signUp" className="text-sm text-purple-600 ml-2">Sign up</Link>
                            </div>
                        }
                    </form>
                </div>
            </div>
            <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${userType === "Student" ? studentBg : taBg})` }} />
        </div>
    );
}

export default LoginPage;
