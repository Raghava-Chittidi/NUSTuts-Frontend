import { Image } from "@nextui-org/react";
import { Banner } from "../components/Banner";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// This is the homepage component that is displayed when the user is not logged in.
const Homepage = () => {
  const url = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (url !== "/") {
      navigate("/");
    }
  }, []);

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
