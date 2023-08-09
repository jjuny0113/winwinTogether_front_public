import { useMemo } from "react";
import { IDaySelector } from "./DaySelector";
import moment from "moment";

type DaySelectorHandlerHookType = Omit<IDaySelector, "onClick">;

export const useDaySelectorHandler = ({
  baseDate,
  userRegistationDate,
}: DaySelectorHandlerHookType) => {
  const dateTimeArr = (() => {
    const getBeforeDayTimeStamp = (subtractDay: number) =>
      moment(baseDate).local().subtract(subtractDay, "day").valueOf();
    const getAfterDayTimeStamp = (addDay: number) =>
      moment(baseDate).local().add(addDay, "day").valueOf();
    const dateArr = [
      getBeforeDayTimeStamp(3),
      getBeforeDayTimeStamp(2),
      getBeforeDayTimeStamp(1),
      baseDate,
      getAfterDayTimeStamp(1),
      getAfterDayTimeStamp(2),
      getAfterDayTimeStamp(3),
    ];

    const todayIndex = dateArr.findIndex(
      (v) =>
        moment(v).utc().format("YYYY-MM-DD") ===
        moment(userRegistationDate).utc().format("YYYY-MM-DD")
    );

    const isExistTodayIndex = todayIndex !== -1;
    return isExistTodayIndex ? dateArr.slice(todayIndex) : dateArr;
  })();

  const getType = (timestamp: number): "disable" | "before" | "selected" => {
    const todayTimestamp = moment().valueOf();

    const todayDayOfYear = moment(todayTimestamp).dayOfYear();
    const timestampDayOfYear = moment(timestamp).dayOfYear();
    const day = moment(timestamp).isoWeekday();
    const selectedDay = moment(baseDate).isoWeekday();
    if (selectedDay === day) {
      return "selected";
    }
    if (timestampDayOfYear <= todayDayOfYear) {
      return "before";
    }
    return "disable";
  };
  const getButtonColor = (timestamp: number) => {
    const map = new Map<"disable" | "before" | "selected", string>([
      ["disable", "border border-monoGray2 text-monoGray2"],
      ["before", "border border-purpleMain text-purpleMain bg-purpleLight"],
      ["selected", " text-white bg-purpleMain"],
    ]);

    return map.get(getType(timestamp)) ?? "";
  };

  return {
    dateTimeArr,
    getType,
    getButtonColor,
  };
};
