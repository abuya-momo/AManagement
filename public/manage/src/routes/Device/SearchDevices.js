import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';
import StandardTableA from 'components/StandardTableA';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './SearchDevices.less';

const FormItem = Form.Item;
const { Option } = Select;
const { Description } = DescriptionList;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['已解绑', '绑定中', '其他'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ device, loading }) => ({
  device,
  loading: device.loading,
}))
@Form.create()
export default class SearchDevices extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    pagination: {
      total: 0,
      pageSize: 5,
      current: 1,
    },
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {

  }

  handleStandardTableAChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    // e.preventDefault();
    //
    // console.log('handleSearch');
    //
    // const { dispatch, form } = this.props;
    //
    // form.validateFields((err, fieldsValue) => {
    //   if (err) return;
    //
    //   console.log('fieldsValue');
    //   console.log(fieldsValue);
    //
    //   const values = {
    //     ...fieldsValue,
    //     updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
    //   };
    //
    //   this.setState({
    //     formValues: values,
    //   });
    //
    //   dispatch({
    //     type: 'rule/fetch',
    //     payload: values,
    //   });
    // });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: 'rule/add',
      payload: {
        description: fields.desc,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  };

  searchDeviceInfo (param, paramType) {
    console.log(param);
    this.props.dispatch({
      type: 'device/fetchDeviceInfo',
      payload: {
        param: param,
        paramType: paramType,
      },
    });
  }

  handleSearchByIdentifier () {
    this.props.form.validateFields((err, values) => {
      if (err) return;
      console.log(values);
      this.searchDeviceInfo(values.param, 'identifier_number');
    });
  }

  handleSearchByMac () {
    this.props.form.validateFields((err, values) => {
      if (err) return;
      this.searchDeviceInfo(param, 'mac');
    });
  }

  renderSimpleForm () {
    console.log('renderSimpleForm');
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="设备序列号/Mac地址">
              {getFieldDecorator('param', {
                rules: [{
                  required: true,
                  message: '请输入查询条件'
                }]
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" key="1" onClick={()=>{this.handleSearchByIdentifier();}} style={{ marginRight: 20 }}>
                查询序列号
              </Button>
              <Button type="primary" key="2" htmlType="submit" onClick={()=>{
                this.handleSearchByMac();
              }}>
                查询Mac地址
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { device, loading } = this.props;
    const { selectedRows, modalVisible } = this.state;

    console.log(device);

    const listData = {
      list: device.binded_users,
      pagination: {
        ...this.state.pagination,
        total: device.binded_users ? device.binded_users.length : 0,
      },
    }

    const columns = [
      {
        title: '用户id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '小米id',
        dataIndex: 'mi_id',
        key: 'mi_id',
      },
      {
        title: '用户名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '绑定时间',
        dataIndex: 'bind_time',
        key: 'bind_time',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '绑定状态',
        dataIndex: 'if_binding',
        key: 'if_binding',
        filters: [
          {
            text: status[0],
            value: 0,
          },
          {
            text: status[1],
            value: 1,
          },
        ],
        onFilter: (value, record) => record.status.toString() === value,
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '解绑时间',
        dataIndex: 'unbind_time',
        key: 'unbind_time',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
    ];

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout title="设备信息查询" content="可以查询到已经入网的设备信息及历史绑定用户">
        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="查询结果" style={{ marginBottom: 32 }}>
            <Description key="1" term="设备id">{device.id}</Description>
            <Description key="2" term="设备型号">{device.model}</Description>
            <Description key="3" term="设备型号">{device.type_name}</Description>
            <Description key="4" term="Mac地址">{device.mac}</Description>
            <Description key="5" term="序列号">{device.identifier_number}</Description>
            <Description key="6" term="绑定次数">{device.count ? device.count + '' : ''}</Description>
            <Description key="7" term="开机时间">{device.start_time}</Description>
            <Description key="8" term="状态">{device.state == 31 ? '未绑定' : '绑定中'}</Description>
          </DescriptionList>
          <div className={styles.tableList}>
            <StandardTableA
              selectedRows={selectedRows}
              loading={loading}
              data={listData}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableAAAChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderLayout>
    );
  }
}
