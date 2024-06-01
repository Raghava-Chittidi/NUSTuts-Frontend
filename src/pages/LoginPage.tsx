import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { Eye, EyeOff } from "@geist-ui/react-icons";
import { useLogin } from "../hooks/useLogin";

const LoginPage = ({ userType }: { userType: string }) => {
  const { login, error, isLoading } = useLogin(userType);

  const [toggle, setToggle] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    await login(email, password);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    if (name === "email") {
      setEmailError(false);
    }
    if (name === "password") {
      setPasswordError(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full flex items-center justify-center bg-[url('/auth-bg.jpg')] bg-cover">
        <div className="flex-1 max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
            {userType} Login
          </h2>
          <h5 className="text-sm text-center text-gray-500 mb-4">
            Welcome back! Please enter your details
          </h5>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                name="email"
                isRequired
                type="email"
                label="Email"
                className="w-full"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="relative">
                <Input
                  name="password"
                  isRequired
                  type={toggle ? "text" : "password"}
                  label="Password"
                  className="w-full"
                  onChange={handleInputChange}
                />
                <Button
                  type="button"
                  variant="light"
                  onClick={() => setToggle(!toggle)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2"
                >
                  {toggle ? <EyeOff /> : <Eye />}
                </Button>
              </div>
              {passwordError && (
                <p className="text-xs text-red-500 mt-1">
                  Password is required
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <Checkbox value="remember">Remember me</Checkbox>
              <Link to="#" className="text-sm text-purple-600">
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              color="secondary"
              variant="solid"
              className="w-full"
            >
              LOGIN
            </Button>
            {userType === "Student" && (
              <div className="flex items-center">
                <span className="text-sm">Don't have an account?</span>
                <Link
                  to="/student/signup"
                  className="text-sm text-purple-600 ml-2"
                >
                  Sign up
                </Link>
              </div>
            )}
            {error && (
              <div className="mt-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
                <p className="text-sm">{error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
