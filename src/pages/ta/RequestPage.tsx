import { useEffect, useState } from "react";
import RequestListItem from "../../components/request/RequestListItem";
import { Request } from "../../types";
import PrivateRoute from "../../components/PrivateRoute";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import LoadingSpinner from "../../components/LoadingSpinner";

export const RequestPage = () => {
  const { isLoggedIn, isLoggingIn, state } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      const res = await axios.get(`/api/requests/${state.user.tutorial?.ID}`, {
        headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
      });
      setRequests(res.data.data);
      setIsLoading(false);
    };

    if (isLoggedIn) {
      sendRequest();
    }
  }, [isLoggedIn]);

  if (isLoggingIn || isLoading) {
    return <LoadingSpinner />;
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
