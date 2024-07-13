import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";
import { Eye, EyeOff } from "@geist-ui/react-icons";
import { useStudentSignup } from "../../hooks/useStudentSignup";
import axios from "axios";
import { ActionMeta, MultiValue } from "react-select";
import { getCurrentAY } from "../../util/util";
import { useAuthContext } from "../../hooks/useAuthContext";
import WindowedSelect from "react-windowed-select";

const noError = {
  name: null,
  email: null,
  password: null,
  modules: null,
};

const StudentSignUpPage = () => {
  const user = useAuthContext().state.user;
  const navigate = useNavigate();
  const { signup } = useStudentSignup();
  const [toggle, setToggle] = useState<boolean>(false);
  const nameRef = useRef<null | HTMLInputElement>(null);
  const emailRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [modules, setModules] = useState<{ value: string; label: string }[]>(
    []
  );

  const [error, setError] = useState<{
    name: null | string;
    email: null | string;
    password: null | string;
    modules: null | string;
  }>(noError);

  useEffect(() => {
    if (user) {
      navigate("/modules");
    }
  }, [user]);

  // // Reference: We are using nusmods API
  useEffect(() => {
    const fetchModules = async () => {
      const moduleListResponse = await axios.get(
        `https://api.nusmods.com/v2/${getCurrentAY()}/moduleList.json`
      );
      const moduleList = moduleListResponse.data.map(
        (nusModule: any) => nusModule.moduleCode
      );
      setModules(
        moduleList.map((moduleCode: string) => ({
          value: moduleCode,
          label: moduleCode,
        }))
      );
    };
    fetchModules();
  }, []);

  const handleSelectedChange = (
    newValue: unknown,
    actionMeta: ActionMeta<unknown>
  ) => {
    console.log(actionMeta);
    const newValueCasted = newValue as MultiValue<{
      value: string;
      label: string;
    }>;
    setSelectedModules(newValueCasted.map((option) => option.value as string));
  };

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
    setError(noError);

    const name = nameRef.current!.value;
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    if (name.length === 0) {
      setError((prevState) => {
        return {
          ...prevState,
          name: "Invalid name!",
        };
      });
    }

    if (!email.includes("@")) {
      setError((prevState) => {
        return {
          ...prevState,
          email: "Invalid email!",
        };
      });
    }

    if (password.length < 6) {
      setError((prevState) => {
        return {
          ...prevState,
          password: "Invalid password! (Min 6 chars)",
        };
      });
    }

    if (selectedModules.length === 0) {
      setError((prevState) => {
        return {
          ...prevState,
          modules: "You need to choose at least one module!",
        };
      });
    }

    if (
      name.length === 0 ||
      !email.includes("@") ||
      password.length < 6 ||
      selectedModules.length === 0
    ) {
      return;
    }

    await signup(name, email, password, selectedModules);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full flex items-center justify-center bg-[url('/auth-bg.jpg')] bg-cover">
        <div className="flex-1 max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
            Student Sign Up
          </h2>
          <h5 className="text-sm text-center text-gray-500 mb-4">
            Join tutorials by signing up as a student.
          </h5>
          <div className="space-y-4">
            <Input
              type="text"
              name="name"
              label="Name"
              autoComplete="name"
              autoFocus
              className="w-full"
              isRequired
              isInvalid={!!error.name}
              errorMessage={error.name}
              ref={nameRef}
              onChange={(e) => resetError(e.target.name)}
            />
            <Input
              name="email"
              type="email"
              label="Email"
              className="w-full"
              isRequired
              isInvalid={!!error.email}
              errorMessage={error.email}
              ref={emailRef}
              onChange={(e) => resetError(e.target.name)}
            />
            <Input
              name="password"
              type={toggle ? "text" : "password"}
              label="Password"
              className="w-full"
              isRequired
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
            <div>
              <WindowedSelect
                defaultValue={[]}
                isMulti
                name="modules"
                options={modules}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(newValue, actionMeta) => {
                  handleSelectedChange(newValue, actionMeta);
                  resetError(actionMeta.name!);
                }}
                placeholder="Select Modules"
                windowThreshold={100}
              />
              {error.modules && (
                <p className="text-red-500 text-xs pl-1 pt-1">
                  {error.modules}
                </p>
              )}
            </div>
            <Button
              color="secondary"
              variant="solid"
              className="w-full"
              onClick={handleSubmit}
            >
              SIGN UP
            </Button>
            <div className="flex items-center">
              <span className="text-sm">Already have an account?</span>
              <Link
                to="/student/login"
                className="text-sm text-purple-600 ml-2"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSignUpPage;
