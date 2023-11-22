import React, { useContext, useLayoutEffect } from 'react';
import { Card, Spin } from 'antd';
import { getDialogueList } from '../../models/chat/dialogue-list/dialogue-list';
import { ProgramContext, WorkPageContext } from '../../models/context';
import { getDataFromCollSnapshot } from '../../models/data-processing';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getApplicationsBySetOfApplicantIDs } from '../../models/chat/dialogue-list/dialogue-list-data-processing';
import Error from '../error/Error';
import '../../assets/loading.scss';


const DialoguesList = ({chatsCollSnapshot, selectedDialogue, setSelectedDialogue, setDialogueWindowOpen, handleDrawerClose, dialoguesListContainerRef}) => {
  const {cleintsData} = useContext(WorkPageContext);
  const {authorizedUser, role} = useContext(ProgramContext);
  const [appsCollSnapshot, appsLoading, appsError] = useCollection(getApplicationsBySetOfApplicantIDs(chatsCollSnapshot, authorizedUser.id, role));

  useLayoutEffect(() => {
    if (!appsLoading) {
      dialoguesListContainerRef.current.style.top = `${window.scrollY}px`
    }
  }, [appsLoading, dialoguesListContainerRef])

  if (appsLoading) {
    return (
      <div className="loading">
        <div className="loading__spinner">
          <Spin />
        </div>
        <p className="loading__text">
          Загрузка...
        </p>
      </div>
    )
  }

  if (appsError) {
    return <Error error={appsError}/>
  }

  const dialoguesList = getDialogueList(
    authorizedUser, 
    chatsCollSnapshot, 
    cleintsData, 
    appsCollSnapshot, 
    selectedDialogue,
    {setSelectedDialogue, setDialogueWindowOpen, handleDrawerClose}
  )

  return (
    <Card
      bordered={false}
      bodyStyle={{padding:"0", borderRadius:"0", boxShadow:"none"}}
    >
      {dialoguesList}
    </Card>
  );
};

export default DialoguesList;
