import { Image } from "@nextui-org/react";
import { Banner } from "../components/Banner";

const Homepage = () => {
  return (
    // Reference https://www.freepik.com/free-vector/flat-university-concept-background_4672574.htm#from_view=detail_alsolike
    <div className="w-full h-full md:m-auto flex justify-between items-center ml-auto pt-3 lg:pl-5 md:flex-row flex-col">
      <div className="w-4/5 md:w-1/2 lg:p-5 ml-5">
        <Image src="/NUSTUTS-Homepage.png" className="w-full min-w-full" />
      </div>
      <div className="w-4/5 md:w-1/2">
        <Banner />
      </div>
    </div>
  );
};

export default Homepage;
