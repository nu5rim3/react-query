import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Space, message } from 'antd';
import Button from 'antd/es/button';
import Card from 'antd/es/card';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Title from 'antd/es/typography/Title';
import React from 'react'
import { createPost } from '../../services/posts';
import PostPreview from './PostPreview';

interface CreatePostProps {
    setCurrentPage: (component: React.ReactNode) => void
}

const CreatePost: React.FC<CreatePostProps> = ({ setCurrentPage }) => {

    console.log('[REANDER] - Initial CreatePost');
    const [form] = Form.useForm();

    const queryClient = useQueryClient()
    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: data => {
            queryClient.setQueryData(["posts", data.id], data)
            queryClient.invalidateQueries(["posts"], { exact: true })
            setCurrentPage(<PostPreview id={data.id} />);
            message.success('Submit success!');
        },
    })

    const onFinish = () => {
        createPostMutation.mutate(form.getFieldsValue())
    };

    return (
        <div>
            <Title level={3}>Create New Post</Title>
            <Space direction="vertical" size="middle">
                <Card
                    style={{ width: 300, marginTop: 5, paddingTop: 20 }}
                >
                    <Form

                        layout="horizontal"
                        form={form}
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item label="Title" name="title">
                            <Input name='title' placeholder="Title Here" />
                        </Form.Item>
                        <Form.Item label="Body" name="body">
                            <Input name='body' placeholder="Body Here" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={createPostMutation.status === 'loading'}>Submit</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Space>
        </div>
    )
}

export default CreatePost;
