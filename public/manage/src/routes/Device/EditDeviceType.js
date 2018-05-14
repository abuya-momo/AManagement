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
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['deviceType/submitEditDeviceType'],// loading.effects是对应函数的返回值
  loading: loading.effects['deviceType/fetchDeviceType']
}))
@Form.create() // 创建form对象到props
export default class EditDeviceType extends PureComponent {
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
        title="添加设备类型"
        content=""
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="型号">
              {getFieldDecorator('model', {
                rules: [
                  {
                    required: true,
                    message: '请输入设备型号(英文)',
                  },
                ],
              })(<Input placeholder="请输入设备型号（英文）" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="宣传型号">
              {getFieldDecorator('type_name', {
                rules: [
                  {
                    required: true,
                    message: '请输入设备型号（中文,，宣传用，可重复）',
                  },
                ],
              })(<Input placeholder="请输入设备型号(中文，宣传用，可重复)" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="上市时间">
              {getFieldDecorator('start_sell_time', {
                rules: [
                  {
                    required: true,
                    message: '请选择上市时间',
                  },
                ],
              })(<DatePicker style={{ width: '100%' }} placeholder={'请选择上市时间'} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={
              <span>
                型号简介<em className={styles.optional}>（选填）</em>
              </span>
            }>
              {getFieldDecorator('type_profile', {
                rules: [
                  {
                    required: false,
                    message: '请输入型号简介',
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="请输入产品特性，系列特性等简介"
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={
              <span>
                型号图片<em className={styles.optional}>（选填）</em>
              </span>
            }>
              <PicturesWall />
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
