import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const CustomScheduler = ({ selectedDate, setSelectedDate, selectedTime, setSelectedTime }) => {
  // Generate next 7 days (excluding Sunday)
  const getNextDays = () => {
    const days = [];
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    let count = 0;
    let offset = 1;

    while (count < 6) {
      const date = new Date();
      date.setDate(date.getDate() + offset);

      // If Sunday, skip
      if (date.getDay() !== 0) {
        const formattedDate = date.toISOString().split('T')[0];
        const label = date.toLocaleDateString('en-US', options);
        days.push({ value: formattedDate, label });
        count++;
      }
      offset++;
    }
    return days;
  };

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
  ];

  const days = getNextDays();

  return (
    <div className="space-y-6">
      {/* Date Selector */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
          <Calendar size={16} className="text-primary" />
          <span>Select Date</span>
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {days.map((day) => (
            <button
              key={day.value}
              type="button"
              onClick={() => setSelectedDate(day.value)}
              className={`p-3 rounded-xl border text-center transition-all ${
                selectedDate === day.value
                  ? 'border-primary bg-primary/5 text-primary font-semibold shadow-sm'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className="block text-xs uppercase opacity-75">{day.label.split(',')[0]}</span>
              <span className="block text-lg font-bold mt-0.5">{day.label.split(' ')[2] || day.label.split(' ')[1]}</span>
              <span className="block text-[10px] uppercase opacity-75">{day.label.split(' ')[1]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time Slot Selector */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
          <Clock size={16} className="text-primary" />
          <span>Select Time Slot</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setSelectedTime(slot)}
              className={`py-3 px-4 rounded-xl border text-center text-sm font-medium transition-all ${
                selectedTime === slot
                  ? 'border-primary bg-primary/5 text-primary font-semibold shadow-sm'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomScheduler;
