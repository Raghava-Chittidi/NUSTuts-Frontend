import { useState } from "react";
import RequestListItem from "../../components/request/RequestListItem";
import { Request } from "../../types";

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
  const [requests, setRequests] = useState<Request[]>(DUMMY_REQUESTS);

  const removeRequestFromListHandler = (id: number) => {
    setRequests((prevState) =>
      prevState.filter((request) => request.id !== id)
    );
  };

  return (
    <div className="w-full text-center space-y-5 py-5">
      <h1 className="font-bold text-xl">
        All pending requests for Tutorial 1A:
      </h1>
      <div className="flex flex-col w-full items-center space-y-5 mt-5">
        {requests.map((request: Request, index: number) => (
          <RequestListItem
            key={index}
            student={request.student}
            id={request.id}
            removeRequestFromListHandler={removeRequestFromListHandler}
          />
        ))}
      </div>
    </div>
  );
};
