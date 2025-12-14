import {
  CALENDAR_WIDTH,
  TIME_LABEL_WIDTH,
  CALENDAR_HEIGHT,
} from "../../../constants/constants";
import { IPositionedEvent } from "../../../interfaces/event.interface";
import EventCard from "./EventCard/EventCard";

const EventsColumn = ({
  positionedEvents,
}: {
  positionedEvents: IPositionedEvent[];
}) => {
  return (
    <div
      className="relative"
      style={{
        width: CALENDAR_WIDTH - TIME_LABEL_WIDTH,
        height: CALENDAR_HEIGHT,
      }}
    >
      {positionedEvents.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No events scheduled.</p>
      )}
      {positionedEvents.map((event, index) => (
        <EventCard
          event={event}
          cardIndex={index}
          key={event.start + event.end}
        />
      ))}
    </div>
  );
};

export default EventsColumn;
