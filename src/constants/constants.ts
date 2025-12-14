const DEFAULT_TIME_LABEL_WIDTH = 60; // px para columna lateral de horas
const DEFAULT_CALENDAR_WIDTH = 620; // ancho total contenedor (incluye label)
const DEFAULT_CALENDAR_HEIGHT = 720; // altura total (9am a 9pm)
const DEFAULT_MINUTE_TO_PX = 1;

export function getTimeLabelWidth() {
  return DEFAULT_TIME_LABEL_WIDTH;
}

export function getMinuteToPX() {
  return DEFAULT_MINUTE_TO_PX;
}

export function getCalendarHeight() {
  return DEFAULT_CALENDAR_HEIGHT;
}

export function getCalendarWidth() {
  if (typeof window !== "undefined") {
    console.log("window undefined");
    return window.innerHeight;
  }
  return DEFAULT_CALENDAR_WIDTH;
}
