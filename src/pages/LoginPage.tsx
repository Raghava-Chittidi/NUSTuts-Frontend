import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";
import { Eye, EyeOff } from "@geist-ui/react-icons";
import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const noError = {
  email: null,
  password: null,
};

const LoginPage = ({ userType }: { userType: string }) => {
  const { state, isLoggedIn, isLoggingIn } = useAuthContext();
  const user = state.user;
  const navigate = useNavigate();
  const { login } = useLogin(userType);
  const [toggle, setToggle] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const emailRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const [error, setError] = useState<{
    email: null | string;
    password: null | string;
  }>(noError);

  useEffect(() => {
    if (user) {
      navigate("/");
    } else if (!isLoggingIn && !isLoggedIn) {
      setIsLoading(false);
    }
  }, [user, isLoggingIn]);

  const resetError = (name: string) => {
    if (error[name as keyof typeof error]) {
      setError((prevState) => {
        return {
          ...prevState,
          [name]: null,
        };
      });
    }
  };

  const handleSubmit = async () => {
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    if (!email.includes("@")) {
      setError((prevState) => {
        return {
          ...prevState,
          email: "Invalid email!",
        };
      });
    }

    if (!password) {
      setError((prevState) => {
        return {
          ...prevState,
          password: "Invalid password",
        };
      });
    }

    if (!email.includes("@") || !password) {
      return;
    }

    await login(email, password);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
          <div className="space-y-4">
            <Input
              name="email"
              isRequired
              type="email"
              label="Email"
              className="w-full"
              isInvalid={!!error.email}
              errorMessage={error.email}
              ref={emailRef}
              onChange={(e) => resetError(e.target.name)}
            />
            <Input
              name="password"
              isRequired
              type={toggle ? "text" : "password"}
              label="Password"
              className="w-full"
              isInvalid={!!error.password}
              errorMessage={error.password}
              ref={passwordRef}
              onChange={(e) => resetError(e.target.name)}
              endContent={
                <Button
                  type="button"
                  variant="light"
                  size="sm"
                  onClick={() => setToggle(!toggle)}
                >
                  {toggle ? <EyeOff /> : <Eye />}
                </Button>
              }
            />
            <Button
              color="secondary"
              variant="solid"
              className="w-full"
              onClick={handleSubmit}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
