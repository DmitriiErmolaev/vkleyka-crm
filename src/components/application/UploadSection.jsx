import React, {useState} from 'react';
import { Upload, Button, notification , Row, Col  } from 'antd';
import { uploadBytesResumable } from 'firebase/storage';
import { UploadOutlined } from '@ant-design/icons';
import { storageDocumentsPath } from '../../models/client_files/files';
import { getFileRef } from '../../models/firebase';  
import { Typography } from 'antd';
import { updateDocField } from '../../models/data-processing';
import { getAppRefById } from '../../models/applications/applications';
import { getPercent } from '../../models/data-processing';
import { getNewFileExtraProps } from '../../models/client_files/files';
import { getNewUploadedDocs } from '../../models/client_files/files';
import { deleteObject } from 'firebase/storage';
const { Title } = Typography;


const allowedFileTypes = ["application/pdf",]
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
    // Refactor: Для первого отображения уже загруженных документов. После загрузки нового файла эти данные перезапишутся
    if(uploadedDocs.length === 0) {
      return {};
    } 
    let obj = {};
    uploadedDocs.forEach(doc => {
      obj[doc.key] = [{name:doc.name, status:"done", uid:doc.key }]
    })
    return obj
  }
  
  const [fileListState, setFileListState] = useState(makeInitialFilesExtraProps);
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
    const newFileExtraProps = getNewFileExtraProps(file.name, "uploading", clickedButton);
    setFileListState({...fileListState, [clickedButton]:[{newFileExtraProps}]});
    return false;
  }

  const handleUploadChange  = async (uploadInfo) => {
    // удаление---------------------------------------------------
    if(uploadInfo.file.status === "removed") {
      const docIndex = uploadedDocs.findIndex(doc => { // индекс всегда должен быть найден, т.к. мы удаляем документ который точно был загружен
        return doc.key === uploadInfo.file.uid;
      })
      const storageFileRef = getFileRef(uploadedDocs[docIndex].link);
      try {
        await deleteObject(storageFileRef)
      } catch(e) {
        console.log(e)
        // TODO: нотификация 
        // Firebase Storage: Object 'documents/hJ1goDbnR8C8OMygvtm2-1690235227709.pdf' does not exist. (storage/object-not-found) - пример.
      }

      const options = {
        docType: uploadInfo.file.uid, 
        uploadPath: null, 
        fileName: null,
      }

      const newUploadedDocs = getNewUploadedDocs(uploadedDocs, options);
      updateDocField(APPLICATION_REF, "preparedInformation.documents", newUploadedDocs);    
      return
    }
    // загрузка в storage---------------------------------------------------
    const newFileName = uploadInfo.file.name;
   
    const uploadResult = uploadBytesResumable(getFileRef(`${storageDocumentsPath.visaDocuments}/${appId}-${Date.now()}.pdf`), uploadInfo.file);
    uploadResult.on('state_changed', (snapshot) => {
      const percentTransferred = getPercent(snapshot.bytesTransferred, snapshot.totalBytes);
      const newFileExtraProps = getNewFileExtraProps(newFileName, "uploading", clickedButton, percentTransferred );
      setFileListState({...fileListState, [clickedButton]:[newFileExtraProps]});
    }, error => {
      // TODO: обработать ошибки.
    }, async () => {

    // загрузка в бд---------------------------------------------------
      const options = {
        docType: clickedButton, 
        uploadPath: uploadResult.snapshot.metadata.fullPath, 
        fileName: newFileName,
      }
      
      const newUploadedDocs = getNewUploadedDocs(uploadedDocs, options )
      await updateDocField(APPLICATION_REF, "preparedInformation.documents", newUploadedDocs)
      const newFileExtraProps = getNewFileExtraProps(newFileName, "done", clickedButton);
      setFileListState({...fileListState, [clickedButton] : [newFileExtraProps]})
      openNotification("success")
      setClickedButton(null)
      setUploadButtonIsDisabled(false) 
    })
  }

  const handleDelete = (file) => {
    const updatedFileList = {...fileListState, [file.uid]:[]};
    setFileListState(updatedFileList);
  }

  return (
    <div>
      {contextHolder}
      <Typography>
        <Title level={5}>
          Готовые документы:
        </Title>
      </Typography>
      {/* <Space direction="vertical"> */}
      <Row>
        <Col span={12}>
          <div style={{margin:"8px 0"}}>
            <Upload 
              disabled={uploadButtonIsDisabled}
              progress={{
                strokeColor: {
                  '0%': '#108ee9',
                  '100%': '#87d068',
                },
                size: [200,4], 
                showInfo: true,
                format: (percent) => `${percent}%`,
              }}
              fileList={fileListState.application}
              maxCount={1}
              accept=".pdf, application/pdf"
              beforeUpload={beforeUpload}
              onChange={handleUploadChange}
              onRemove={handleDelete}
            >
              <Button disabled={uploadButtonIsDisabled} onClick={handleClick} data-doctype="application" icon={<UploadOutlined/>}>Анкета &#40;консульство&#41;:</Button>
            </Upload> 
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div style={{margin:"8px 0"}}> {/* margin для upload, чтобы между Row элементами был видимый отступ */}
            <Upload
              disabled={uploadButtonIsDisabled}
              progress={{
                strokeColor: {
                  '0%': '#108ee9',
                  '100%': '#87d068',
                },
                size: [200,4],
                showInfo: true,
                format: (percent) => `${percent}%`,
              }}
              fileList={fileListState.appointment}
              maxCount={1}
              accept=".pdf, application/pdf"
              beforeUpload={beforeUpload}
              onChange={handleUploadChange}
              onRemove={handleDelete}
            >
              <Button disabled={uploadButtonIsDisabled} onClick={handleClick} data-doctype="appointment" icon={<UploadOutlined/>}>Запись в консульство:</Button>
            </Upload>
          </div>
        </Col>
      </Row>
        
        
        
        
      {/* </Space>  */}
    </div>
  );
};

export default UploadSection;
