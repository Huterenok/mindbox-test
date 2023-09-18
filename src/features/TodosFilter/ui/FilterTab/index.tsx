import { FC } from "react";
import { useUnit } from "effector-react";

import { $filter, setFilterEv } from "../../model/index";
import { Filter } from "../../types";

import styles from "./FilterTab.module.css";
import { Button } from "shared/ui";

interface FilterTabProps {
  filter: Filter;
}

export const FilterTab: FC<FilterTabProps> = ({ filter }) => {
  const [filterType, setFilter] = useUnit([$filter, setFilterEv]);

  const onChange = () => {
    setFilter(filter.type);
  };

  return (
    <div className={styles.wrapper}>
      <Button onClick={onChange} isActive={filter.type === filterType}>
        {filter.title}
      </Button>
    </div>
  );
};
