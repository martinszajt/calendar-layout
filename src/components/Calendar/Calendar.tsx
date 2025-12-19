import { getTotalHeight } from "../../constants/constants";
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
      className="relative border-none mx-auto bg-red rounded flex w-full py-8 box-content"
      style={{ height: getTotalHeight() }}
    >
      <ReferenceColumn />

      <EventsColumn positionedEvents={positionedEvents} />
    </div>
  );
};

export default Calendar;
