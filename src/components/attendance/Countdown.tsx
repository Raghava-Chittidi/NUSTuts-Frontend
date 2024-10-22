import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Timer from "./Timer";
import { getRemainingSeconds } from "../../util/util";

const Countdown = ({
  expiredTime,
  handleTimerUp,
}: {
  expiredTime: string;
  handleTimerUp: () => void;
}) => {
  // Calculate the initial remaining seconds
  const initialRemainingSeconds = getRemainingSeconds(expiredTime);

  const [seconds, setSeconds] = useState<number>(initialRemainingSeconds);

  useEffect(() => {
    // Countdown the time
    const interval = setInterval(() => {
      const newRemainingSeconds = getRemainingSeconds(expiredTime);
      if (newRemainingSeconds <= 0) {
        clearInterval(interval);
        setSeconds(0);
        handleTimerUp();
        console.log("Time's up!");
      } else {
        setSeconds(newRemainingSeconds);
      }
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [expiredTime]);

  return (
    <CountdownCircleTimer
      size={450}
      isPlaying
      duration={300}
      initialRemainingTime={seconds}
      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
      colorsTime={[120, 90, 60, 30]}
      children={() => <Timer remainingTime={seconds} />}
    />
  );
};

export default Countdown;
