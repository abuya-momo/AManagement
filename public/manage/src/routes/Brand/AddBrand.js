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
  submitting: loading.effects['brand/submitAddBrand'],// loading.effects是对应函数的返回值
}))
@Form.create() // 创建form对象到props
export default class AddBrand extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('validateFieldsAndScroll Test');
      console.log(values);
      if (!err) {
        console.log('validateFieldsAndScroll dispatch');
        this.props.dispatch({
          type: 'brand/submitAddBrand',
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
        title="添加品牌"
        content=""
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="品牌名称">
              {getFieldDecorator('brand_name', {
                rules: [
                  {
                    required: true,
                    message: '请输入品牌名称',
                  },
                ],
              })(<Input placeholder="请输入品牌名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="品牌Slogan">
              {getFieldDecorator('slogan', {
                rules: [
                  {
                    required: true,
                    message: '请输入品牌Slogan',
                  },
                ],
              })(<Input placeholder="请输入一句话的广告语" />)}
            </FormItem>
            <FormItem {...formItemLayout} label={
              <span>
                品牌简介<em className={styles.optional}>（选填）</em>
              </span>
            }>
              {getFieldDecorator('brand_description', {
                rules: [
                  {
                    required: false,
                    message: '请输入型号简介',
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="请输入品牌简介，产品特性，系列特性等简介"
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={
              <span>
                品牌logo<em className={styles.optional}>（选填）</em>
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
