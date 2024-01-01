import React, {useContext} from 'react';
import { Modal, Input } from 'antd';
import SelectedAttachmentPopupFooter from './SelectedAttachmentPopupFooter';
import SelectedAttachmentList from './SelectedAttachmentList';
import { ChatAttachmentsContext } from '../../../../models/context';

const SelectedAttachmentsPopup = ({modalIsOpened, handleSendWithAttachments, beforeUpload, attachmentText, attachmentTextChange}) => {
  const { handleModalCancel } = useContext(ChatAttachmentsContext)
  
  return (
    <Modal 
      footer={<SelectedAttachmentPopupFooter handleSendWithAttachments={handleSendWithAttachments} beforeUpload={beforeUpload}/>}
      title="Отправка файлов" 
      centered={true}
      multiple
      open={modalIsOpened} 
      onCancel={handleModalCancel}
    >
      <SelectedAttachmentList />
      <div style={{marginTop:"10px", borderBottom:"2px solid rgb(77, 161, 255)"}}>
        <Input 
          placeholder="Текст сообщения" 
          bordered={false} 
          value={attachmentText} 
          onChange={attachmentTextChange}
          onPressEnter={handleSendWithAttachments}
        />
      </div>
    </Modal>
  );
};

export default SelectedAttachmentsPopup;
