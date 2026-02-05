import { CountdownCircleTimer } from "react-countdown-circle-timer";

export function Timer() {
  return (
    // <CountdownCircleTimer
    //   isPlaying
    //   duration={300}
    //   size={60}
    //   strokeWidth={8}
    //   colors="#2563eb"
    // >
    //   {({ remainingTime }) => (
    //     <span>{remainingTime}</span>
    //   )}
    // </CountdownCircleTimer>
    <CountdownCircleTimer
      isPlaying
      duration={300}
      size={70}
      strokeWidth={8}
      colors="#2563eb"
    >
      {({ remainingTime }) => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;

        const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
          seconds,
        ).padStart(2, "0")}`;

        return <span>{formattedTime}</span>;
      }}
    </CountdownCircleTimer>
  );
}
