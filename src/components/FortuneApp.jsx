import styles from "./styles.module.css";
import { useState, useEffect } from "react";
const offers = [
  "Cleaning ",
  "Rent 10 rub",
  "discount 30%",
  "Set with device",
  "discount 90%",
  "block and cleaning sticks",
];
function Fortune() {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const handleSpin = () => {
    if (spinning) return;
    const randomIndex = Math.floor(Math.random() * offers.length);
    const segmentAngle = 360 / offers.length;
    const extraSpins = 360 * 5;
    const newRotation = extraSpins + (360 - randomIndex * segmentAngle);
    setSpinning(true);
    setRotation(rotation + newRotation);
    setSelectedOffer(offers[randomIndex]);
    setTimeout(() => setSpinning(false), 3000);
  };
  return (
    <div className={styles.fortune}>
      <h2 className={styles.fortuneTitle}>Wheel of Fortune</h2>
      <div className={styles.fortuneContainer}>
        <div
          className={styles.wheel}
          style={{ transform: `rotate(${rotation}deg)` }}
        ></div>
      </div>
      <button disabled={spinning} onClick={handleSpin}>
        Spin
      </button>
      {selectedOffer && (
        <p className={styles.result}>You won {selectedOffer}</p>
      )}
    </div>
  );
}
export default Fortune;
