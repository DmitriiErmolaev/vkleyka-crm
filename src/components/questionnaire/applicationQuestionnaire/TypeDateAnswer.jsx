import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs'
import { prepareChanges, checkChangedValueExists } from '../../../models/applications/questionnaire/questionnaire';
import { Timestamp } from 'firebase/firestore';

const TypeDateAnswer = ({questionData, questionIndex, setAnswersToUpdate, answersToUpdate, isEdit}) => {
  const handleChange = (dayJsObject) => {
    // получаем новый timestamp для firebase из милисекунд, полученных из дейтпикера
    // дейтпикер возвращает dayJsObject, из которого методом valueOf() получаем милисекунды выбранной даты.
    // Если в датапикере нажать крестик для сброса даты - то метод вернет null
    const newTimestamp =  dayJsObject === null ? {seconds: '', nanoseconds: 0} : Timestamp.fromMillis(dayJsObject.valueOf()) // запишем в seconds пустую строку, чтобы дата пикер отображал пустое поле с placegolder "select date"
    const preparedChanges = prepareChanges(answersToUpdate, newTimestamp, questionIndex);
    setAnswersToUpdate(preparedChanges)
  }

  const alreadyChangedResponse = checkChangedValueExists(answersToUpdate, questionIndex);
  const displayedValue = !alreadyChangedResponse
    ?  dayjs.unix(questionData.response.seconds) // пустая строка воспринимается как 0 - и возвращается dayjs объект временной метки 1970г
    : (
      alreadyChangedResponse.seconds === ''
        ? '' // чтобы дата пикер показал плейсхолдер "select date", value должно получить пустую строку.
        : dayjs.unix(alreadyChangedResponse.seconds)
    )

  return  (
    <DatePicker value={displayedValue} onChange={handleChange} disabled={!isEdit} allowClear={false}/>
  )
};

export default TypeDateAnswer;
