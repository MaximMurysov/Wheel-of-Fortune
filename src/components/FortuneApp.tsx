import styles from "./styles.module.css";
import { useState } from "react";
import { VscTriangleDown } from "react-icons/vsc";
const OFFERS: string[] = [
  "Cleaning",
  "Rent 10 rub",
  "discount 30%",
  "Set with device",
  "discount 90%",
  "block and cleaning sticks",
];
const SPIN_DURATION = 7500;
const EXTRA_SPINS = 5;
function Fortune() {
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const handleSpin = (): void => {
    if (spinning) return;

    const randomIndex = Math.floor(Math.random() * OFFERS.length);

    const segmentAngle = 360 / OFFERS.length;

    const offsetInsideSegment = Math.random() * segmentAngle;

    const targetRotation = randomIndex * segmentAngle + offsetInsideSegment;

    const extraSpins = 360 * EXTRA_SPINS;

    const newRotation = rotation + extraSpins + (360 - targetRotation);

    const finalAngle = newRotation % 360;
    const winningIndex =
      Math.floor((360 - finalAngle) / segmentAngle) % OFFERS.length;

    setSpinning(true);
    setSelectedOffer(null);
    setRotation(newRotation);
    setTimeout(() => {
      setSelectedOffer(OFFERS[winningIndex]);
      setSpinning(false);
    }, SPIN_DURATION);
  };
  return (
    <div className={styles.fortune}>
      <>
        {!selectedOffer ? (
          <>
            <h1 className={styles.fortuneTitle}>Wheel of Fortune</h1>
            <div className={styles.fortuneContainer}>
              <div
                className={styles.wheel}
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {OFFERS.map((elem: string, index: number) => (
                  <div
                    key={index}
                    className={styles.segment}
                    style={{
                      transform: `rotate(${index * (360 / OFFERS.length)}deg)`,
                    }}
                  >
                    <p className={styles.segmentText}>{elem}</p>
                  </div>
                ))}
              </div>
              <VscTriangleDown
                className={styles.pointer}
                size={40}
                color="#1f2d2d"
              />
              <button
                disabled={spinning}
                onClick={handleSpin}
                className={styles.spin}
              >
                Q
              </button>
            </div>
          </>
        ) : (
          <div className={styles.result}>
            <p>You won {selectedOffer}</p>
            <div className={styles.resultOfferButtons}>
              <button
                className={styles.resultOffer}
                onClick={() => setSelectedOffer(null)}
              >
                Try again
              </button>
              <button
                className={styles.resultOffer}
                onClick={() => setSelectedOffer(null)}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
export default Fortune;
