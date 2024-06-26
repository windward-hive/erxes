import { IBoard, IPipeline } from "@erxes/ui-cards/src/boards/types";
import { IOption } from "@erxes/ui/src/types";
import { __, router } from "coreui/utils";

import { ButtonGroup } from "@erxes/ui-cards/src/boards/styles/header";
import { HACKSTAGES } from "@erxes/ui-cards/src/boards/constants";
import Icon from "@erxes/ui/src/components/Icon";
import { Link } from "react-router-dom";
import MainActionBar from "@erxes/ui-cards/src/boards/components/MainActionBar";
import React from "react";
import Select, { OnChangeValue } from "react-select";
import Tip from "@erxes/ui/src/components/Tip";
import options from "../options";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {
  onSearch: (search: string) => void;
  onSelect: (values: string[] | string, name: string) => void;
  onDateFilterSelect: (name: string, value: string) => void;
  onClear: (name: string, values) => void;
  isFiltered: () => boolean;
  clearFilter: () => void;
  currentBoard?: IBoard;
  currentPipeline?: IPipeline;
  boards: IBoard[];
  middleContent?: () => React.ReactNode;
  queryParams: any;
  assignedUserIds?: string[];
  type: string;
}

const FILTER_PARAMS = [
  "sortField",
  "sortDirection",
  "search",
  "assignedUserIds",
  "closeDateType",
  "hackStage",
  "priority",
  "userIds",
  "assignedToMe",
];

const GrowthHackMainActionBar = (props: IProps) => {
  const currentUrl = window.location.href;

  const location = useLocation();
  const navigate = useNavigate();

  // get selected type from URL
  const getCurrentType = () => {
    if (currentUrl.includes("board")) {
      return "board";
    } else if (currentUrl.includes("weightedScore")) {
      return "weightedScore";
    } else if (currentUrl.includes("priorityMatrix")) {
      return "priorityMatrix";
    }

    return "funnelImpact";
  };

  const getActiveClass = (currentTab: string) => {
    if (window.location.href.includes(currentTab)) {
      return "active";
    }

    return "";
  };

  const isFiltered = (): boolean => {
    const params = queryString.parse(location.search);

    for (const param in params) {
      if (FILTER_PARAMS.includes(param)) {
        return true;
      }
    }

    return false;
  };

  const viewChooser = () => {
    const onFilterClick = (type: string) => {
      const { currentBoard, currentPipeline } = props;

      if (currentBoard && currentPipeline) {
        return `/growthHack/${type}?id=${currentBoard._id}&pipelineId=${currentPipeline._id}`;
      }

      return `/growthHack/${type}`;
    };

    return (
      <ButtonGroup>
        <Tip text={__("Board")} placement="bottom">
          <Link to={onFilterClick("board")} className={getActiveClass("board")}>
            <Icon icon="window-section" />
          </Link>
        </Tip>
        <Tip text={__("Weighted scoring")} placement="bottom">
          <Link
            to={onFilterClick("weightedScore")}
            className={getActiveClass("weightedScore")}
          >
            <Icon icon="web-section-alt" />
          </Link>
        </Tip>
        <Tip text={__("Priority matrix")} placement="bottom">
          <Link
            to={onFilterClick("priorityMatrix")}
            className={getActiveClass("priorityMatrix")}
          >
            <Icon icon="th" />
          </Link>
        </Tip>
        <Tip text={__("Funnel Impact")} placement="bottom">
          <Link
            to={onFilterClick("funnelImpact")}
            className={getActiveClass("funnelImpact")}
          >
            <Icon icon="window-maximize" />
          </Link>
        </Tip>
      </ButtonGroup>
    );
  };

  const onChangeSort = (value) => {
    let field: string = "";
    let direction: string = "";

    if (value) {
      const values = value.value.split(",");

      field = values[0];
      direction = values[1];

      router.setParams(navigate, location, {
        sortField: field,
        sortDirection: direction,
      });
    } else {
      router.removeParams(navigate, location, "sortField", "sortDirection");
    }
  };

  const onChangeHackStage = (ops: OnChangeValue<IOption, true>) => {
    props.onSelect(
      ops.map((option) => option.value),
      "hackStage"
    );
  };

  const { hackScoringType } = props.currentPipeline || {
    hackScoringType: "ice",
  };

  const effort = hackScoringType === "rice" ? "effort" : "ease";

  const sortOptions = [
    { value: "impact,1", label: "Low impact" },
    { value: "impact,-1", label: "High impact" },
    { value: "ease,1", label: `Low ${effort}` },
    { value: "ease,-1", label: `High ${effort}` },
  ];

  const { sortField, sortDirection, hackStage } = props.queryParams;

  const growthHackFilter = (
    <>
      <Select
        placeholder="Choose a growth funnel"
        value={
          hackStage
            ? {
                value: hackStage,
                label: hackStage,
              }
            : null
        }
        options={HACKSTAGES.map((hs) => ({ value: hs, label: hs }))}
        name="hackStage"
        onChange={onChangeHackStage}
        isMulti={true}
      />
    </>
  );

  const extraFilter = (
    <>
      {growthHackFilter}
      <Select
        value={sortOptions.find(
          (o) => o.value === `${sortField},${sortDirection}`
        )}
        isClearable={true}
        placeholder="Sort"
        onChange={onChangeSort}
        options={sortOptions}
      />
    </>
  );

  const extendedProps = {
    ...props,
    options,
    boardText: "Campaign",
    pipelineText: "Project",
    isFiltered,
    extraFilter: extraFilter,
    link: `/growthHack/${getCurrentType()}`,
    rightContent: viewChooser,
  };

  return <MainActionBar {...extendedProps} />;
};

export default GrowthHackMainActionBar;
