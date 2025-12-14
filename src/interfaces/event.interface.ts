export interface ICalendarEvent {
  start: number;
  end: number;
}

export interface IPositionedEvent extends ICalendarEvent {
  top: number;
  height: number;
  colIndex: number;
}
