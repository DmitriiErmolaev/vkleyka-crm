import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import React from 'react';

const DatePickerContainer = ({value, onChange, isEdit}) => {

  const handleDateChange = (dayjs, _dateString) => {

    if (dayjs === null) { // если нажали на крестик (сброс даты) в DatePicker
      onChange(''); // установить пустую строку в качестве текущего value.
      return;
    }
    // onChange(dayjs.unix()); // обновляет стейт Form.Item
    onChange(Timestamp.fromMillis(dayjs.valueOf())); // обновляет стейт Form.Item
  }

  return (
    <DatePicker
      value={value ? dayjs.unix(value.seconds) : ''}
      disabled={!isEdit}
      allowClear={true}
      onChange={handleDateChange}
    />
  );
};

export default DatePickerContainer;
