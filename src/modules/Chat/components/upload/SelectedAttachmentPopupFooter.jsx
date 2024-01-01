import React, {useContext} from 'react';
import { Button, Upload } from 'antd';
import "../../../../assets/chat/chat-upload-footer.scss"
import { ChatAttachmentsContext } from '../../../../models/context';

const SelectedAttachmentPopupFooter = ({handleSendWithAttachments, beforeUpload}) => {
  const {chatUploadAttachmentList, handleModalCancel} = useContext(ChatAttachmentsContext)

  return (
    <div className="chat-upload-footer__container">
      <div className="left-side">
        <Upload 
          multiple
          showUploadList={false}
          beforeUpload={beforeUpload}
          fileList={chatUploadAttachmentList}
        >
          <Button>Добавить файл</Button>
        </Upload>
      </div>
      <div className="right-side">
        <Button 
          size="middle"
          onClick={handleModalCancel}
        >
          Отмена
        </Button>
        <Button 
          size="middle"
          type="primary"
          onClick={handleSendWithAttachments}
        >
          Отправить
        </Button>
      </div>
    </div>
  );
};

export default SelectedAttachmentPopupFooter;
