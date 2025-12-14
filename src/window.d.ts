export {};

declare global {
  interface Window {
    layOutDay: (events: ICalendarEvent[]) => void;
  }
}
