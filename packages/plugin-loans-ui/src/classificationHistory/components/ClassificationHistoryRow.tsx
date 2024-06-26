import { formatValue } from "@erxes/ui/src/utils";
import FormControl from "@erxes/ui/src/components/form/Control";
import _ from "lodash";
import React from "react";

import { IPeriodLock } from "../types";

type Props = {
  periodLock: IPeriodLock;
  isChecked: boolean;
  toggleBulk: (periodLock: IPeriodLock, isChecked?: boolean) => void;
};

function displayValue(periodLock, name, toFormatNumber?: boolean) {
  const value = _.get(periodLock, name);
  if (toFormatNumber)
    return formatValue(value ? value?.toLocaleString() : value);

  return formatValue(value);
}

function PeriodLockRow({ periodLock, isChecked, toggleBulk }: Props) {
  const onChange = (e) => {
    if (toggleBulk) {
      toggleBulk(periodLock, e.target.checked);
    }
  };

  const onClick = (e) => {
    e.stopPropagation();
  };

  return (
    <tr>
      <td onClick={onClick}>
        <FormControl
          checked={isChecked}
          componentclass="checkbox"
          onChange={onChange}
        />
      </td>

      <td key={"code"}>{displayValue(periodLock, "invDate")}</td>
      <td key={"total"}>{displayValue(periodLock, "total", true)}</td>
      <td key={"total"}>{displayValue(periodLock, "classification")}</td>
      <td key={"total"}>{displayValue(periodLock, "newClassification")}</td>

      <td onClick={onClick}>{}</td>
    </tr>
  );
}

export default PeriodLockRow;
