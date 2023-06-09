import React, { useEffect, useState } from "react";
import "./Home.css";
function Tester({ Setbutton, onButtonClick }) {
  const [shakeCount, setShakeCount] = useState(0);
  const [previousAcceleration, setPreviousAcceleration] = useState(null);
  const threshold = 15;
  useEffect(() => {
    const handleShake = (event) => {
      const { x, y, z } = event.accelerationIncludingGravity;
      const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
      if (previousAcceleration !== null) {
        const delta = acceleration - previousAcceleration;
        if (delta > threshold) {
          setShakeCount((count) => count + 1);
        }
      }

      setPreviousAcceleration(acceleration);
    };

    window.addEventListener("devicemotion", handleShake);

    return () => {
      window.removeEventListener("devicemotion", handleShake);
    };
  }, [previousAcceleration]);

  useEffect(() => {
    if (shakeCount === 3) {
      onButtonClick();
      setShakeCount(0);
    }
  }, [shakeCount]);

  return (
    <>
      <div class="text-muted lead">
        <div class="marquee-container">
          <div class="marquee">
            <span style={{ whiteSpace: "nowrap" }}>
              Press the emergency button or Shake your mobile three times to
              activate the siren
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tester;
