import React, { useState } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const TodoForm = ({ onSubmit, initialValues = {} }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  const handleSubmit = (values) => {
    if (file) {
      values.image = file;
    }
    onSubmit(values);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Form
      form={form}
      name="todo_form"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Form.Item name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item name="description">
        <Input.TextArea placeholder="Description" />
      </Form.Item>
      <Form.Item name="tags">
        <Input placeholder="Tags (comma separated)" />
      </Form.Item>
      <Form.Item name="image" valuePropName="fileList" getValueFromEvent={normFile}>
        <Upload name="image" listType="picture" beforeUpload={() => false} onChange={(info) => setFile(info.file)}>
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TodoForm;
