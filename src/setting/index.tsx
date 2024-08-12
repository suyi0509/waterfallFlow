import { Button, Form, Slider, Space, InputNumber, Radio, Modal } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import './index.scss';
import { useEffect, useState } from 'react';

// 列数 2 - 3 -4 -5 -6
// 个数
// 横向纵向

interface IProps {
  onSubmit: (values: any) => void;
}

const options = [
  { label: '横向', value: 'row' },
  { label: '纵向', value: 'col' },
];

const Setting = (props: IProps) => {
  const { onSubmit } = props;
  const [form] = Form.useForm();
  const [mediaType, setMediaType] = useState('PC');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 600) {
      setMediaType('h5');
    }
  }, []);

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };

  const renderForm = () => {
    return (
      <Form
        className='form'
        name='validate_other'
        {...formItemLayout}
        onFinish={onSubmit}
        initialValues={{
          number: 30,
          col: 4,
          direction: 'row',
        }}
        form={form}
      >
        <Form.Item name='col' label='列数'>
          <Slider min={1} max={10} />
        </Form.Item>
        <Form.Item name='number' label='个数'>
          <InputNumber min={1} max={999} />
        </Form.Item>
        <Form.Item name='direction' label='方向'>
          <Radio.Group options={options} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 12 }}>
          <Space>
            <Button
              type='primary'
              htmlType='submit'
              onClick={() => setIsModalOpen(false)}
            >
              保存
            </Button>
            <Button htmlType='reset'>重置</Button>
          </Space>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div className='setting_box'>
      <div className='title'>
        设置项
        <SettingOutlined
          onClick={() => {
            mediaType === 'h5' && setIsModalOpen(true);
          }}
          style={{ color: '#1677ff', marginLeft: '8px' }}
        />
      </div>
      {mediaType === 'h5' ? (
        <Modal
          open={isModalOpen}
          footer={null}
          onCancel={() => setIsModalOpen(false)}
        >
          {isModalOpen && renderForm()}
        </Modal>
      ) : (
        renderForm()
      )}
    </div>
  );
};

export default Setting;
