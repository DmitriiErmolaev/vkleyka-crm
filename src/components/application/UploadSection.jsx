import React, {useState, useContext} from 'react';
import { Upload, Button , Row, Col  } from 'antd';
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
import { ProgramContext } from '../../models/context';
import { openNotification } from '../../models/notification/notification';
const { Title } = Typography;

const allowedFileTypes = ["application/pdf",]

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
  const APPLICATION_REF = getAppRefById(appId);
  const {notificationApi} = useContext(ProgramContext)

  const handleClick = (e) => {
    setClickedButton(e.currentTarget.dataset.doctype)
  }

  const beforeUpload = (file, _filelist) => {
    setUploadButtonIsDisabled(true)
    if(!allowedFileTypes.includes(file.type)) {
      openNotification(notificationApi, "error", "uploadFile")
      setUploadButtonIsDisabled(false)
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
        openNotification(notificationApi, "success", 'deleteUploadedFile')
      } catch(e) {
        console.log(e)
        openNotification(notificationApi, "error", 'deleteUploadedFile')
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
      openNotification(notificationApi, "success", "uploadFile")
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
      <Typography>
        <Title level={5}>
          Готовые документы:
        </Title>
      </Typography>
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
                size: [200, 4], 
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
          <div style={{margin:"0"}}> {/* margin для upload, чтобы между Row элементами был видимый отступ */}
            <Upload
              disabled={uploadButtonIsDisabled}
              progress={{
                strokeColor: {
                  '0%': '#108ee9',
                  '100%': '#87d068',
                },
                size: [200, 4],
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
    </div>
  );
};

export default UploadSection;
