import { getDownloadURL } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { getFileRef } from '../../../models/firebase';
import { Image } from 'antd';

const PassportImg = ({path}) => {
  const [url, setUrl] = useState();

  useEffect(() => {
    if(path) {
      const func = async () => {
        const url = await getDownloadURL(getFileRef(path));
        setUrl(url)
      }
      func()
    }
  }, [url, path])
  
  if (!path) {
    return;
  }

  return (
    <Image
      width={50}
      src={url}
    />
  );
};

export default PassportImg;
