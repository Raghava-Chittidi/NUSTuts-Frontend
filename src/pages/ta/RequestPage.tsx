import { useEffect, useState } from "react";
import RequestListItem from "../../components/request/RequestListItem";
import { Request } from "../../types";
import PrivateRoute from "../../components/PrivateRoute";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Spinner } from "@nextui-org/react";

const DUMMY_REQUESTS = [
  {
    id: 1,
    student: {
      name: "Tom",
      email: "tom@gmail.com",
    },
  },
  {
    id: 2,
    student: {
      name: "John",
      email: "john@gmail.com",
    },
  },
  {
    id: 3,
    student: {
      name: "jack",
      email: "jack@gmail.com",
    },
  },
];

export const RequestPage = () => {
  const { state } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [requests, setRequests] = useState<Request[]>([]);

  console.log(requests);

  useEffect(() => {
    const sendRequest = async () => {
      const res = await axios.get(`/api/requests/${state.user.tutorial?.ID}`);
      setRequests(res.data.data);
      setIsLoading(false);
    };

    if (state.user) {
      sendRequest();
    }
  }, [state.user, state.user?.tutorial]);

  if (isLoading || !requests) {
    return <Spinner />;
  }

  const removeRequestFromListHandler = (id: number) => {
    setRequests((prevState) =>
      prevState.filter((request) => request.id !== id)
    );
  };

  return (
    <PrivateRoute userType="teachingAssistant">
      <div className="w-full text-center space-y-5 py-5">
        <h1 className="font-bold text-xl">
          All pending requests for Tutorial 1A:
        </h1>
        <div className="flex flex-col w-full items-center space-y-5 mt-5">
          {requests.map((request: Request, index: number) => (
            <RequestListItem
              key={index}
              name={request.name}
              email={request.email}
              id={request.id}
              removeRequestFromListHandler={removeRequestFromListHandler}
            />
          ))}
        </div>
      </div>
    </PrivateRoute>
  );
};
