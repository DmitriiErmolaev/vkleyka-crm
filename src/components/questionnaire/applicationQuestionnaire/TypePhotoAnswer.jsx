import React, {useState, useEffect} from 'react';
import { Image, Alert } from 'antd';
import { getFileRef } from '../../../models/firebase';
import { getFileUrl } from '../../../models/applications/applications';

const TypePhotoAnswer = ({questionData}) => {
  const [imgUrl, setImgUrl] = useState(null);  
  const path = questionData.response;

  useEffect(() => {
    // TODO: передать imgUrl сразу в инфо карту. А пока нет данных - показать скелетон.
    if(!path) {
      return;
    }
    // в эффекте можно объявить функцию и тут же вызвать
    const fentchData = async () => {
      const imgUrl = await getFileUrl(getFileRef(path));
      setImgUrl(imgUrl)
    }

    fentchData()
  }, [path])

  if(!path) {
    return <Alert message={"Изображение не загружено!"} type={"warning"} showIcon/>
  }

  return (
    <Image
      width={100}
      src={imgUrl}
     />
  );
};

export default TypePhotoAnswer;
