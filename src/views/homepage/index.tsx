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

function groupOverlappingEvents(events: ICalendarEvent[]) {
  const groups: ICalendarEvent[][] = [];

  events.forEach((event) => {
    const groupIndex = groups.findIndex((group) =>
      group.some((existingEvent) => eventsOverlap(existingEvent, event)),
    );

    if (groupIndex === -1) {
      groups.push([event]);
    } else {
      groups[groupIndex]!.push(event);
    }
  });

  return groups;
}

const HomepageView = () => {
  const { calendarEvents } = useGlobalStore();
  const [positionedEvents, setPositionedEvents] = useState<IPositionedEvent[]>(
    [],
  );
  const [totalColumns, setTotalColumns] = useState<number>(0);

  function assignColumnsToGroup(group: ICalendarEvent[]) {
    const columns: ICalendarEvent[][] = [];

    group.forEach((event) => {
      const colIndex = columns.findIndex(
        (column) =>
          !column.some((existingEvent) => eventsOverlap(existingEvent, event)),
      );

      if (colIndex === -1) {
        columns.push([event]);
      } else {
        columns[colIndex]!.push(event);
      }
    });

    setTotalColumns(columns.length);

    return columns;
  }

  const calculateEventPositions = useCallback(() => {
    const sortedEvents = [...calendarEvents].sort((a, b) => a.start - b.start);

    const groups = groupOverlappingEvents(sortedEvents);

    const positionedEventsList: IPositionedEvent[] = [];

    groups.forEach((group) => {
      const columns = assignColumnsToGroup(group);

      group.forEach((event) => {
        const colIndex = columns.findIndex((column) => column.includes(event));
        positionedEventsList.push({
          ...event,
          top: event.start * getMinuteToPX(),
          height: (event.end - event.start) * getMinuteToPX(),
          colIndex,
        });
      });
    });

    setPositionedEvents(positionedEventsList);
  }, [calendarEvents]);

  useEffect(() => {
    calculateEventPositions();
  }, [calculateEventPositions]);

  return (
    <Calendar positionedEvents={positionedEvents} totalColumns={totalColumns} />
  );
};

export default HomepageView;
