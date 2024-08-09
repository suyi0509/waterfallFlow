import { Button, Form, Slider, Space, InputNumber, Radio } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import './index.scss';

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

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };
  return (
    <div className='setting_box'>
      <div className='title'>
        设置项
        <SettingOutlined style={{ color: '#1677ff', marginLeft: '8px' }} />
      </div>
      <Form
        name='validate_other'
        {...formItemLayout}
        onFinish={onSubmit}
        initialValues={{
          number: 30,
          col: 4,
          direction: 'row',
        }}
      >
        <Form.Item name='col' label='列数'>
          <Slider tooltip={{ open: true }} min={1} max={10} />
        </Form.Item>
        <Form.Item name='number' label='个数'>
          <InputNumber min={1} max={999} />
        </Form.Item>
        <Form.Item name='direction' label='方向'>
          <Radio.Group options={options} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 12 }}>
          <Space>
            <Button type='primary' htmlType='submit'>
              保存
            </Button>
            <Button htmlType='reset'>重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Setting;
