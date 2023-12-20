import { Spin } from 'antd';
import React from 'react';
import '../../assets/loading.scss';


const Spinner = () => {
  return (
    <div className="loading">
      <div className="loading__spinner">
        <Spin />
      </div>
      <p className="loading__text">
        Загрузка...
      </p>
    </div>
  );
};

export default Spinner;