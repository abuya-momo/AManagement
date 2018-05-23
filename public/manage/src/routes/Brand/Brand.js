import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Badge, Table, Divider, Button } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './BrandList.less';

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

@connect(({ brand, loading }) => ({
  brand,
  loading: brand.loading,
}))
export default class Brand extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    console.log('dispatch');
    dispatch({
      type: 'brand/fetchBrand',
      payload: this.props.match.params.id
    });

    console.log(this.props.match);
    console.log(this.props.match.params.id);
    console.log(this.props.match.path);
  }

  render() {
    const { brand, loading } = this.props;

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

    console.log(brand);

    if (!brand.id) {
      console.log('deviceType == {}');
      return (
        <PageHeaderLayout title="品牌详情">
        </PageHeaderLayout>
      );
    } else {
      console.log('brand');
      return (
        <PageHeaderLayout title={`${brand.brand_name}`} content="品牌/系列详情">
          <Card bordered={false}>
            <DescriptionList size="large" title="品牌信息" style={{ marginBottom: 32 }}>
              <Description term="品牌id">{brand.id}</Description>
              <Description term="品牌名称">{brand.brand_name}</Description>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            <DescriptionList size="large" title="Slogan" style={{ marginBottom: 32 }}>
              <p>{brand.slogan}</p>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            <DescriptionList size="large" title="品牌简介" style={{ marginBottom: 32 }}>
              <p>{brand.brand_description}</p>
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            <DescriptionList size="large" title="品牌图片" style={{ marginBottom: 32 }}>
              <img src={brand.brand_icon} />
            </DescriptionList>
            <Divider style={{ marginBottom: 32 }} />
            <Button icon="form" type="primary" onClick={() => {
              this.props.dispatch(routerRedux.push(`/brand/edit-brand/${brand.id}`));// 页面跳转
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
