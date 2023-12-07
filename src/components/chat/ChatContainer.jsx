import React, { useEffect } from 'react';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { getChatQueryForApplication } from '../../models/chat/chat-data-processing';
import Spinner from '../spinner/Spinner';

const ChatContainer = ({children, applicantId, setClientChatSnap}) => {
  const [ clientChatData, clientChatLoading, clientChatError, clientChatCollSnapshot ] = useCollectionData(getChatQueryForApplication(applicantId)) // нельзя запросить конкретный документ, потому что не знаем путь.
  // TODO: нужна ли дата?

  useEffect(() => {
    if (clientChatData) {
      setClientChatSnap()
    }
  })

  return (
    <div className="chat-section">
      {clientChatLoading ? (
        <Spinner />
      ) : (
        {children}
      )}
    </div>
  );
};

export default ChatContainer;