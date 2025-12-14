import React, { useEffect, useState } from "react";
import {
  ICalendarEvent,
  IPositionedEvent,
} from "../../interfaces/event.interface";
import useGlobalStore from "../../store/useGlobalStore";
import {
  CALENDAR_WIDTH,
  TIME_LABEL_WIDTH,
  MINUTE_TO_PX,
} from "../../constants/constants";
import Calendar from "../../components/Calendar/Calendar";

function collides(a: ICalendarEvent, b: ICalendarEvent) {
  return a.start < b.end && b.start < a.end;
}

function calculatePositions(events: ICalendarEvent[]): IPositionedEvent[] {
  const sortedEvents = [...events].sort((a, b) => a.start - b.start);
  const groups: ICalendarEvent[][] = [];

  sortedEvents.forEach((event) => {
    const groupIndex = groups.findIndex((group) =>
      group.some((e) => collides(e, event)),
    );

    if (groupIndex === -1) {
      groups.push([event]);
    } else {
      groups[groupIndex].push(event);
    }
  });

  const positionedEvents: IPositionedEvent[] = [];

  groups.forEach((group) => {
    const columns: ICalendarEvent[][] = [];
    // Use a Map to store event to column index, avoiding `any`
    const eventColumnMap = new Map<ICalendarEvent, number>();

    group.forEach((event) => {
      const colIndex = columns.findIndex(
        (col) => !col.some((e) => collides(e, event)),
      );

      if (colIndex === -1) {
        columns.push([event]);
        eventColumnMap.set(event, columns.length - 1);
      } else {
        columns[colIndex].push(event);
        eventColumnMap.set(event, colIndex);
      }
    });

    const colCount = columns.length;
    const eventWidth = (CALENDAR_WIDTH - TIME_LABEL_WIDTH) / colCount;

    group.forEach((event) => {
      const col = eventColumnMap.get(event) ?? 0;
      positionedEvents.push({
        ...event,
        top: event.start * MINUTE_TO_PX,
        height: (event.end - event.start) * MINUTE_TO_PX,
        left: col * eventWidth,
        width: eventWidth,
      });
    });
  });

  return positionedEvents;
}

const HomepageView = () => {
  const { calendarEvents } = useGlobalStore();
  const [positionedEvents, setPositionedEvents] = useState<IPositionedEvent[]>(
    [],
  );

  useEffect(() => {
    if (calendarEvents.length === 0) {
      setPositionedEvents([]);
      return;
    }
    const positions = calculatePositions(calendarEvents);
    setPositionedEvents(positions);
  }, [calendarEvents]);

  return <Calendar positionedEvents={positionedEvents} />;
};

export default HomepageView;
