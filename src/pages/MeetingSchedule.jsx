// pages/MeetingSchedule.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format } from 'date-fns';
import './calendar.css'; // Custom styling for mobile responsiveness

const dummyMeetings = [
  { date: '2025-05-05', title: 'John Doe - 10:00 AM' },
  { date: '2025-05-12', title: 'Jane Smith - 2:00 PM' },
  { date: '2025-05-20', title: 'Emily Johnson - 11:30 AM' }
];

export default function MeetingSchedule() {
  const events = dummyMeetings.map(m => ({ title: m.title, date: m.date }));

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        CPR Meeting Schedule - {format(new Date(), 'MMMM yyyy')}
      </Typography>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
        headerToolbar={{ start: '', center: 'title', end: '' }}
        contentHeight="auto"
        aspectRatio={1.2}
        editable={false}
      />
    </Box>
  );
}