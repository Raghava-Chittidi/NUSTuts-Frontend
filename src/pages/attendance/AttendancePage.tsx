import { Button } from "@nextui-org/react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import Countdown from "../../components/attendance/Countdown";

const AttendancePage = () => {
  const { state } = useAuthContext();
  const [code, setCode] = useState<string>();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const generateHandler = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/attendance/${state.user.tutorial?.ID}`,
        {
          headers: { Authorization: `Bearer ${state.user.tokens.accessToken}` },
        }
      );
      setCode(res.data.data.attendanceCode);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      {code ? (
        <div className="flex flex-col items-center justify-center w-full space-y-5">
          <Countdown />
          <div className="text-[6rem]">{code}</div>
        </div>
      ) : (
        <Button
          size="lg"
          className="text-3xl px-10 py-8"
          onClick={generateHandler}
          variant="ghost"
          color="primary"
        >
          Generate attendance code
        </Button>
      )}
    </div>
  );
};

export default AttendancePage;
