import React, { useContext, useRef } from 'react';
import { Drawer, Spin } from 'antd';
import DialogueSearch from './DialogueSearch';
import { WorkPageContext } from '../../models/context';
import DialoguesList from './DialoguesList';
import '../../assets/chat/dialogue-list.scss';
import '../../assets/loading.scss';
import Spinner from '../spinner/Spinner';


const DialoguesListContainer = ({chatListOpen, handleDrawerClose, selectedDialogue, setSelectedDialogue, setDialogueWindowOpen}) => {
  const dialoguesListContainerRef = useRef(null)
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
        title={<DialogueSearch />}
        open={chatListOpen}
        mask={false}
        onClose={handleDrawerClose}
        getContainer={false}
        zIndex={100}
      >
        {chatsLoading ? (
          <Spinner />
          // <div className="loading">
          //   <div className="loading__spinner">
          //     <Spin />
          //   </div>
          //   <p className="loading__text">
          //     Загрузка...
          //   </p>
          // </div>
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
