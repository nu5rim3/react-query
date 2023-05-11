import { Space, Spin } from 'antd'
import React from 'react'

const Loader = () => {
  return (
      <Space align={"center"}>
          <Spin size="large" />
      </Space>
  )
}

export default Loader