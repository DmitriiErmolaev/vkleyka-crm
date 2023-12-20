import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { Drawer, Spin } from 'antd';
import DialogueSearch from './DialogueSearch';
import { WorkPageContext } from '../../models/context';
import DialoguesList from './DialoguesList';
import '../../assets/chat/dialogue-list.scss';
import '../../assets/loading.scss';
import Spinner from '../spinner/Spinner';
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
