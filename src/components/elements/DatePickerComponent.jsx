import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs' 
import { prepareChanges, getChangedValue } from '../../models/applications/questionnarie/questionnaire';
import { Timestamp } from 'firebase/firestore';


const DatePickerComponent = ({s, index, setAnswersToUpdate, answersToUpdate, isEdit}) => {
  const handleChange = (dayjsObject) => {
    const newTimestamp = Timestamp.fromMillis(dayjsObject.valueOf())
    const preparedChanges = prepareChanges(answersToUpdate, newTimestamp, index);
    setAnswersToUpdate(preparedChanges)
  }

  const alreadyChangedValue = getChangedValue(answersToUpdate, index);
  const displayedValue = (alreadyChangedValue !== false) ? dayjs.unix(alreadyChangedValue.seconds) : dayjs.unix(s);

  return  (
    <DatePicker value={displayedValue} onChange={handleChange} disabled={!isEdit}/>
  ) 
};

export default DatePickerComponent;
