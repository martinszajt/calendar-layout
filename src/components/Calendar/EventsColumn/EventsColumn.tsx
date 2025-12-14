import { IPositionedEvent } from "../../../interfaces/event.interface";
import EventCard from "./EventCard/EventCard";

const EventsColumn = ({
  positionedEvents,
  totalColumns,
}: {
  positionedEvents: IPositionedEvent[];
  totalColumns: number;
}) => {
  return (
    <div className="w-full bg-[#ececec] border-l border-l-[#d6d6d6] px-4">
      <div className="relative w-full h-full">
        {positionedEvents.length === 0 && (
          <p className="text-center mt-4">No events scheduled.</p>
        )}
        {positionedEvents.map((event, index) => (
          <EventCard
            event={event}
            cardIndex={index}
            key={index}
            totalColumns={totalColumns}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsColumn;
