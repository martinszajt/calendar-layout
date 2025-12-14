import React, { useEffect, useState } from "react";
import {
  ICalendarEvent,
  IPositionedEvent,
} from "../../interfaces/event.interface";
import useGlobalStore from "../../store/useGlobalStore";
import Calendar from "../../components/Calendar/Calendar";
import {
  getCalendarWidth,
  getMinuteToPX,
  getTimeLabelWidth,
} from "../../constants/constants";

// Check if two events overlap in time
function eventsOverlap(eventA: ICalendarEvent, eventB: ICalendarEvent) {
  return eventA.start < eventB.end && eventB.start < eventA.end;
}

// Group events by overlapping time
function groupOverlappingEvents(events: ICalendarEvent[]) {
  const groups: ICalendarEvent[][] = [];

  events.forEach((event) => {
    const groupIndex = groups.findIndex((group) =>
      group.some((existingEvent) => eventsOverlap(existingEvent, event)),
    );

    if (groupIndex === -1) {
      groups.push([event]);
    } else {
      groups[groupIndex]!.push(event); // add `!` here
    }
  });

  return groups;
}

// Assign events in a group to columns so no events in the same column overlap
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
      columns[colIndex]!.push(event); // add non-null assertion here
    }
  });

  return columns;
}

// Calculate event positions for rendering
function calculateEventPositions(events: ICalendarEvent[]): IPositionedEvent[] {
  if (events.length === 0) return [];

  // Sort be start time
  const sortedEvents = [...events].sort((a, b) => a.start - b.start);

  // Create columns for overlapping events
  const groups = groupOverlappingEvents(sortedEvents);

  const positionedEvents: IPositionedEvent[] = [];

  // Set position for each event
  groups.forEach((group) => {
    const columns = assignColumnsToGroup(group);
    const totalColumns = columns.length;
    const eventWidth =
      (getCalendarWidth() - getTimeLabelWidth()) / totalColumns;

    group.forEach((event) => {
      const colIndex = columns.findIndex((column) => column.includes(event));
      positionedEvents.push({
        ...event,
        top: event.start * getMinuteToPX(),
        height: (event.end - event.start) * getMinuteToPX(),
        left: colIndex * eventWidth,
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
    setPositionedEvents(calculateEventPositions(calendarEvents));
  }, [calendarEvents]);

  return <Calendar positionedEvents={positionedEvents} />;
};

export default HomepageView;
