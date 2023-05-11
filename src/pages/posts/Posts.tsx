import React, { lazy, memo, useState } from 'react'
import { Button, Space } from 'antd';
import Loadable from '../../components/Loadable';

const CreatePost = Loadable(lazy(() => import('./CreatePost')));
const InfinityList = Loadable(lazy(() => import('./InfinityList')));
const PostListPaginated = Loadable(lazy(() => import('./PostListPaginated')));
const PostPreview = Loadable(lazy(() => import('./PostPreview')));
const InitialPost = Loadable(lazy(() => import('./InitialPost')));



const Posts: React.FC = () => {

  console.log('[RENDER] - Initial Posts');

  const [currentPage, setCurrentPage] = useState<React.ReactNode>();

  return (
    <>
      <Space direction="vertical" size="middle">
          <InitialPost setCurrentPage={setCurrentPage} />
          {currentPage}
      </Space>
    </>
  )
}

export default Posts;