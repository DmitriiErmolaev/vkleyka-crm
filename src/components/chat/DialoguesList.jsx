import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import { getDialogueList } from '../../models/chat/dialogue-list/dialogue-list';
import { ProgramContext, WorkPageContext } from '../../models/context';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getApplicationsBySetOfApplicantIDs } from '../../models/chat/dialogue-list/dialogue-list-data-processing';
import Error from '../error/Error';
import '../../assets/loading.scss';
import Spinner from '../spinner/Spinner';

const DialoguesList = ({selectedDialogue, setSelectedDialogue, setDialogueWindowOpen, handleDrawerClose, dialoguesListContainerRef}) => {
  const { clientsData, scrollMode, chatsLoading, chatsCollSnapshot } = useContext(WorkPageContext);
  const { authorizedUser, role } = useContext(ProgramContext);
  const [ appsCollSnapshot, appsLoading, appsError ] = useCollection(getApplicationsBySetOfApplicantIDs(chatsCollSnapshot, authorizedUser.id, role));
  const [ dialogueList, setDialogueList ] = useState([])

  console.log(appsCollSnapshot, appsLoading)

  useEffect(() => {
    if(chatsCollSnapshot && appsCollSnapshot) {
      console.log('count')
      setDialogueList(getDialogueList(
        authorizedUser,
        chatsCollSnapshot,
        clientsData,
        appsCollSnapshot,
        selectedDialogue,
        scrollMode,
        {setSelectedDialogue, setDialogueWindowOpen, handleDrawerClose}
      ))
    }
  }, [chatsCollSnapshot, authorizedUser, clientsData, appsCollSnapshot, selectedDialogue, scrollMode, setSelectedDialogue, setDialogueWindowOpen, handleDrawerClose])


  if(dialogueList.length === 0) {
    return <Spinner />
  }

  if (appsError) {
    return <Error error={appsError}/>
  }

  return (
    <Card
      bordered={false}
      bodyStyle={{padding:"0", borderRadius:"0", boxShadow:"none"}}
    >
      {dialogueList}
    </Card>
  );
};

export default DialoguesList;
