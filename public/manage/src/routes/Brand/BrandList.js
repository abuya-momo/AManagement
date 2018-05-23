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
  List,
  Select,
  Icon,
  Progress,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Avatar,
} from 'antd';
import StandardTableA from 'components/StandardTableA';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

// import style from './BrandList.less';
import styles from './BrandBasicList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ brandList, loading }) => ({
  brandList,
  loading: loading.effects['brandList/fetchBrands'],
}))
@Form.create()
export default class BrandList extends Component {
  state = {
    pagination: {
      total: 0,
      pageSize: 5,
      current: 1
    }
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'brandList/fetchBrands',
    });
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
    const { brandList: { list }, loading } = this.props;

    let data = {
      list: list,
      pagination: {
        ...this.state.pagination,
        total: list ? list.length : 0,
      },
    }

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const managersListTest = [{
      managers: [{
        name: '付晓晓',
        id: 1,
      }, {
        name: '张翰',
        id: 12,
      }, {
        name: '丫丫',
        id: 12,
      }],
    }, {
      managers: [{
        name: 'b',
        id: 2,
      }],
    }];

    // const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
    //   <div className={styles.listContent}>
    //     <div className={styles.listContentItem}>
    //       <span>Manager</span>
    //       <p>{((list)=>{
    //         let a = list.map(item=><span className="manager">{item.name}</span>);
    //         console.log(a);
    //         if (a.length > 2) {
    //           a = a.slice(0, 2);
    //           a.push(<span className="manager-end">等</span>)
    //         }
    //         return a;
    //       })(managersListTest[0].managers)
    //       }</p>
    //     </div>
    //   </div>
    // );

    // <ListContent data={item} />

    const columns = [
      {
        title: '品牌编号',
        dataIndex: 'id',
      },
      {
        title: '品牌名称',
        dataIndex: 'model',
      },
      {
        title: '品牌',
        dataIndex: 'type_name',
      },
      {
        title: '上市时间',
        dataIndex: 'start_sell_time',
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
            <a href={`/#/device-type/device-type/${currentRecord.id}`}>详情</a>
            <Divider type="vertical" />
            <a href={`/#/device-type/edit-device-type/${currentRecord.id}`}>修改</a>
          </Fragment>
        )},
      },
    ];

    const avatars = [
      'https://img.alicdn.com/imgextra/i4/928417138/TB2ViuQf80kpuFjy1zdXXXuUVXa_!!928417138.png_430x430q90.jpg', // Alipay
      'https://img.alicdn.com/bao/uploaded/i2/1579924534/TB2eE03rohnpuFjSZFpXXcpuXXa_!!1579924534.jpg_b.jpg', // Angular
      'https://img.alicdn.com/imgextra/i2/928417138/TB2R_tagHGYBuNjy0FoXXciBFXa_!!928417138.jpg_430x430q90.jpg', // Ant Design
    ];

    return (
      <PageHeaderLayout title="品牌/系列" content="平台所有品牌和系列列表">
        <div className={styles.standardList}>
          <Card className={styles.listCard}>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item actions={[
                  <a href={`/#/brand/brand/${item.id}`}>详情</a>,
                  <a href={`/#/brand/edit-brand/${item.id}`}>编辑</a>
                ]}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.brand_icon} shape="square" size="large" />}
                    title={<a href={item.href}>{item.brand_name}</a>}
                    description={item.slogan}
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );

    // <Card bordered={false}>
    //   <div className={styles.tableList}>
    //     <div className={styles.tableListOperator}>
    //       <Button icon="plus" type="primary" onClick={() => {
    //         this.props.dispatch(routerRedux.push('/device-type/add-device-type'));// 页面跳转
    //       }}>
    //         新建
    //       </Button>
    //     </div>
    //     <StandardTableA
    //       loading={loading}
    //       data={data}
    //       columns={columns}
    //       onChange={this.handleStandardTableChange}
    //     />
    //   </div>
    // </Card>
  }
}
