import React from 'react';
import {Layout, Space, Button} from "antd";
import '../../assets/apply-or-cancel/apply-or-cancel.scss'
const ApplyOrCancel = ({isEdit, applyChanges, cancelChanges, loading }) => {
  // TODO: приклеить к низу экрана кнопки.
  return isEdit ? (
    <div className='apply-or-cancel'>
      <Space size="large">
        <Button type="primary" onClick={applyChanges} loading={loading} >
          Сохранить
        </Button>
        <Button onClick={cancelChanges} disabled={loading}>
          Отмена
        </Button>
      </Space>
    </div>
  ) : (
    null
  )
};

export default ApplyOrCancel;
