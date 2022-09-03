import React, { useRef, useEffect } from "react";

import { Viewer } from "../lib/viewer";
import styles from "./styles.module.css";

export const Scene = () => {
  const canvasElementRef = useRef<Nullable<HTMLCanvasElement>>(null);

  useEffect(() => {
    const canvasElement = canvasElementRef.current;
    if (!canvasElement) {
      return;
    }

    const viewer = new Viewer();
    viewer.init(canvasElement);
  }, [canvasElementRef.current]);

  return (
    <div className={styles.container}>
      <canvas ref={canvasElementRef} />
    </div>
  );
};
