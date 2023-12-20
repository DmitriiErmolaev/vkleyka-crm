import React, {useState, useEffect} from 'react';
import { Image, Alert } from 'antd';
import { getFileRef } from '../../../models/firebase';
import { getFileUrl } from '../../../models/applications/applications';
import { getDownloadURL } from 'firebase/storage';

const TypePhotoAnswer = ({questionData}) => {
  const [imgUrl, setImgUrl] = useState(null);
  const path = questionData.response;

  useEffect(() => {
    if(path) {
      const func = async () => {
        const url = await getDownloadURL(getFileRef(path));
        setImgUrl(url)
      }
      func()
    }
  }, [path])

  // useEffect(() => {
  //   // TODO: передать imgUrl сразу в инфо карту. А пока нет данных - показать скелетон.
  //   if(!path) {
  //     return;
  //   }
  //   // в эффекте можно объявить функцию и тут же вызвать
  //   const fentchData = async () => {
  //     const imgUrl = await getFileUrl(getFileRef(path));
  //     setImgUrl(imgUrl)
  //   }

  //   fentchData()
  // }, [path])

  if(!path) {
    return <Alert message={"Изображение не загружено!"} type={"warning"} showIcon/>
  }

  return (
    <Image
      width={50}
      src={imgUrl}
     />
  );
};

export default TypePhotoAnswer;
