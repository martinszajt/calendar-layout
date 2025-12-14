import {
  getCalendarHeight,
  getMinuteToPX,
  getTimeLabelWidth,
} from "../../../constants/constants";

const timeLabels: any = [];
for (let i = 9; i <= 21; i++) {
  const displayHour = i > 12 ? i - 12 : i;
  const ampm = i >= 12 ? "pm" : "am";
  timeLabels.push(
    <div
      key={i}
      className="absolute text-gray-500 text-xs"
      style={{
        top: (i - 9) * 60 * getMinuteToPX() - 6,
        width: getTimeLabelWidth(),
      }}
    >
      {displayHour}:00 {ampm}
    </div>,
  );
}

const ReferenceColumn = () => {
  return (
    <div
      className="relative border-r border-none text-right pr-2 select-none"
      style={{ width: getTimeLabelWidth(), height: getCalendarHeight() }}
    >
      {timeLabels}
    </div>
  );
};

export default ReferenceColumn;
