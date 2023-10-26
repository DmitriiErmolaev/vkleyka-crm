import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Drawer, Card, Spin } from 'antd';
import { getApplicationsBySetOfApplicantIDs } from '../../models/chat/dialogue-list/dialogue-list-data-processing';
import DialogueSearch from './DialogueSearch';
import { ProgramContext, WorkPageContext } from '../../models/context';
import { getDialogueList } from '../../models/chat/dialogue-list/dialogue-list';
import { getDataFromCollSnapshot } from '../../models/data-processing';
import Error from '../error/Error';
import DialoguesList from './DialoguesList';
import { getChatsQueryForDialoguesList } from '../../models/chat/chat-data-processing';
import '../../assets/chat/dialogue-list.scss';
import '../../assets/loading.scss';


const DialoguesListContainer = ({drawerOpen, handleDrawerClose, selectedDialogue, setSelectedDialogue, setDialogueWindowOpen}) => {
  const dialoguesListContainerRef = useRef(null)
  const [ searchFilters, setSearchFilters ] = useState('');
  const { authorizedUser, role } = useContext(ProgramContext);
  const { chatsCollSnapshot, chatsLoading } = useContext(WorkPageContext);
  
  return (
    <div
      ref={dialoguesListContainerRef}
      style={{position:'relative'}}
    >
      <Drawer 
        bodyStyle={{padding:"5px 0 10px 0"}}
        rootClassName="dialogues-list"
        placement="left"
        title={<DialogueSearch setSearchFilters={setSearchFilters} />}
        open={drawerOpen}
        mask={false}
        onClose={handleDrawerClose}
        getContainer={false}
        zIndex={100}
      >
        {chatsLoading ? (
          <div className="loading">
            <div className="loading__spinner">
              <Spin />
            </div>
            <p className="loading__text">
              Загрузка...
            </p>
          </div>
        ) : (
          <DialoguesList 
            chatsCollSnapshot={chatsCollSnapshot} 
            selectedDialogue={selectedDialogue} 
            setSelectedDialogue={setSelectedDialogue} 
            setDialogueWindowOpen={setDialogueWindowOpen} 
            handleDrawerClose={handleDrawerClose} 
            dialoguesListContainerRef={dialoguesListContainerRef}
          />
        )}
      </Drawer>
    </div>
  );
};

export default DialoguesListContainer;
