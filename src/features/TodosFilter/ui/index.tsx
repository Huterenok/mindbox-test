import { FC, memo } from "react";

import { FilterTab } from "./FilterTab";
import { filters } from "../config";

import styles from "./TodosFilter.module.css";

export const TodosFilter: FC = memo(() => {
  return (
    <div className={styles.wrapper}>
      {filters.map((filter) => (
        <FilterTab filter={filter} key={filter.type} />
      ))}
    </div>
  );
});
