import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Upload,
  Modal,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import PicturesWall from '../../components/PicturesWall';
import styles from './style.less';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['deviceType/submitAddDeviceType'],// loading.effects是对应函数的返回值
}))
@Form.create() // 创建form对象到props
export default class AddManager extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('validateFieldsAndScroll Test');
      console.log(values);
      if (!err) {
        console.log('validateFieldsAndScroll dispatch');
        this.props.dispatch({
          type: 'deviceType/submitAddDeviceType',
          payload: values,
        });
      }
    });
  };
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 20, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout
        title="添加管理员"
        content="分配特定品牌的管理员账号，设置密码"
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="管理员姓名">
              {getFieldDecorator('model', {
                rules: [
                  {
                    required: true,
                    message: '请输入设备型号(英文)',
                  },
                ],
              })(<Input placeholder="请输入设备型号（英文）" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="品牌">
              {getFieldDecorator('type_name')(
                <Select
                  showSearch
                  placeholder="请选择品牌"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="1">同事甲</Option>
                  <Option value="2">同事乙</Option>
                  <Option value="3">同事丙</Option>
                </Select>)}
            </FormItem>
            <FormItem {...formItemLayout} label="初始密码">
              {getFieldDecorator('model', {
                rules: [
                  {
                    required: true,
                    message: '请输入设备型号(英文)',
                  },
                ],
              })(<Input placeholder="请输入设备型号（英文）" />)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>取消</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
