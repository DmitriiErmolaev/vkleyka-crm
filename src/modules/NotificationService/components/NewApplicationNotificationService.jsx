import React, { useContext, useEffect, useRef, useState } from 'react';
import { notification } from 'antd';
import showNotification from '../helpers/showNotification';
import { ProgramContext, WorkPageContext } from '../../../models/context';

const NewApplicationNotificationService = ({applicationsData}) => {
  const { authorizedUser, role, notificationAPI } = useContext(ProgramContext);
  const { selectedDialogue, scrollMode, loginTime, clientsData  } = useContext(WorkPageContext)

  const [ api, contextHolder ] = notification.useNotification();
  const showedApps = useRef([]);

  useEffect(() => {
    if(applicationsData) {
      applicationsData.forEach(application => {
        if(application.isRead === true) return;
        if(application.isRead === false) {
          // если даты назначения undefined - смотрим на дату создания. Если она больше даты входа в систему - получаем увед.
          // если даты назначения undefined - смотрим на дату создания. Если она меньше даты входа в систему - значит заявка была создана пока мы были оффлайн.
          // если дата назначения true и мы оператор. Если дата назначения больше даты взода в систему - получаем увед
          // если дата назначения true и мы оператор. Если дата назначения меньше даты входа в систему - значит заявка была назначена на нас пока мы были оффлайн.
          if(showedApps.current.includes(application.documentID)) return;
          if(application.assignedAt === undefined) { // заявка упала впервые визовику или админу. показываем если нет даты назначения и время создания больше времени входа в систему. 
            if (application.createdAt.valueOf() < loginTime.valueOf()) return;
            const client = clientsData.find(client => client.UID === application.UID);
            const clientName = client?.name || client?.phone || client?.email || client?.UID;
            showNotification(notificationAPI, 'unreviewedApps', {applicantName: clientName, applicationId: application.documentID,});
            showedApps.current.push(application.documentID);
          } else {
            console.log(321)
            if (role === 'admin' || application.assignedAt.valueOf() < loginTime.valueOf()) return; // заявка упала на визовика после явного назначения. Показываем если роль оператор и время назначения больше времени входа в систему.
            const client = clientsData.find(client => client.UID === application.UID);
            const clientName = client?.name || client?.phone || client?.email || client?.UID;
            showNotification(notificationAPI, 'unreviewedApps', {applicantName: clientName, applicationId: application.documentID,});
            showedApps.current.push(application.documentID);
          }
        };
      })
    }
  }, [applicationsData, clientsData, loginTime, notificationAPI, role])

  useEffect(() => {
    if(applicationsData) {
      showedApps.current = showedApps.current.filter(id => {// если заявку у визовика забрали или он сам ее переназначил -
        return applicationsData.some(app => app.documentID === id);
      })
    }
  }, [applicationsData])

  return <></>
};

export default NewApplicationNotificationService;
