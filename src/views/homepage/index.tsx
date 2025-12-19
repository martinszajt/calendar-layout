import React, { useEffect, useState, useCallback } from "react";
import {
  ICalendarEvent,
  IPositionedEvent,
} from "../../interfaces/event.interface";
import useGlobalStore from "../../store/useGlobalStore";
import Calendar from "../../components/Calendar/Calendar";
import { getMinuteToPX } from "../../constants/constants";

function eventsOverlap(eventA: ICalendarEvent, eventB: ICalendarEvent) {
  return eventA.start < eventB.end && eventB.start < eventA.end;
}

function getOverlappingEvents(event: ICalendarEvent, events: ICalendarEvent[]) {
  return events.filter((e) => e !== event && eventsOverlap(e, event));
}

function getColumnIndex(event: ICalendarEvent, overlapping: ICalendarEvent[]) {
  const columns: ICalendarEvent[][] = [];
  let eventColIndex = 0;

  overlapping
    .concat(event)
    .sort((a, b) => a.start - b.start)
    .forEach((ev) => {
      const colIndex = columns.findIndex(
        (column) => !column.some((existing) => eventsOverlap(existing, ev)),
      );

      if (colIndex === -1) {
        columns.push([ev]);

        if (ev === event) {
          eventColIndex = columns.length - 1;
        }
      } else {
        const column = columns[colIndex] || [];
        column.push(ev);

        if (ev === event) {
          eventColIndex = colIndex;
        }
      }
    });

  return {
    colIndex: eventColIndex,
    totalColumns: columns.length,
  };
}

const HomepageView = () => {
  const { calendarEvents } = useGlobalStore();

  const [positionedEvents, setPositionedEvents] = useState<IPositionedEvent[]>(
    [],
  );

  const calculateEventPositions = useCallback(() => {
    const sortedEvents = [...calendarEvents].sort((a, b) => a.start - b.start);

    const positioned: IPositionedEvent[] = [];

    sortedEvents.forEach((event) => {
      const overlapping = getOverlappingEvents(event, sortedEvents);

      const top = event.start * getMinuteToPX();
      const height = (event.end - event.start) * getMinuteToPX();

      if (overlapping.length === 0) {
        positioned.push({
          ...event,
          top,
          height,
          colIndex: 0,
          width: "100%",
          left: "0%",
        });
        return;
      }

      const { colIndex, totalColumns } = getColumnIndex(event, overlapping);

      const width = 100 / totalColumns;
      const left = colIndex * width;

      positioned.push({
        ...event,
        top,
        height,
        colIndex,
        width: `${width}%`,
        left: `${left}%`,
      });
    });

    setPositionedEvents(positioned);
  }, [calendarEvents]);

  useEffect(() => {
    calculateEventPositions();
  }, [calculateEventPositions]);

  return <Calendar positionedEvents={positionedEvents} />;
};

export default HomepageView;
