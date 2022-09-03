import React from "react";
import cn from "classnames";

import styles from "./styles.module.css";

export enum Intent {
  Secondary = "secondary",
  Primary = "primary",
}

interface ButtonProps {
  onClick: () => void;
  text: string;
  intent?: Intent;
}

export const Button = ({
  onClick,
  text,
  intent = Intent.Secondary,
}: ButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick();
  };

  const buttonStyles = cn(styles.button, {
    [styles.button_intent_primary]: intent === Intent.Primary,
    [styles.button_intent_secondary]: intent === Intent.Secondary,
  });

  return (
    <button className={buttonStyles} onClick={handleClick}>
      <div className={styles.text}>{text}</div>
    </button>
  );
};
