import {
  ICalendarEvent
} from '../interfaces/event.interface'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  calendarEvents: ICalendarEvent[],
setCalendarEvents: (events: ICalendarEvent[]) => void
}

const initialState = {
  calendarEvents: [],
}
export const useStore = create<State>()(
  persist(
    (set) => ({
      calendarEvents: initialState.calendarEvents,
      setCalendarEvents: (events: ICalendarEvent[]) => {
        set({ calendarEvents: events })
      },
    }),
    { name: 'calendar-storage' }
  )
)