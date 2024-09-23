import React, { useState, useEffect } from "react";
import moment, { Moment } from "moment";

interface TimeSelectProps {
  selectedDate: Date;
  timeRange: string;
  selectedTime: string;
  handleChange: (val: string) => void;
  className?: string;
}

const TimeSelect: React.FC<TimeSelectProps> = ({
  selectedDate,
  timeRange,
  className,
  selectedTime,
  handleChange,
}) => {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  const parseTimeString = (timeString: string): Moment => {
    return moment(timeString, "hh:mm A");
  };

  const generateTimes = (startTime: Moment, endTime: Moment): string[] => {
    const times: string[] = [];
    let time = startTime.clone();

    while (time.isBefore(endTime) || time.isSame(endTime)) {
      times.push(time.format("hh:mm A"));
      time = time.add(30, "minutes");
    }

    return times;
  };

  useEffect(() => {
    const [startTimeString, endTimeString] = timeRange.split(" - ");
    const startTime = parseTimeString(startTimeString);
    const endTime = parseTimeString(endTimeString);
    const now = moment();

    let filteredTimes = generateTimes(startTime, endTime);

    if (moment(selectedDate).isSame(now, "day")) {
      const oneHourLater = now.add(1, "hour");
      filteredTimes = filteredTimes.filter((timeString) =>
        parseTimeString(timeString).isAfter(oneHourLater)
      );
    }

    setAvailableTimes(filteredTimes);
  }, [selectedDate, timeRange]);

  return (
    <select
      value={selectedTime}
      onChange={(e) => handleChange(e.target.value)}
      className={className}
    >
      {availableTimes.length === 0 ? (
        <option disabled>No times available</option>
      ) : (
        <>
          <option value="">Select a time</option>
          {availableTimes.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </>
      )}
    </select>
  );
};

export default TimeSelect;
