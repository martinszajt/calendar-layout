import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useCallback } from "react";
import HomepageView from "../views/homepage";
import useGlobalStore from "../store/useGlobalStore";
import { ICalendarEvent } from "../interfaces/event.interface";

const Home: NextPage = () => {
  const { setCalendarEvents } = useGlobalStore();

  const layOutDay = useCallback(
    (events: ICalendarEvent[]) => {
      if (!Array.isArray(events)) {
        console.error("layOutDay error: input must be an array of events");
        return;
      }

      const DAY_START = 0;
      const DAY_END = 720;

      const isValid = events.every((event) => {
        return (
          event &&
          typeof event.start === "number" &&
          typeof event.end === "number" &&
          event.start >= DAY_START &&
          event.end <= DAY_END &&
          event.start < event.end
        );
      });

      if (!isValid) {
        console.error(
          "layOutDay error: one or more events have invalid start/end times or range",
        );
        return;
      }
      try {
        setCalendarEvents(events);
        console.log("events updated!");
      } catch {
        console.log("failed to update events");
      }
    },
    [setCalendarEvents],
  );

  useEffect(() => {
    (window as any).layOutDay = layOutDay;

    return () => {
      (window as any).layOutDay = undefined;
    };
  }, [layOutDay]);

  return (
    <>
      <Head>
        <title>React Calendar Layout</title>
      </Head>
      <HomepageView />
    </>
  );
};

export default Home;
