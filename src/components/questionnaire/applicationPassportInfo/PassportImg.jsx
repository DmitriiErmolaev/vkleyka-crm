import { getDownloadURL } from 'firebase/storage';
import React, { memo, useEffect, useState } from 'react';
import { getFileRef } from '../../../models/firebase';
import { Image } from 'antd';
import { getFileUrl } from '../../../models/applications/applications';

const PassportImg = ({path}) => {
  const [url, setUrl] = useState();

  // useEffect(() => {
  //   // TODO: сделать загрузку флага до отображения всей карты. 
  //   getFileUrl(getFileRef(path)).then(res => {
  //     setUrl(res)
  //   })
  // },[])

  useEffect(() => {
    if(path) {
      console.log('u12y3487')
      const func = async () => {
        const url = await getDownloadURL(getFileRef(path));
        setUrl(url)
      }
      func()
    }
  }, [])

  if (!path) {
    return;
  }

  return (
    <Image
      width={100}
      src={url}
    />
  );
};

export default PassportImg;
