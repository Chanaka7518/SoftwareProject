import React from 'react';
import { Calendar, Card } from 'antd';
import type { Dayjs } from 'dayjs';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';

const AdminCalendar: React.FC = () => {
  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return(
    <div>
      <Card style={{fontSize:28}}> 
      <b>Calender </b>
      <br></br>
        <Card type="inner">
        <Calendar onPanelChange={onPanelChange} />
        </Card>
      </Card>
    </div> 
  );
};

export default AdminCalendar;