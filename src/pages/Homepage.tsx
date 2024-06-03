import { Image } from "@nextui-org/react";
import { Banner } from "../components/Banner";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";
import { isUserStudent } from "../util/user";
import { useNavigate } from "react-router";

const Homepage = () => {
  const user = useAuthContext().state.user;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (isUserStudent(user)) {
        navigate("/modules");
      } else {
        navigate("/requests");
      }
    }
  }, [user]);

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
