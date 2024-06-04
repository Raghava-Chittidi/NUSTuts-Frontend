import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";
import { Eye, EyeOff } from "@geist-ui/react-icons";
import { useStudentSignup } from "../../hooks/useStudentSignup";
import axios from "axios";
import Select from "react-select";
import { ActionMeta, MultiValue } from "react-select";
import { getCurrentAY } from "../../util/util";
import { useAuthContext } from "../../hooks/useAuthContext";

const StudentSignUpPage = () => {
  const user = useAuthContext().state.user;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/modules");
    }
  }, [user]);
  
  const { signup, signUpError, isSignUpLoading } = useStudentSignup();

  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [modules, setModules] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  // // Reference: We are using nusmods API
  // const { error, data, isLoading } = useSWR(
  //     `https://api.nusmods.com/v2/${getCurrentAY()}/moduleList.json`,
  //     (url: string) => axios.get(url).then((res) => res.data)
  // );
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
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    setSelectedModules(newValue.map((option) => option.value));
  };

  // const loadOptions = async (searchValue: string) => {
  //     const moduleListResponse = await axios.get(`https://api.nusmods.com/v2/${getCurrentAY()}/moduleList.json`);
  //     const moduleList = moduleListResponse.data;
  //     return filterOptions(moduleList, searchValue);
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      if (!name) setNameError(true);
      if (!email) setEmailError(true);
      if (!password) setPasswordError(true);
      return;
    }

    await signup(name, email, password, selectedModules);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    if (name === "name") setNameError(false);
    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                name="name"
                label="Name"
                autoComplete="name"
                autoFocus
                className="w-full"
                onChange={handleInputChange}
                isRequired
              />
            </div>
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
            {/* <AsyncSelect
                    isMulti
                    cacheOptions
                    defaultOptions
                    loadOptions={loadOptions}
                    onChange={handleSelectedChange}
                /> */}
            <Select
              defaultValue={[]}
              isMulti
              name="modules"
              options={modules}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleSelectedChange}
              placeholder="Select Modules"
              required
            />
            <Button
              type="submit"
              color="secondary"
              variant="solid"
              className="w-full"
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
            {signUpError && (
              <div className="mt-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
                <p className="text-sm">{signUpError}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentSignUpPage;
