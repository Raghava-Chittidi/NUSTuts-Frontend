import { ReactNode } from "react";

const Timer = ({ remainingTime }: { remainingTime: number }): ReactNode => {
  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col text-3xl">
        <span className="countdown font-mono text-[8rem]">
          <span
            style={
              {
                "--value": Math.floor(remainingTime / 60),
              } as React.CSSProperties
            }
          ></span>
        </span>
        min
      </div>
      <div className="flex flex-col text-3xl">
        <span className="countdown font-mono text-[8rem]">
          <span
            style={
              {
                "--value": Math.floor(remainingTime % 60),
              } as React.CSSProperties
            }
          ></span>
        </span>
        sec
      </div>
    </div>
  );
};

export default Timer;
