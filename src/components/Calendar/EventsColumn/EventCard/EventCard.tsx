import { IPositionedEvent } from "../../../../interfaces/event.interface";
import formatMinutesToTime from "../../../../utils/time";

const EventCard = ({
  event,
  cardIndex,
}: {
  event: IPositionedEvent;
  cardIndex: number;
}) => {
  return (
    <div
      key={`${event.start}-${event.end}-${cardIndex}`}
      className="absolute bg-blue-500 text-white rounded p-2 overflow-hidden shadow"
      style={{
        top: event.top,
        height: event.height,
        left: event.left,
        width: event.width,
      }}
      title={`${formatMinutesToTime(event.start)} - ${formatMinutesToTime(event.end)}`}
    >
      <div className="font-semibold text-sm truncate">
        {formatMinutesToTime(event.start)} - {formatMinutesToTime(event.end)}
      </div>
    </div>
  );
};

export default EventCard;
