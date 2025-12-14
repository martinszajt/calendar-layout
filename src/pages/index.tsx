import type { NextPage } from "next";
import { useEffect } from "react";
import HomepageView from "../views/homepage";
import useGlobalStore from "../store/useGlobalStore";

const Home: NextPage = () => {
  const { setCalendarEvents } = useGlobalStore();

  useEffect(() => {
    window.layOutDay = (events) => {
      setCalendarEvents(events);
    };
  }, [setCalendarEvents]);

  return <HomepageView />;
};

export default Home;
