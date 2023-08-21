import React, {useEffect} from 'react';
import DialoguesList from './DialoguesList';

const GlobalChat = ({drawerOpen, setDrawerOpen}) => {
  useEffect(() => {
    document.body.setAttribute('style', 'overflow: hidden');
    return () => document.body.setAttribute('style', 'overflow: auto');
  })

  return (
    <DialoguesList drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
  );
};

export default GlobalChat;
