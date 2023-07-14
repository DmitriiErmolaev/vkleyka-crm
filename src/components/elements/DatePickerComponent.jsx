import React, {useState} from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs' 



const DatePickerComponent = ({ms}) => {
  const [editedDate, setEditedDate] = useState(null);
  console.log(dayjs.unix(ms))
  const handleChange = (dayjs) => {
    setEditedDate(dayjs)
  }
  return (
    <DatePicker value={editedDate || dayjs.unix(ms)} onChange={handleChange}/>
  );
};

export default DatePickerComponent;