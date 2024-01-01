import { Button, Input } from 'antd';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { getNewListWithAdded } from '../helpers/getNewListWithAdded.js';
import { getNewListWithChangedValues } from '../helpers/getNewListWithChangedValues.js';
import { getNewListWithRemoved } from '../helpers/getNewListWithRemoved.js';
import { checkChangedValueExists } from '../helpers/checkChangedValueExists';
import { prepareChanges } from '../helpers/prepareChanges';
const TypeListAnswer = ({questionData, questionIndex, setAnswersToUpdate, answersToUpdate, isEdit}) => {

  const addListItem = () => {
    const newList = getNewListWithAdded(answersToUpdate, questionData, questionIndex)
    setAnswersToUpdate(prev => {
      return prepareChanges(prev, newList, questionIndex)
    })
  }

  const removeListItem = (itemIndex) => {
    const newList = getNewListWithRemoved(answersToUpdate, questionData, questionIndex, itemIndex)
    setAnswersToUpdate(prev => {
      return prepareChanges(prev, newList, questionIndex)
    })
  }

  const handleChange = (itemIndex, e) => {
    const newList = getNewListWithChangedValues(answersToUpdate, questionData, questionIndex, itemIndex, e.target.value)
    setAnswersToUpdate(prev => {
      return prepareChanges(prev, newList, questionIndex)
    })
  }

  const isChangedValueExists = checkChangedValueExists(answersToUpdate, questionIndex);
  const listToShow = (isChangedValueExists !== false) ? isChangedValueExists : questionData.response;

  const list = listToShow.map((item, index) => {
    return (
      <li key={index}>
        {isEdit ? (
          <Input size='small' value={item} onChange={(e) => handleChange(index, e)} suffix={<Button type='link' onClick={() => removeListItem(index)}>Удалить</Button>} />
        ) : (
          item
        )}
      </li>
    )
  })

  return (
    <div>
      <ul style={{marginLeft: '20px', width:'70%'}}>
        {list}
      </ul>
      <Button type='link' onClick={addListItem} style={{display: isEdit ? 'block' : 'none'}}>Добавить</Button>
    </div>
  );
};

export default TypeListAnswer;