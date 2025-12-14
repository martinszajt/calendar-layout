import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ICalendarEvent } from "../interfaces/event.interface";

interface State {
  calendarEvents: ICalendarEvent[];
  setCalendarEvents: (events: ICalendarEvent[]) => void;
}

const initialState = {
  calendarEvents: [],
};
const useGlobalStore = create<State>()(
  persist(
    (set) => ({
      calendarEvents: initialState.calendarEvents,
      setCalendarEvents: (events: ICalendarEvent[]) => {
        set({ calendarEvents: events });
      },
    }),
    { name: "calendar-storage" },
  ),
);

export default useGlobalStore;
