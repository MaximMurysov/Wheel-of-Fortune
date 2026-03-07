import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { VscTriangleDown } from "react-icons/vsc";
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

    const offsetInsideSegment = Math.random() * segmentAngle;

    const targetRotation = randomIndex * segmentAngle + offsetInsideSegment;

    const extraSpins = 360 * 5;

    const newRotation = rotation + extraSpins + (360 - targetRotation);

    const finalAngle = newRotation % 360;
    const winningIndex =
      Math.floor((360 - finalAngle) / segmentAngle) % offers.length;

    setSpinning(true);
    setSelectedOffer(null);
    setRotation(newRotation);
    setTimeout(() => setSelectedOffer(offers[winningIndex]), 3000);
    setTimeout(() => setSpinning(false), 3000);
  };
  return (
    <div className={styles.fortune}>
      <h2 className={styles.fortuneTitle}>Wheel of Fortune</h2>
      <div className={styles.fortuneContainer}>
        <div
          className={styles.wheel}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {offers.map((elem, index) => (
            <div
              key={index}
              className={styles.segment}
              style={{
                transform: `rotate(${index * (360 / offers.length)}deg)`,
              }}
            >
              <p className={styles.segmentText}>{elem}</p>
            </div>
          ))}
        </div>
        <VscTriangleDown className={styles.pointer} size={40} color="#1f2d2d" />
      </div>
      <button disabled={spinning} onClick={handleSpin} className={styles.spin}>
        Q
      </button>
      {selectedOffer && (
        <p className={styles.result}>You won {selectedOffer}</p>
      )}
    </div>
  );
}
export default Fortune;
