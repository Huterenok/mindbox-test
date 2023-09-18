import { FC, InputHTMLAttributes } from "react";
import classNames from "classnames";

import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isCrossed?: boolean;
}

export const Input: FC<InputProps> = ({
  value,
  isCrossed = false,
  className,
  ...otherProps
}) => {
  return (
    <input
      value={value}
      type="text"
      className={classNames(
        styles.input,
        { [styles.crossed]: isCrossed },
        className
      )}
      disabled={isCrossed}
      {...otherProps}
    />
  );
};
