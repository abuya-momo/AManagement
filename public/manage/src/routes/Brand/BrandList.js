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

@connect(({ deviceTypeList, loading }) => ({
  deviceTypeList,
  loading: loading.effects['deviceType/fetchDeviceTypes'],
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
      type: 'deviceTypeList/fetchDeviceTypes',
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
    const { deviceTypeList: { list }, loading } = this.props;

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

    const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Manager</span>
          <p>{((list)=>{
            let a = list.map(item=><span className="manager">{item.name}</span>);
            console.log(a);
            if (a.length > 2) {
              a = a.slice(0, 2);
              a.push(<span className="manager-end">等</span>)
            }
            return a;
          })(managersListTest[0].managers)
          }</p>
        </div>
        <div className={styles.listContentItem}>
          <span>型号总数</span>
          <p><span className="number">10</span>个</p>
        </div>
        <div className={styles.listContentItem}>
          <span>生产中型号</span>
          <p><span className="number">6</span>个</p>
        </div>
        <div className={styles.listContentItem}>
          <span>已发售型号</span>
          <p><span className="number">7</span>个</p>
        </div>
      </div>
    );

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

    const titles = [
      'Alipay',
      'Angular',
      'Ant Design',
      'Ant Design Pro',
      'Bootstrap',
      'React',
      'Vue',
      'Webpack',
    ];

    const user = [
      '付小小',
      '曲丽丽',
      '林东东',
      '周星星',
      '吴加好',
      '朱偏右',
      '鱼酱',
      '乐哥',
      '谭小仪',
      '仲尼',
    ];

    const avatars = [
      'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
      'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
      'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
      'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
      'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
      'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
      'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
      'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
    ];

    const getNotice = [
      {
        id: 'xxx1',
        title: titles[0],
        logo: avatars[0],
        owner: user[0],
        description: '那是一种内在的东西，他们到达不了，也无法触及的',
        updatedAt: new Date(),
        member: '科学搬砖组',
        href: '',
        memberLink: '',
      },
      {
        id: 'xxx2',
        title: titles[1],
        logo: avatars[1],
        owner: user[1],
        description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
        updatedAt: new Date('2017-07-24'),
        member: '全组都是吴彦祖',
        href: '',
        memberLink: '',
      },
      {
        id: 'xxx3',
        title: titles[2],
        logo: avatars[2],
        owner: user[2],
        description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
        updatedAt: new Date(),
        member: '中二少女团',
        href: '',
        memberLink: '',
      },
      {
        id: 'xxx4',
        title: titles[3],
        logo: avatars[3],
        owner: user[3],
        description: '那时候我只会想自己想要什么，从不想自己拥有什么',
        updatedAt: new Date('2017-07-23'),
        member: '程序员日常',
        href: '',
        memberLink: '',
      },
      {
        id: 'xxx5',
        title: titles[4],
        logo: avatars[4],
        owner: user[4],
        description: '凛冬将至',
        updatedAt: new Date('2017-07-23'),
        member: '高逼格设计天团',
        href: '',
        memberLink: '',
      },
      {
        id: 'xxx6',
        title: titles[5],
        logo: avatars[5],
        owner: user[5],
        description: '生命就像一盒巧克力，结果往往出人意料',
        updatedAt: new Date('2017-07-23'),
        member: '骗你来学计算机',
        href: '',
        memberLink: '',
      },
    ];

    return (
      <PageHeaderLayout title="品牌" content="平台所有品牌列表">
        <div className={styles.standardList}>
          <Card className={styles.listCard}>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={getNotice}
              renderItem={item => (
                <List.Item actions={[<a>详情</a>, <a>编辑</a>]}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.logo} shape="square" size="large" />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                  <ListContent data={item} />
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
