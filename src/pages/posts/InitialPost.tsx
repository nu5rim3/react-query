import Button from 'antd/es/button';
import Space from 'antd/es/space';
import Title from 'antd/es/typography/Title';
import React, { lazy } from 'react';

import Loadable from '../../components/Loadable';

const CreatePost = Loadable(lazy(() => import('./CreatePost')));
const InfinityList = Loadable(lazy(() => import('./InfinityList')));
const PostListPaginated = Loadable(lazy(() => import('./PostListPaginated')));

interface InitialPostProps {
    setCurrentPage: (component: React.ReactNode) => void
}

const InitialPost: React.FC<InitialPostProps> = ({ setCurrentPage }) => {
    return (
        <div>
            <Title level={3}>Welcome to React Query</Title>
            <Space direction="horizontal" size="middle">
                <Button onClick={() => setCurrentPage(<InfinityList setCurrentPage={setCurrentPage} />)}>
                    Infinity
                </Button>
                {" "}
                <Button onClick={() => setCurrentPage(<PostListPaginated setCurrentPage={setCurrentPage} />)}>
                    Pagination
                </Button>
                {" "}
                <Button onClick={() => setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)}>
                    Create Post
                </Button>
            </Space>
        </div>
    )
}

export default InitialPost;