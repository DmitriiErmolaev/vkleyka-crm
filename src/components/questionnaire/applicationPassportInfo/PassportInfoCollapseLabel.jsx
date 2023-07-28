import React from 'react';
import {Row, Col} from "antd";

const PassportInfoCollapseLabel = ({appId, passportsLength}) => {
  return (
    <Row gutter={8} align="middle">
      <Col>
        <div className="person__title">
          Заявка {appId}
        </div>
      </Col>
      <Col>
        <div className="person__applicants-num">
          количество заявителей: {passportsLength}
        </div>
      </Col>
    </Row>
  );
};

export default PassportInfoCollapseLabel;
