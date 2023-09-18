import { FC, InputHTMLAttributes } from "react";

import styles from "./Checkbox.module.css";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox: FC<CheckboxProps> = ({ ...props }) => {
  return <input type="checkbox" className={styles.checkbox} {...props} />;
};
