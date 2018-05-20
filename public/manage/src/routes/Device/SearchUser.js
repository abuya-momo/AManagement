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
const status = ['未绑定', '绑定中', '已上线', '异常'];

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

@connect(({ searchUser, loading }) => ({
  searchUser,
  loading: searchUser.loading,
}))
@Form.create()
export default class SearchUser extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    pagination: {
      total: 0,
      pageSize: 5,
      current: 1,
    },
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
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

  searchUser (param, paramType) {
    console.log(param);
    this.props.dispatch({
      type: 'searchUser/fetchUserInfo',
      payload: {
        param: param,
        paramType: paramType,
      },
    });
  }

  handleSearchById () {
    this.props.form.validateFields((err, values) => {
      if (err) return;
      console.log(values);
      this.searchUser(values.param, 'id');
    });
  }

  handleSearchByMiId () {
    this.props.form.validateFields((err, values) => {
      if (err) return;
      this.searchUser(values.param, 'mi_id');
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="用户id/MiID">
              {getFieldDecorator('param')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" onClick={()=>{
                this.handleSearchById();
              }} style={{ marginRight: 20 }}>
                查询用户ID
              </Button>
              <Button type="primary" onClick={()=>{
                this.handleSearchByMiId();
              }}>
                查询小米ID
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { searchUser, loading } = this.props;
    const { selectedRows, modalVisible } = this.state;

    console.log(searchUser);

    const columns = [
      {
        title: '设备id',
        dataIndex: 'device_id',
        key: 'device_id',
      },
      {
        title: '绑定时间',
        dataIndex: 'bind_time',
        key: 'bind_time',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '解绑时间',
        dataIndex: 'unbind_time',
        key: 'unbind_time',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '状态',
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
        title: '操作',
        render: () => (
          <Fragment>
            <Button type="primary" onClick={()=>{}}>
              解绑
            </Button>
          </Fragment>
        ),
      },
    ];

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    console.log(searchUser.binded_devices);

    const list = {
      list: searchUser.binded_devices,
      pagination: this.state.pagination,
    }

    return (
      <PageHeaderLayout title="用户设备查询" content="根据用户id或者小米id查询用户，以及其绑定设备记录">
        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="查询结果" style={{ marginBottom: 32 }}>
            <Description term="用户id">{searchUser.id}</Description>
            <Description term="小米id">{searchUser.mi_id}</Description>
            <Description term="用户名">{searchUser.name}</Description>
          </DescriptionList>
          <div className={styles.tableList}>
            <StandardTableA
              loading={loading}
              data={list}
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
