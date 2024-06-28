import { Image } from "@nextui-org/react";
import { Banner } from "../components/Banner";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { isUserStudent } from "../util/user";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const Homepage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isLoggedIn, isLoggingIn, state } = useAuthContext();
  const url = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      if (isUserStudent(state.user)) {
        navigate("/modules");
      } else {
        navigate("/requests");
      }
    } else {
      if (!isLoggingIn) {
        if (url !== "/") {
          navigate("/");
        }
        setIsLoading(false);
      }
    }
  }, [isLoggedIn, isLoggingIn]);

  if (isLoggingIn || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    // Reference https://www.freepik.com/free-vector/flat-university-concept-background_4672574.htm#from_view=detail_alsolike
    <div className="w-full h-screen md:my-auto flex items-center pt-3 md:flex-row flex-col">
      <div className="w-4/5 md:w-1/2">
        <Image src="/NUSTUTS-Homepage.png" className="w-full min-w-full" />
      </div>
      <div className="w-4/5 md:w-1/2">
        <Banner />
      </div>
    </div>
  );
};

export default Homepage;
