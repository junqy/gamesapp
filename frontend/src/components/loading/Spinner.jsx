import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const spinIcon = (
    <LoadingOutlined
        style={{
            fontSize: 32,
        }}
        spin
    />
);

function Spinner() {
  return (
    <Spin indicator={spinIcon} />
  )
}

export default Spinner