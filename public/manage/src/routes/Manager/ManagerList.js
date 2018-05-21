import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
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
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';
import StandardTableA from 'components/StandardTableA';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './ManagerList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['正常', '已注销'];

@connect(({ manager, loading }) => ({
  manager,
  loading: manager.loading,
}))
@Form.create()
export default class ManagerList extends Component {
  state = {
    pagination: {
      total: 0,
      pageSize: 5,
      current: 1
    }
  };

  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'manager/fetchManagers',
    // });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    console.log("Test233333 handleStandardTableChange");
    console.log(pagination);

    this.setState({
      ...this.state,
      pagination: {
        ...this.state.pagination,
        current: pagination.current,
      }
    });

    const { dispatch } = this.props;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
  };

  render() {
    const { manager, loading } = this.props;

    let data = {
      list: manager.managers,
      pagination: {
        ...this.state.pagination,
        total: manager.managers ? manager.managers.length : 0,
      },
    }

    const columns = [
      {
        title: '管理员编号',
        dataIndex: 'id',
      },
      {
        title: '管理员姓名',
        dataIndex: 'manager_name',
      },
      {
        title: '品牌',
        dataIndex: 'brand',
      },
      {
        title: '创建时间',
        dataIndex: 'start_time',
        sorter: true,
        render: val => <span>{
          moment(val).format('YYYY-MM-DD HH:mm:ss')
        }</span>,
      },
      {
        title: '状态',
        dataIndex: 'if_deleted',
        key: 'if_deleted',
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
        title: '注销时间',
        dataIndex: 'delete_time',
        sorter: true,
        render: val => <span>{
          moment(val).format('YYYY-MM-DD HH:mm:ss')
        }</span>,
      },
      {
        title: '操作',
        render: (currentRecord) => {
          return (
          <Fragment>
            <a href={`/#/device/device-type/${currentRecord.id}`}>注销账号</a>
          </Fragment>
        )},
      },
    ];

    return (
      <PageHeaderLayout title="管理员列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => {
                this.props.dispatch(routerRedux.push('/manager/add-manager'));
              }}>
                新建
              </Button>
            </div>
            <StandardTableA
              loading={loading}
              data={data}
              columns={columns}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
