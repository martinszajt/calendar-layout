import { create } from "zustand";
import { ICalendarEvent } from "../interfaces/event.interface";
import initialEvents from "./initialEvents";

interface State {
  calendarEvents: ICalendarEvent[];
  setCalendarEvents: (events: ICalendarEvent[]) => void;
}

const initialState = {
  calendarEvents: initialEvents,
};
const useGlobalStore = create<State>()((set) => ({
  calendarEvents: initialState.calendarEvents,
  setCalendarEvents: (events: ICalendarEvent[]) => {
    set({ calendarEvents: events });
  },
}));

export default useGlobalStore;
