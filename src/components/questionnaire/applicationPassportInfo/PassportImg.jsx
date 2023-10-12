import { getDownloadURL } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { getFileRef } from '../../../models/firebase';
import { Image } from 'antd';

const PassportImg = ({path}) => {
  const [url, setUrl] = useState();

  useEffect(() => {
    const func = async () => {
      const url = await getDownloadURL(getFileRef(path));
      setUrl(url)
    }
    func()
  },[])

  return (
    <Image
      width={50}
      src={url}
    />
  );
};

export default PassportImg;