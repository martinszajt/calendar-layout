import { CALENDAR_HEIGHT, CALENDAR_WIDTH } from "../../constants/constants";
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
      className="relative border border-gray-300 mx-auto mt-8 bg-white rounded flex"
      style={{ width: CALENDAR_WIDTH, height: CALENDAR_HEIGHT }}
    >
      <ReferenceColumn />

      <EventsColumn positionedEvents={positionedEvents} />
    </div>
  );
};

export default Calendar;
