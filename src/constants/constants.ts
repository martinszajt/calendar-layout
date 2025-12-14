const DEFAULT_MINUTE_TO_PX = 1;

export function getMinuteToPX() {
  return DEFAULT_MINUTE_TO_PX;
}

export function getTotalHeight() {
  const hours = 21 - 9;
  const minutesPerHour = 60;
  const minuteToPx = getMinuteToPX();
  return hours * minutesPerHour * minuteToPx;
}
