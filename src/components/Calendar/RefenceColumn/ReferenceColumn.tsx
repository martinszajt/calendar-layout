import React from "react";
import { getMinuteToPX } from "../../../constants/constants";

const HOURS_START = 9;
const HOURS_END = 21;

const generateTimeLabels = () => {
  const labels = [];

  const minuteToPX = getMinuteToPX();

  for (let hour = HOURS_START; hour <= HOURS_END; hour++) {
    const displayHour = hour > 12 ? hour - 12 : hour;
    const ampm = hour >= 12 ? "pm" : "am";

    labels.push(
      <div
        key={`hour-${hour}`}
        className="absolute text-gray-700 text-xs w-full hour-label pr-[6px] -mt-2"
        style={{ top: (hour - HOURS_START) * 60 * minuteToPX }}
      >
        {displayHour}:00{" "}
        <span className="text-gray-400">{ampm.toUpperCase()}</span>
      </div>,
    );

    if (hour !== HOURS_END) {
      labels.push(
        <div
          key={`half-${hour}`}
          className="absolute text-gray-400 text-xs w-full half-hour-label pr-[6px] -mt-2"
          style={{
            top: (hour - HOURS_START) * 60 * minuteToPX + 30 * minuteToPX,
          }}
        >
          {displayHour}:30
        </div>,
      );
    }
  }

  return labels;
};

const ReferenceColumn: React.FC = () => {
  const timeLabels = React.useMemo(() => generateTimeLabels(), []);

  return (
    <div className="relative border-r w-[100px] border-none text-right pr-2 select-none">
      {timeLabels}
    </div>
  );
};

export default ReferenceColumn;
