import React, {useEffect, useState} from 'react';
import { FileFilled, LoadingOutlined  } from '@ant-design/icons';
import { getDownloadURL } from "firebase/storage";
import { getFileRef } from '../../../models/firebase';
import '../../../assets/chat/attachment.scss';

const Attachment = ({ attachment, isLoading }) => {
  const [downloadURL, setDownloadURL] = useState(null)

  useEffect(() => {
    if(!attachment.link){
      return;
    }
    getDownloadURL(getFileRef(attachment.link))  // промис с download URL
      .then(res => setDownloadURL(res)) 
  },[attachment])

  const icon = isLoading ? <LoadingOutlined style={{fontSize:"32px", color:"#4DA1FF"}}/> : <FileFilled style={{fontSize:"32px", color:"#4DA1FF"}}/>
  const linkStyle = isLoading ? "attachment-link forbidden" : "attachment-link" 

  return (
    <>
      <a  
        className={linkStyle} 
        href={downloadURL} // ссылка возвращаемая firebase'ом для скачивания из storage.
        // download={attachment.name} // не работает, т.к. файл не скачен в браузер или не находится на данном сайте. 
        target="_blank" 
        rel='noreferrer' 
      >
        <div className="attachment-container">
          {icon}
          <div className="attachment-info">
            <p className="attachment-info__name">{attachment.name}</p>
            <p className="attachment-info__size">{attachment.weight}</p>
          </div>
        </div>
      </a>
    </>
    
  );
};

export default Attachment;
