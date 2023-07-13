import React, {useRef, useState} from 'react';
import { Space, Upload, Button, notification   } from 'antd';
import { uploadBytesResumable, ref } from 'firebase/storage';
import { storage } from '../../models/firebase';
import { UploadOutlined } from '@ant-design/icons';
import { storageDocumentsPath } from '../../models/client_files/files';
import { getFileRef } from '../../models/firebase';  
import { Typography } from 'antd';
import { updateDocField } from '../../models/data-processing';
import { getAppRefById } from '../../models/applications/applications';
import { getPercent } from '../../models/data-processing';
import { getNewFileExtraProps } from '../../models/client_files/files';
import { getUploadedDocsInfo } from '../../models/client_files/files';
const { Title } = Typography;



const allowedFileTypes = ["application/pdf",]

const config = {
  placement: "topRight",
  top: "24px",

}

const notificationMessages = {
  error: {
    title: 'Ошибка',
    description: 'Неверный формат файла. Допустима загрузка файлов только в формате ".pdf" '
  },
  success: {
    title: 'Успех',
    description: 'Файл успешно загружен',
  } 
}


const UploadSection = ({appId, uploadedDocs}) => {
  const makeInitialFilesExtraProps = () => {
    // Для первого отображения уже загруженных документов. После загрузки нового файла отображаться
    if(uploadedDocs.length === 0) {
      return {};
    } 

    let curApplicationFileExtraProps = {};
    let curAppointmentFileExtraProps = {};
    uploadedDocs.forEach( uploadedDoc => {
      if(uploadedDoc.key === "application"){
        curApplicationFileExtraProps = {
          name: uploadedDocs[0].name, 
          status:"done",
        }
      }
      if(uploadedDoc.key === "appointment"){
        curAppointmentFileExtraProps = {
          name: uploadedDocs[1].name, 
          status:"done",
        }
      }
    })
 
    return  {
      application: [curApplicationFileExtraProps], 
      appointment: [curAppointmentFileExtraProps],
    }
  }
  
 

  const [fileList, setFileList] = useState(makeInitialFilesExtraProps);
  const [uploadButtonIsDisabled, setUploadButtonIsDisabled] = useState(false)
  const [clickedButton, setClickedButton] = useState(null);
  const [api, contextHolder] = notification.useNotification()

  const APPLICATION_REF = getAppRefById(appId);
 
  const openNotification = (type) => {
    api[type]({
      placement: "topRight",
      message: notificationMessages[type].title,   
      description:notificationMessages[type].description,
    })
  }

  const handleClick = (e) => {
    setClickedButton(e.currentTarget.dataset.doctype)
  }

  const beforeUpload = (file, filelist) => {
    setUploadButtonIsDisabled(true)
    if(!allowedFileTypes.includes(file.type)) {
      openNotification("error")
      return Upload.LIST_IGNORE
    }
    return false
    // предотвращает загрузку через action формы upload, т.к. у нас кастомная загрузка
  }

  const handleUploadChange  = async (uploadInfo) => {
    const newFileName = uploadInfo.file.name;
    
    const uploadResult = uploadBytesResumable(getFileRef(`${storageDocumentsPath.visaDocuments}/${appId}-${Date.now()}.pdf`), uploadInfo.file);
    uploadResult.on('state_changed', (snapshot) => {
      const percentTransferred = getPercent(snapshot.bytesTransferred, snapshot.totalBytes);
      const newFileExtraProps = getNewFileExtraProps(newFileName, "uploading", percentTransferred);
      setFileList((prev) => {
        return {...prev, [clickedButton]:[{...uploadInfo.file, ...newFileExtraProps}]}
      })
    }, error => {
      // TODO: обработать ошибки.
    }, async (complete) => {
      const options = {
        docType: clickedButton, 
        uploadPath: uploadResult.snapshot.metadata.fullPath, 
        fileName: newFileName,
      }
      
      const uploadedDocsInfo = getUploadedDocsInfo(uploadedDocs, options )
     
      console.log(uploadedDocsInfo)
      await updateDocField(APPLICATION_REF, "preparedInformation.documents", uploadedDocsInfo)
      

      const newFileExtraProps = getNewFileExtraProps(newFileName, "done");
      setFileList((prev) => {
        return {...prev, [clickedButton]: [newFileExtraProps]}
      })
      openNotification("success")
      setClickedButton(null)
      setUploadButtonIsDisabled(false) 
      // используемые методы: setDataToDownloadFile, updateDocField.
    })
  }

  return (
    <div>
      {contextHolder}
      <Typography>
        <Title level={5}>
          Готовые документы:
        </Title>
      </Typography>
      <Space style={{flexDirection:"column"}}>
        <Upload 
          disabled={uploadButtonIsDisabled}
          progress={{
            strokeColor: {
              '0%': '#108ee9',
              '100%': '#87d068',
            },
            strokeWidth: 4, 
            showInfo: true,
            format: (percent) => `${percent}%`,
          }}
          fileList={fileList.application}
          maxCount={1}
          accept=".pdf, application/pdf"
          beforeUpload={beforeUpload}
          onChange={handleUploadChange}
        >
          <Button disabled={uploadButtonIsDisabled} onClick={handleClick} data-doctype="application" icon={<UploadOutlined/>}>Анкета &#40;консульство&#41;:</Button>
        </Upload> 
        <Upload
          disabled={uploadButtonIsDisabled}
          progress={{
            strokeColor: {
              '0%': '#108ee9',
              '100%': '#87d068',
            },
            strokeWidth: 4, 
            showInfo: true,
            format: (percent) => `${percent}%`,
          }}
          fileList={fileList.appointment}
          maxCount={1}
          accept=".pdf, application/pdf"
          beforeUpload={beforeUpload}
          onChange={handleUploadChange}
        >
          <Button disabled={uploadButtonIsDisabled} onClick={handleClick} data-doctype="appointment" icon={<UploadOutlined/>}>Запись в консульство:</Button>
        </Upload>
      </Space> 
    </div>
  );
};



export default UploadSection;

