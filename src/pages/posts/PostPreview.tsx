import { useQuery } from '@tanstack/react-query'
import React, { memo } from 'react'
import { getPost } from '../../services/posts'
import { getUser } from '../../services/users'
import Space from 'antd/es/space'
import Card from 'antd/es/card'
import Skeleton from 'antd/es/skeleton'
import Avatar from 'antd/es/avatar'
import Loader from '../../components/Loader'

interface PostPreviewPorps {
    id: number
}

const { Meta } = Card;

const PostPreview: React.FC<PostPreviewPorps> = memo(({ id }) => {

    console.log('[RENDER] - Initial PostPreview');

    const postQuery = useQuery({
        queryKey: ["posts", id],
        queryFn: () => getPost(id),
    })

    const userQuery = useQuery({
        queryKey: ["users", postQuery?.data?.userId],
        enabled: postQuery?.data?.userId != null,
        queryFn: () => getUser(postQuery.data.userId),
    })

    if (postQuery.status === "loading") return <Loader />
    if (postQuery.status === "error") {
        return <h1>{JSON.stringify(postQuery.error)}</h1>
    }

    return (
        <>
            <Space direction="vertical" size="middle">
                <Card
                    style={{ width: 300, marginTop: 5 }}
                >
                        <Meta
                        avatar={<Avatar src={`https://i.pravatar.cc/150?img=${id}`} />}
                            title={postQuery.data.title}
                            description={postQuery.data.body}
                        />
                    <small>
                        {userQuery.isLoading
                            ? "Loading User..."
                            : userQuery.isError
                                ? "Error Loading User"
                                : userQuery.data.name}
                    </small>
                </Card>
            </Space>
        </>
    )
});

export default PostPreview;