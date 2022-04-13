import { useState } from "react";
import styles from "../styles/CounterStyles.module.css";

const CounterComponent = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <p className={styles.count}>{count}</p>
      <button
        className={styles.button}
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>
    </>
  );
};

export default CounterComponent;
