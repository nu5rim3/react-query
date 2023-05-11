import { useQuery } from '@tanstack/react-query'
import React, { lazy, useState } from 'react'
import { getPostsPaginated } from '../../services/posts'
import { Button, Card, Skeleton, Space } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import Avatar from 'antd/es/avatar/avatar';
import Loadable from '../../components/Loadable';

const PostPreview = Loadable(lazy(() => import('./PostPreview')));

const { Meta } = Card;

interface PostListPaginatedProps {
    setCurrentPage: (component: React.ReactNode) => void
}

const PostListPaginated: React.FC<PostListPaginatedProps> = ({ setCurrentPage}) => {

    console.log('[RENDER] - Initial PostListPaginated');

    const [page, setPage] = useState<number>(1);

    const { status, error, data, isPreviousData, isLoading } = useQuery({
        queryKey: ["posts", { page }],
        keepPreviousData: true,
        queryFn: () => getPostsPaginated(page),
    })

    // if (status === "loading") return <Loader />
    if (status === "error") return <h1>{JSON.stringify(error)}</h1>

    return (
        <div>
            <Title level={3}>Post List Paginated</Title>
            <Space direction="vertical" size="middle">
                {isLoading &&
                    <Card
                        style={{ width: 300, marginTop: 25 }}
                    >
                        <Skeleton loading avatar active>
                            <Meta
                                avatar={<Avatar src={`https://i.pravatar.cc/150?img=30`} />}
                                title={"sample title"}
                            />
                        </Skeleton>
                    </Card>
                }
                {data?.posts.map((post: any) => (
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
                                />
                            </Skeleton>
                        </Card>
                ))}

                <Space direction='horizontal'>
                    {" "}
                    {data?.previousPage && (
                        <Button onClick={() => setPage(Number(data.previousPage))}>Previous</Button>
                    )}{" "}
                    {data?.nextPage && (
                        <Button onClick={() => setPage(Number(data.nextPage))} loading={isPreviousData}>Next</Button>
                    )}
                </Space>
            </Space>
            
        </div>
    )
}

export default PostListPaginated;