import { getCalendarHeight, getCalendarWidth } from "../../constants/constants";
import { IPositionedEvent } from "../../interfaces/event.interface";
import EventsColumn from "./EventsColumn/EventsColumn";
import ReferenceColumn from "./RefenceColumn/ReferenceColumn";

const Calendar = ({
  positionedEvents,
}: {
  positionedEvents: IPositionedEvent[];
}) => {
  return (
    <div
      className="relative border-none mx-auto mt-8 bg-red rounded flex overflow-scroll py-4"
      style={{ width: getCalendarWidth(), height: getCalendarHeight() }}
    >
      <ReferenceColumn />

      <EventsColumn positionedEvents={positionedEvents} />
    </div>
  );
};

export default Calendar;
