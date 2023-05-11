import { useInfiniteQuery } from '@tanstack/react-query'
import React, { lazy } from 'react'
import { getPostsPaginated } from '../../services/posts'
import { Avatar, Button, Card, Skeleton, Space } from 'antd'
import { EyeOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import Loadable from '../../components/Loadable';
// import PostPreview from './PostPreview';

const PostPreview = Loadable(lazy(() => import('./PostPreview')));

const { Meta } = Card;

interface InfinityListProps {
    setCurrentPage: (component: React.ReactNode) => void
}

const InfinityList: React.FC<InfinityListProps> = ({ setCurrentPage }) => {

    console.log('[RENDER] - Initial InfinityList');

    const {
        isLoading,
        status,
        error,
        data,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ["posts", "infinite"],
        getNextPageParam: (prevData: any) => prevData.nextPage,
        queryFn: ({ pageParam = 1 }) => getPostsPaginated(pageParam),
    })

    if (status === "error") return <h4>{JSON.stringify(error)}</h4>

    return (
        <div>

            <Title level={3}>Post List Infinite</Title>
            <Space direction="vertical" size="middle">
                {isLoading &&
                    <Card
                        style={{ width: 300, marginTop: 25 }}
                    >
                        <Skeleton loading avatar active>
                            <Meta
                                avatar={<Avatar src={`https://i.pravatar.cc/150?img=30`} />}
                                title={"sample title"}
                                description={"sample body"}
                            />
                        </Skeleton>
                    </Card>
                }
                {data?.pages
                    .flatMap(data => data.posts)
                    .map(post => (
                        <Card
                            key={post.id}
                            style={{ width: 300, marginTop: 5 }}
                            actions={[
                                <EyeOutlined
                                    key="view"
                                    alt='view'
                                    onClick={() => {
                                        setCurrentPage(<PostPreview id={post.id} />)
                                    }}
                                />
                            ]}
                        >
                            <Skeleton loading={status !== 'success'} avatar active>
                                <Meta
                                    avatar={<Avatar src={`https://i.pravatar.cc/150?img=${post.id}`} />}
                                    title={post.title}
                                    description={post.body}
                                />
                            </Skeleton>
                        </Card>
                    ))}

                {hasNextPage && (
                    <Button onClick={() => fetchNextPage()} loading={isFetchingNextPage}>
                        Load More
                    </Button>
                )}
            </Space>
        </div>
    )
}

export default InfinityList;