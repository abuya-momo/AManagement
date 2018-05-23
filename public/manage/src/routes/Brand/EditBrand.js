import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
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

@connect(({ brand, loading }) => ({
  brand: brand,
  submitting: loading.effects['brand/submitEditBrand'],// loading.effects是对应函数的返回值
  loading: loading.effects['brand/fetchBrand']
}))
@Form.create() // 创建form对象到props
export default class EditBrand extends Component {
  state = {
    brandId: null,
  }

  componentDidMount () {
    console.log('componentDidMount');
    this.setState({
      brandId: this.props.match.params.id,
    });
    this.props.dispatch({
      type: 'brand/fetchBrand',
      payload: this.props.match.params.id,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('validateFieldsAndScroll Test');
      console.log(values);
      if (!err) {
        console.log('validateFieldsAndScroll dispatch');
        this.props.dispatch({
          type: 'brand/submitEditBrand',
          payload: {
            ...values,
            id: this.state.brandId,
          },
        });
      }
    });
  };

  render() {
    const { brand, submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    console.log(brand);

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
        title="修改品牌信息"
        content=""
      >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="品牌名称">
              {getFieldDecorator('brand_name', {
                initialValue: brand.brand_name,
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
                initialValue: brand.slogan,
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
                initialValue: brand.brand_description,
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
