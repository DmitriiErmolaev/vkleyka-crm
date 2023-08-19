import React from 'react';
import DialoguesList from './DialoguesList';

const GlobalChat = ({drawerOpen, setDrawerOpen}) => {
  return (
    <DialoguesList drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
  );
};

export default GlobalChat;
