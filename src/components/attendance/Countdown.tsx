import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Timer from "./Timer";

const Countdown = () => {
  // use context
  const [seconds, setSeconds] = useState<number>(300);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds == 0) {
        clearInterval(interval);
        console.log("hi");
        return;
      }

      if (seconds > 0) {
        setSeconds((prevState) => prevState - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <CountdownCircleTimer
      size={450}
      isPlaying
      duration={300}
      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
      colorsTime={[120, 90, 60, 30]}
      children={() => <Timer remainingTime={seconds} />}
    ></CountdownCircleTimer>
  );
};

export default Countdown;
