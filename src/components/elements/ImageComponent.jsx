import React, {useState, useEffect} from 'react';
import { Image, Alert } from 'antd';
import { getFileRef } from '../../models/firebase';
import { getFileUrl } from '../../models/applications/applications';

const ImageComponent = ({path}) => {
  const [imgUrl, setImgUrl] = useState(null);  

  useEffect(() => {
    if(!path) {
      return;
    }

    const fentchData = async () => {
      const imgUrl = await getFileUrl(getFileRef(path));
      console.log(imgUrl)
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

export default ImageComponent;