import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Drawer } from 'antd';
import DialogueSearch from './DialogueSearch';
import DialoguesList from './DialoguesList';
import '../../../assets/chat/dialogue-list.scss';
import '../../../assets/loading.scss';
import { useLocation } from 'react-router-dom';

const DialoguesListContainer = ({chatListOpen, handleDrawerClose, selectedDialogue, setSelectedDialogue, setDialogueWindowOpen}) => {
  const dialoguesListContainerRef = useRef(null)
  const location = useLocation()

  useLayoutEffect(() => {
    if (chatListOpen) {
      dialoguesListContainerRef.current.style.top = `${window.scrollY}px`
    }
  }, [chatListOpen, dialoguesListContainerRef])

  useEffect(() => {
    dialoguesListContainerRef.current.style.top = `0px`
  }, [location])

  return (
    <div
      ref={dialoguesListContainerRef}
      style={{position:'relative'}}
    >
      <Drawer
        classNames={{
          body:'dialogues-list__body'
        }}
        rootClassName="dialogues-list"
        placement="left"
        title={<DialogueSearch />}
        open={chatListOpen}
        mask={false}
        onClose={handleDrawerClose}
        getContainer={false}
        zIndex={100}
      >
        <DialoguesList
          selectedDialogue={selectedDialogue}
          setSelectedDialogue={setSelectedDialogue}
          setDialogueWindowOpen={setDialogueWindowOpen}
          handleDrawerClose={handleDrawerClose}
          dialoguesListContainerRef={dialoguesListContainerRef}
        />
      </Drawer>
    </div>
  );
};

export default DialoguesListContainer;
