import React, {useState, useContext, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import { Upload, Button, Typography } from 'antd';
import { uploadBytesResumable } from 'firebase/storage';
import { UploadOutlined } from '@ant-design/icons';
import { getFileRef } from '../../../firebase/firebase';  
import { updateUploadedFilesInfo } from '../firebase/updateUploadedFilesInfo';
import { getUpdatedExtraFileList } from '../helpers/getUpdatedExtraFileList';
import { storageDocumentsPath } from '../firebase/storageDocumentsPath';
import { getArrayWithUpdatedPropById } from '../helpers/getArrayWithUpdatedPropById';
import { updateUploadPath } from '../helpers/updateUploadPath';
import { deleteUploadedFile } from '../firebase/deleteUploadedFile';
import { getUploadedFileDownloadURL } from '../firebase/getUploadedFileDownloadURL';

import { getAppRefById } from '../../../firebase/applications/getAppRefById';
import { getPercent } from '../../../utils/getPercent';
import { ProgramContext, ApplicationStatus } from '../../../models/context';
import { openNotification } from '../../../models/notification/notification';
import '../../../assets/upload-section.scss';
import showNotification from '../../NotificationService/helpers/showNotification';
const { Title } = Typography;

const Documents = ({uploadedDocs}) => {
  const createExtraFileList = useCallback(() => {
    //Для первого отображения уже загруженных документов.
    if(uploadedDocs.length === 0) {
      return [];
    }

    return uploadedDocs.map(doc => {
      return {name:doc.name, status:'done', uid:doc.uid, url: doc.downloadURL}
    })
  }, [uploadedDocs]);

  const [ fileListState, setFileListState ] = useState(createExtraFileList);
  const [ uploadButtonIsDisabled, setUploadButtonIsDisabled ] = useState(false);
  const [ deletingFile, setDeletingFile ] = useState(false);
  const { curAppStatus } = useContext(ApplicationStatus);
  const { notificationAPI } = useContext(ProgramContext)
  const { appId } = useParams();
  const APPLICATION_REF = getAppRefById(appId);

  useEffect(() => {
    setFileListState(createExtraFileList);
  }, [uploadedDocs, createExtraFileList])

  // useEffect(() => {
  //   if (curAppStatus === 2) setUploadButtonIsDisabled(true);
  // }, [curAppStatus])

  let newUploadedFilesInfo = [];
  let promises = [];
  let newfilesInfoReady = uploadedDocs.length;

  const handleDelete = async (file) => {
    try {
      setDeletingFile(true);
      await deleteUploadedFile(uploadedDocs, file.uid, APPLICATION_REF)
      setFileListState((prev) => prev.filter(fileInfo => fileInfo.uid !== file.uid ))
      // openNotification(notificationAPI, "success", 'deleteUploadedFile')
      showNotification(notificationAPI, 'process', {processName: 'deleteUploadedFile', status: 'success',})

    } catch(e) {
      console.log(e)
      // openNotification(notificationAPI, "error", 'deleteUploadedFile')
      showNotification(notificationAPI, 'process', {processName: 'deleteUploadedFile', status: 'error',})

      // Firebase Storage: Object 'documents/hJ1goDbnR8C8OMygvtm2-1690235227709.pdf' does not exist. (storage/object-not-found) - пример.
    } finally {
      setDeletingFile(false);
    }
  }
  // Вызывается для каждого файла из списка
  const beforeUpload = (file, _fileList) => {
    setUploadButtonIsDisabled(true);
    setFileListState((prev) => getUpdatedExtraFileList(prev, file));
    return false; // предотвращает загрузку по адресу - пропс action компонента upload
  }

  // Вызывается для каждого файла из списка при смене статуса файла (Если удаление - только для одного)
  const handleUploadChange  = async (uploadInfo) => {
    // в случае удаления---------------------------------------------------
    if(uploadInfo.file.status === "removed") {
      return;
    }

    // загрузка в storage---------------------------------------------------
    newUploadedFilesInfo.push({name: uploadInfo.file.name, link: '', uid: uploadInfo.file.uid, downloadURL:''})
    const uploadResult = uploadBytesResumable(getFileRef(`${storageDocumentsPath.visaDocuments}/${appId}-${Date.now()}.pdf`), uploadInfo.file);
    promises.push(uploadResult)

    uploadResult.on('state_changed', (snapshot) => {
      const percentTransferred = getPercent(snapshot.bytesTransferred, snapshot.totalBytes);
      setFileListState((prev) => getArrayWithUpdatedPropById(prev, uploadInfo.file.uid, 'percent', percentTransferred ));
    }, error => {
      // TODO: обработать ошибки.
      console.log(error)
    }, async () => {
      newUploadedFilesInfo = updateUploadPath(newUploadedFilesInfo, uploadInfo.file.uid, uploadResult.snapshot.metadata.fullPath)
      const downloadURL = await getUploadedFileDownloadURL(uploadResult.snapshot.metadata.fullPath);
      setFileListState((prev) => getArrayWithUpdatedPropById(prev, uploadInfo.file.uid, 'url', downloadURL ))
      newUploadedFilesInfo = getArrayWithUpdatedPropById(newUploadedFilesInfo, uploadInfo.file.uid, 'downloadURL', downloadURL)
      ++newfilesInfoReady;

      // загрузка информации в БД когда все объекты массива newUploadedFilesInfo будут готовы.
      if (newfilesInfoReady === uploadInfo.fileList.length) {
        try {
          await Promise.all(promises);
          const newUploadedDocs = [...uploadedDocs, ...newUploadedFilesInfo];
          await updateUploadedFilesInfo(APPLICATION_REF, "preparedInformation.documents", newUploadedDocs);
          // openNotification(notificationAPI, "success", "uploadFile")
          showNotification(notificationAPI, 'process', {processName: 'uploadFile', status: 'success',})

          setUploadButtonIsDisabled(false);
        } catch (e) {
          console.log(e)
          // openNotification(notificationAPI, "error", 'deleteUploadedFile');
          showNotification(notificationAPI, 'process', {processName: 'deleteUploadedFile', status: 'error',})

          setUploadButtonIsDisabled(false);
        }
      }
    })
  }

  const uploadPermanentlyDisabled = curAppStatus === 2;

  return (
    <div className="uploaded-documents">
      <Typography>
        <Title level={5}>
          Готовые документы:
        </Title>
      </Typography>
      <div className="uploaded-documents__upload-section">
        <Upload 
          disabled={uploadPermanentlyDisabled || uploadButtonIsDisabled}
          progress={{
            strokeColor: {
              '0%': '#108ee9',
              '100%': '#87d068',
            },
            size: [200, 4], 
            showInfo: true,
            format: (percent) => `${percent}%`,
          }}
          fileList={fileListState}
          multiple
          accept=".pdf, application/pdf"
          beforeUpload={beforeUpload}
          onChange={handleUploadChange}
          onRemove={handleDelete}
          showUploadList={{showRemoveIcon: deletingFile ? false : true }}
        >
          <Button disabled={uploadPermanentlyDisabled || uploadButtonIsDisabled} icon={<UploadOutlined/>}>Загрузить файл</Button>
        </Upload> 
      </div>
    </div>
  );
};

export default Documents;
