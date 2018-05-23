import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';
import numeral from 'numeral';
import moment from 'moment';
import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from 'components/Charts';
import Trend from 'components/Trend';
import Ellipsis from 'components/Ellipsis';
import NumberInfo from 'components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';

import styles from './Analysis.less';
import style from './CardList.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const rankingListData = [{
  title: `轻盈 蓝色 基本款`,
  total: 323234,
}, {
  title: `轻盈 黑色 加厚款`,
  total: 15086,
}, {
  title: `轻盈 白色 基本款`,
  total: 15080,
}, {
  title: `轻盈 加厚 基本款`,
  total: 2600,
}, {
  title: `轻盈 灰色 基本款`,
  total: 369,
}];

const Yuan = ({ children }) => (
  <span
    dangerouslySetInnerHTML={{ __html: yuan(children) }}
  /> /* eslint-disable-line react/no-danger */
);

@connect(({ monitor, loading }) => ({
  monitor,
  loading: loading.effects['monitor/fetchDAUs'],
}))
export default class Analysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    console.log('componentDidMount');

    this.props.dispatch({
      type: 'monitor/fetchMonitorState',
      payload: {
        brandId: 6,
        date: 1527004800,
      },
    });

    this.props.dispatch({
      type: 'monitor/fetchDAUs',
      payload: {
        brandId: 6,
        startDate: 1526832000,
        lastDate: 1527004800,
      },
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    this.setState({
      rangePickerValue,
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  selectDate = type => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
  }

  render() {
    const { monitor: { monitorState, DAUList } } = this.props;

    console.log(monitorState);
    console.log(DAUList);

    // 处理两个对象中的信息
    // monitorState
    let monitorStateDeviceType = {};
    let monitorData = {
      todayDAU: 0,
      yesterdayDAU: 0,
      DAUTrend: 0,
      todayInitDevice: 0,
      yesterdayInitDevice: 0,
      initDeviceTrend: 0,

      deviceTypeNumber: 0,
      deviceTypeDeveloping: 0,
      deviceTypeStartSell: 0,
    };
    const todayTime = Number(moment().startOf('day').format('X'));
    const yesterdayTime = todayTime - 86400;

    monitorState.forEach((item, index)=>{
      if (!monitorStateDeviceType[item.device_type_id]) {
        monitorStateDeviceType[item.device_type_id] = true;
        monitorData['deviceTypeNumber'] += 1;

        if (item.state == 61) {
          monitorData['deviceTypeDeveloping'] += 1;
        } else if (item.state == 63 || item.state == 64 || item.state == 65) {
          monitorData['deviceTypeStartSell'] += 1;
        }
      }

      if (item.date == todayTime) {
        monitorData['todayDAU'] += item.active_user_number;
        monitorData['todayInitDevice'] += item.inited_device_number;
      } else if (item.date == yesterdayTime) {
        monitorData['yesterdayDAU'] += item.active_user_number;
        monitorData['yesterdayInitDevice'] += item.inited_device_number;
      }
    });

    monitorData.DAUTrend = numeral((monitorData.todayDAU / monitorData.yesterdayDAU - 1)*100).format('0.0')
    monitorData.initDeviceTrend = numeral((monitorData.todayInitDevice / monitorData.yesterdayInitDevice - 1)*100).format('0.0')

    console.log(monitorData);

    // DAUList
    let DAUChart = [];
    let DAUDate = {};
    DAUList.forEach((item, index)=>{
      if (!DAUDate[item.date]) {
        DAUDate[item.date] = {
          x: `${moment((item.date + 1) * 1000).format('MM-DD')}`,
          y: item.active_user_number,
          date: item.date,
        }
      } else {
        DAUDate[item.date].y += item.active_user_number;
      }
    });

    DAUChart = Object.keys(DAUDate).map((item)=>{
      return DAUDate[item];
    });

    DAUChart.sort((a, b)=>{
      return a.date > b.date;
    });

    console.log(DAUChart);

    const { rangePickerValue, salesType, currentTabKey } = this.state;
    const { chart, loading } = this.props;

    const salesData = [];
    for (let i = 0; i < 12; i += 1) {
      salesData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200,
      });
    }

    const salesExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
            今日
          </a>
          <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
            本周
          </a>
          <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
            本月
          </a>
          <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
            全年
          </a>
        </div>
        <RangePicker
          value={rangePickerValue}
          onChange={this.handleRangePickerChange}
          style={{ width: 256 }}
        />
      </div>
    );

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    const item = {
      avatar: 'https://img.alicdn.com/bao/uploaded/i1/1123007253/TB2PssSmVXXXXc6XpXXXXXXXXXX_!!1123007253.jpg_b.jpg',
      title: 'Dickies-轻盈系列',
      description: 'Dickies-轻盈系列，不走寻常路。',
    }

    // <Col xl={8} lg={12} md={12} sm={24} xs={24}>
    //   <div className={styles.salesRank}>
    //     <h4 className={styles.rankingTitle}>活跃型号排名</h4>
    //     <ul className={styles.rankingList}>
    //       {rankingListData.map((item, i) => (
    //         <li key={item.title}>
    //           <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
    //           <span>{item.title}</span>
    //           <span>{numeral(item.total).format('0,0')}</span>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </Col>

    return (
      <Fragment>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <Card hoverable className={style.card} actions={[
              <a href={`/#/brand/brand/${6}`}>品牌/系列详情</a>,
              <a href={`/#/device-type/device-type-list`}>型号一览</a>
            ]}>
              <Card.Meta
                avatar={<img alt="" className={style.cardAvatar} src={item.avatar} />}
                title={<a href="#">{item.title}</a>}
                description={
                  <Ellipsis className={style.item} lines={3}>
                    {item.description}
                  </Ellipsis>
                }
              />
            </Card>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="当前日活跃设备"
              total={() => numeral(monitorData.todayDAU).format('0,0') + '部'}
              footer={<Field label="昨日活跃设备" value={`${numeral(monitorData.yesterdayDAU).format('0,0')}`} />}
              contentHeight={46}
            >
              {
                monitorData.todayDAU >= monitorData.yesterdayDAU ? (<Trend flag="up" style={{ marginRight: 16 }}>
                  比昨天<span className={styles.trendText}>{monitorData.DAUTrend}%</span>
                </Trend>) : (<Trend flag="down">
                  比昨天<span className={styles.trendText}>{monitorData.DAUTrend}%</span>
                </Trend>)
              }
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="今日入网设备数"
              total={numeral(monitorData.todayInitDevice).format('0,0') + '部'}
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  {
                    monitorData.todayInitDevice >= monitorData.yesterdayInitDevice ? (<Trend flag="up" style={{ marginRight: 16 }}>
                      比昨天<span className={styles.trendText}>{monitorData.initDeviceTrend}%</span>
                    </Trend>) : (<Trend flag="down">
                      比昨天<span className={styles.trendText}>{monitorData.initDeviceTrend}%</span>
                    </Trend>)
                  }
                </div>
              }
              contentHeight={46}
            >
              <Field label="昨日入网数" value={`${monitorData.yesterdayInitDevice}部`} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="设备类型共计"
              total={numeral(monitorData.deviceTypeNumber).format('0,0') + '个'}
              footer={<Field label="研发中" value={`${monitorData.deviceTypeDeveloping}个`} />}
              contentHeight={46}
            >
              <Field label="已上市型号" value={`${monitorData.deviceTypeStartSell}个`} />
            </ChartCard>
          </Col>
        </Row>

        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="品牌日活跃设备趋势" key="sales">
                <Row>
                  <Col >
                    <div className={styles.salesBar}>
                      <Bar height={295} title="" data={DAUChart} />
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>
      </Fragment>
    );
  }
}
