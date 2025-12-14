import { Tooltip } from "primereact/tooltip";
import { IPositionedEvent } from "../../../../interfaces/event.interface";

const EventCard = ({
  event,
  cardIndex,
  totalColumns,
}: {
  event: IPositionedEvent & { colIndex: number };
  cardIndex: number;
  totalColumns: number;
}) => {
  return (
    <div
      data-pr-tooltip="Sample Item"
      data-pr-position="right"
      data-pr-at="right+5 top"
      data-pr-my="left center-2"
      id={`card_${cardIndex}`}
      key={`${event.start}-${event.end}-${cardIndex}`}
      className="absolute bg-white border border-[#d6d6d6] border-l-4 border-l-[#526d96] p-2 flex flex-col"
      style={{
        top: event.top,
        height: event.height,
        width: `calc(100% / ${totalColumns})`,
        left: `calc(${(event.colIndex / totalColumns) * 100}%)`,
      }}
      title={`Sample Item`}
    >
      <Tooltip target={`#card_${cardIndex}`} mouseTrack mouseTrackLeft={10} />
      <div className="font-semibold text-sm truncate">
        <h4 className="text-[#526d96] text-[18px] font-medium">Sample Item</h4>
        <p className="text-[#727272] text-[14px]">Sample Location</p>
      </div>
    </div>
  );
};

export default EventCard;
