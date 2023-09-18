import { ButtonHTMLAttributes, FC } from "react";
import classNames from "classnames";

import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  isActive,
  ...otherProps
}) => {
  return (
    <button
      className={classNames(styles.button, className, {
        [styles.active]: isActive,
      })}
      {...otherProps}
    >
      {children}
    </button>
  );
};
