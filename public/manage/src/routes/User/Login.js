import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: false,
  };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  // changeAutoLogin = e => {
  //   this.setState({
  //     autoLogin: e.target.checked,
  //   });
  // };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  // <div>
  //   <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>
  //     自动登录
  //   </Checkbox>
  // </div>

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
          <Tab key="account" tab="账户密码登录">
            {login.status === 'error' &&
              login.type === 'account' &&
              !login.submitting &&
              this.renderMessage('账户或密码错误（admin/888888）')}
            <UserName name="userId" placeholder="admin/user" />
            <Password name="password" placeholder="888888/123456" />
          </Tab>
          <Submit loading={submitting}>登录</Submit>
          <p className={styles.other} style={{textAlign: 'center'}}>
            <span>
              如需获得管理账号，请联系管理员
            </span>
          </p>
        </Login>
      </div>
    );
  }
}
