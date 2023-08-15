import React, {useContext} from 'react';
import UploadAttachment from './UploadAttachment';
import { ChatAttachmentsContext } from '../../../models/context';

const SelectedAttachmentList = () => {
  const {chatUploadAttachmentList} = useContext(ChatAttachmentsContext)

  const attachments = chatUploadAttachmentList.map(attachment => {
    return <UploadAttachment key={attachment.uid} attachment={attachment} />
  })

  return (
    <div className="chat-upload-attachment-list__container">
      {attachments}
    </div>
  );
};

export default SelectedAttachmentList;
