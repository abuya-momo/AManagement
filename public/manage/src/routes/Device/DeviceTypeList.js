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

import styles from './DeviceTypeList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ deviceType, loading }) => ({
  deviceType,
  loading: loading.models.deviceTypeList,
}))
@Form.create()

export default class TableList extends PureComponent {
  state = {
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'deviceType/fetchDeviceTypes',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    console.log("Test233333 handleStandardTableChange");
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

    dispatch({
      type: 'deviceType/fetchDeviceTypes',
    });
  };

  render() {
    const { deviceType: { deviceTypeList }, loading } = this.props;

    let data = {
      list: deviceTypeList,
      pagination: {
        total: 1,
        pageSize: deviceTypeList.length,
        current: 1
      }
    }

    const columns = [
      {
        title: '型号编号',
        dataIndex: 'id',
      },
      {
        title: '型号',
        dataIndex: 'model',
      },
      {
        title: '型号名称',
        dataIndex: 'type_name',
      },
      {
        title: '上市时间',
        dataIndex: 'start_sell_time',
        sorter: true,
        // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
        render: val => <span>{val}</span>,
      },
      {
        title: '操作',
        render: (currentRecord) => {
          return (
          <Fragment>
            <a href={`/#/device/device-type/${currentRecord.id}`}>修改</a>
          </Fragment>
        )},
      },
    ];

    return (
      <PageHeaderLayout title="设备类型">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => {}}>
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
