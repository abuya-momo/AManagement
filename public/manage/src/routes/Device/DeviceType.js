import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Badge, Table, Divider, Button } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './DeviceType.less';

const { Description } = DescriptionList;

// const progressColumns = [
//   {
//     title: '时间',
//     dataIndex: 'time',
//     key: 'time',
//   },
//   {
//     title: '当前进度',
//     dataIndex: 'rate',
//     key: 'rate',
//   },
//   {
//     title: '状态',
//     dataIndex: 'status',
//     key: 'status',
//     render: text =>
//       text === 'success' ? (
//         <Badge status="success" text="成功" />
//       ) : (
//         <Badge status="processing" text="进行中" />
//       ),
//   },
//   {
//     title: '操作员ID',
//     dataIndex: 'operator',
//     key: 'operator',
//   },
//   {
//     title: '耗时',
//     dataIndex: 'cost',
//     key: 'cost',
//   },
// ];

@connect(({ deviceType, loading }) => ({
  deviceType,
  loading: loading.effects['deviceType/fetchDeviceType'],
}))
export default class DeviceType extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    console.log('dispatch');
    dispatch({
      type: 'deviceType/fetchDeviceType',
      payload: this.props.match.params.id
    });

    console.log(this.props.match);
    console.log(this.props.match.params.id);
    console.log(this.props.match.path);
  }

  render() {
    const { deviceType, loading } = this.props;

    // const { basicGoods, basicProgress } = profile;
    // let goodsData = [];
    // if (basicGoods.length) {
    //   let num = 0;
    //   let amount = 0;
    //   basicGoods.forEach(item => {
    //     num += Number(item.num);
    //     amount += Number(item.amount);
    //   });
    //   goodsData = basicGoods.concat({
    //     id: '总计',
    //     num,
    //     amount,
    //   });
    // }
    // const renderContent = (value, row, index) => {
    //   const obj = {
    //     children: value,
    //     props: {},
    //   };
    //   if (index === basicGoods.length) {
    //     obj.props.colSpan = 0;
    //   }
    //   return obj;
    // };
    // const goodsColumns = [
    //   {
    //     title: '商品编号',
    //     dataIndex: 'id',
    //     key: 'id',
    //     render: (text, row, index) => {
    //       if (index < basicGoods.length) {
    //         return <a href="">{text}</a>;
    //       }
    //       return {
    //         children: <span style={{ fontWeight: 600 }}>总计</span>,
    //         props: {
    //           colSpan: 4,
    //         },
    //       };
    //     },
    //   },
    //   {
    //     title: '商品名称',
    //     dataIndex: 'name',
    //     key: 'name',
    //     render: renderContent,
    //   },
    //   {
    //     title: '商品条码',
    //     dataIndex: 'barcode',
    //     key: 'barcode',
    //     render: renderContent,
    //   },
    //   {
    //     title: '单价',
    //     dataIndex: 'price',
    //     key: 'price',
    //     align: 'right',
    //     render: renderContent,
    //   },
    //   {
    //     title: '数量（件）',
    //     dataIndex: 'num',
    //     key: 'num',
    //     align: 'right',
    //     render: (text, row, index) => {
    //       if (index < basicGoods.length) {
    //         return text;
    //       }
    //       return <span style={{ fontWeight: 600 }}>{text}</span>;
    //     },
    //   },
    //   {
    //     title: '金额',
    //     dataIndex: 'amount',
    //     key: 'amount',
    //     align: 'right',
    //     render: (text, row, index) => {
    //       if (index < basicGoods.length) {
    //         return text;
    //       }
    //       return <span style={{ fontWeight: 600 }}>{text}</span>;
    //     },
    //   },
    // ];

    console.log(deviceType);

    if (!deviceType.id) {
      console.log('deviceType == {}');
      return (
        <PageHeaderLayout title="设备类型详情">
        </PageHeaderLayout>
      );
    } else {
      console.log('deviceType');
      return (
        <PageHeaderLayout title={`${deviceType.type_name}(${deviceType.model})`} content="设备类型详情">
          <Card bordered={false}>
            <DescriptionList size="large" title="型号信息" style={{ marginBottom: 32 }}>
              <Description term="型号(英文)">{deviceType.model}</Description>
              <Description term="型号(中文)">{deviceType.type_name}</Description>
              <Description term="型号编号">{deviceType.id}</Description>
              <Description term="上市时间">{deviceType.start_sell_time}</Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            <DescriptionList size="large" title="型号简介" style={{ marginBottom: 32 }}>
              <p>{deviceType.type_profile}</p>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            <DescriptionList size="large" title="型号图片" style={{ marginBottom: 32 }}>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            <Button icon="form" type="primary" onClick={() => {
              this.props.dispatch(routerRedux.push(`/device/edit-device-type/${deviceType.id}`));// 页面跳转
            }}>
              修改
            </Button>
            {
              // <Divider style={{ marginBottom: 32 }} />
              // <div className={styles.title}>退货商品</div>
              // <Table
              //   style={{ marginBottom: 24 }}
              //   pagination={false}
              //   loading={loading}
              //   dataSource={goodsData}
              //   columns={goodsColumns}
              //   rowKey="id"
              // />
              // <div className={styles.title}>退货进度</div>
              // <Table
              //   style={{ marginBottom: 16 }}
              //   pagination={false}
              //   loading={loading}
              //   dataSource={basicProgress}
              //   columns={progressColumns}
              // />
            }
          </Card>
        </PageHeaderLayout>
      );
    }
  }
}
