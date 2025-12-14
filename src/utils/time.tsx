function formatMinutesToTime(minutes: number) {
  const totalMinutes = 9 * 60 + minutes;
  let h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const ampm = h >= 12 ? "pm" : "am";
  if (h > 12) h -= 12;
  return `${h}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export default formatMinutesToTime;
