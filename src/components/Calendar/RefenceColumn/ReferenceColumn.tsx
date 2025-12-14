import {
  CALENDAR_HEIGHT,
  MINUTE_TO_PX,
  TIME_LABEL_WIDTH,
} from "../../../constants/constants";

const timeLabels: any = [];
for (let i = 9; i <= 21; i++) {
  const displayHour = i > 12 ? i - 12 : i;
  const ampm = i >= 12 ? "pm" : "am";
  timeLabels.push(
    <div
      key={i}
      className="absolute text-gray-500 text-xs"
      style={{ top: (i - 9) * 60 * MINUTE_TO_PX - 6, width: TIME_LABEL_WIDTH }}
    >
      {displayHour}:00 {ampm}
    </div>,
  );
}

const ReferenceColumn = () => {
  return (
    <div
      className="relative border-r border-gray-300 text-right pr-2 select-none"
      style={{ width: TIME_LABEL_WIDTH, height: CALENDAR_HEIGHT }}
    >
      {timeLabels}
    </div>
  );
};

export default ReferenceColumn;
