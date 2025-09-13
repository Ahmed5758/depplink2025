import React, { useEffect, useState } from 'react';

interface FlashSaleTimerProps {
  expiryTimestamp: string; // Format: "YYYY-MM-DD HH:mm:ss"
}

const FlashSaleTimer: React.FC<FlashSaleTimerProps> = ({ expiryTimestamp }) => {
  const parseToValidDate = (dateStr: string): number => {
    const validDateStr = dateStr.replace(' ', 'T');
    return new Date(validDateStr).getTime();
  };

  const calculateTimeLeft = () => {
    const expiry = parseToValidDate(expiryTimestamp);
    const now = Date.now();
    const difference = expiry - now;

    if (difference <= 0) {
      return { hours: '00', minutes: '00', seconds: '00' };
    }

    const totalHours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((difference / 1000) % 60)).padStart(2, '0');

    return {
      hours: String(totalHours).padStart(2, '0'),
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryTimestamp]);

  return (
    <span className="">
      {timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds}
    </span>
  );
};

export default FlashSaleTimer;
