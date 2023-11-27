import React, {useContext, useEffect} from 'react';
import {Select} from "antd";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ProgramContext, WorkPageContext } from '../../models/context.js';
import { getOperatorOptions } from '../../models/operator/operators.js';
import { openNotification } from '../../models/notification/notification.js';
import { updateDocField } from '../../models/data-processing.js';
import { ApplicationStatus } from '../../models/context.js';
import { resetBeforeDownloadFilteredData } from '../../models/applications/table-data-processing.js';

const OperatorsSelect = ({dialogueSnap, clientApplicationsSnaps, assignedTo=null, transparent=true, disabledProp=false}) => {
  // TODO: убрать null у assignedTo. Видимо я ждал что с БД придет undefined. Сейчас приходит пустая строка либо айди
  const { setTableData, lastDoc, setLastDoc } = useContext(WorkPageContext);
  const { admins, notificationApi, role } = useContext(ProgramContext)
  const { curAppStatus } = useContext(ApplicationStatus); // если рендерится из ApplicationForm - получает статус заявки.
  const { clientId, appId } = useParams();
  const navigate = useNavigate();

  const handleSelectClick = (e) => {
    e.stopPropagation();
  }

  const handleSelect = async (value, _option) => {
    if(assignedTo === value) {
      return false;
    }

    try {
      // если clientApplicationsRefs = [], значит ненужно, чтобы происходило назначение оператора на анкету, т.к. у него еще нет оплаченной заявки.
      if (clientApplicationsSnaps.length > 0) {
        for (const applicationSnap of clientApplicationsSnaps) { // каждую заявку клиента
          if (applicationSnap.get('preparedInformation.preparationStatus') !== 2) { // если она не завершена
            if (role === "operator" && clientId === dialogueSnap.get('UID')) navigate("/"); // если роль визовик и
            await updateDocField(applicationSnap.ref, "preparedInformation.assignedTo", value);
             // после каждого внесения изменений в бд - происходит ререндер заявки перед следующим внесением изменений. Если открыта заявка на которую я еще пока назначен, то ошибки нет. Когда внесения внесутся в ту заявку, которая сейчас открыта, произойдет ее ререндер и будет ошибка, т.к. на нее  будут неверные где то. 
          }
        }
      }
      if(!dialogueSnap.get('active')) {
        await updateDocField(dialogueSnap.ref, "active", true);
      }
      await updateDocField(dialogueSnap.ref, "assignedTo", value);
      openNotification(notificationApi, "success", 'operatorChanged');
    } catch(e) {
      console.log(e)
      openNotification(notificationApi, "error", 'operatorChanged')
    }
  }

  const isOperatorIdExist = admins.findIndex(elem => {
    if(elem.role === "operator") {
      return elem.id === assignedTo
    }
    return false;
  })

  const options = getOperatorOptions(admins);
  const value = isOperatorIdExist !== -1 ? assignedTo : null;
  const selectIsDisabled = curAppStatus === 2 ? true : disabledProp;
  return (
    <div onClick= {handleSelectClick}>
      <Select
        disabled={selectIsDisabled}
        bordered = {!transparent}
        value={value}
        placeholder="Назначить"
        options={options}
        style={{
          width: 136,
        }}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default OperatorsSelect;
