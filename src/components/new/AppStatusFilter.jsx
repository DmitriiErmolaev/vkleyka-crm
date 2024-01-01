import { Radio } from 'antd';
import React from 'react';
import { statusFulterButtonsConfig } from '../../modules/Applications/helpers/statusFulterButtonsConfig';

const AppStatusFilter = ({selectedStatus, statusChange}) => {
  return (
    <Radio.Group
      optionType="button"
      value={selectedStatus}
      onChange={statusChange}
      size="large"
    >
      <Radio value="allStatuses">Все</Radio>
      <Radio value={statusFulterButtonsConfig.new.value}>{statusFulterButtonsConfig.new.text}</Radio>
      <Radio value={statusFulterButtonsConfig.inProgress.value}>{statusFulterButtonsConfig.inProgress.text}</Radio>
      <Radio value={statusFulterButtonsConfig.finished.value}>{statusFulterButtonsConfig.finished.text}</Radio>
    </Radio.Group>
  );
};

export default AppStatusFilter;
