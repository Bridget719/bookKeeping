import React from 'react';
import Taro from '@tarojs/taro';
import { View, Button, Text, Radio } from '@tarojs/components';
import './index.scss'

interface LoginRegisterProps { }

interface LoginRegisterState {
  isLoggedIn: boolean;
  username: string;
  id: string;
  password: string;
  isRegistering: boolean;
  accountType: string;
  invitationCode: string;
  agreeToGetWeChatInfo: boolean;
  firstSubmit: boolean;
}

class LoginRegisterPage extends React.Component<LoginRegisterProps, LoginRegisterState> {
  constructor(props: LoginRegisterProps) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: '',
      id: '',
      password: '',
      isRegistering: false,
      accountType: '',
      invitationCode: '',
      agreeToGetWeChatInfo: false,
      firstSubmit: false,
    };
  }

  handleLogin = () => {
    // 处理登录逻辑  
    // ...  
    this.setState({ isLoggedIn: true });
  };

  handleRegister = () => {
    this.setState({ isRegistering: true });
  };

  handleCancelRegister = () => {
    this.setState({ isRegistering: false });
  };

  handleSubmitRegister = async () => {
    !this.state.firstSubmit && this.setState({ firstSubmit: true })
    if (this.state.agreeToGetWeChatInfo) {
      try {
        const result = await Taro.getUserProfile({
          lang: 'zh_CN',
          desc: "only for show up",
          success: (res) => {
            // 成功回调，res中包含用户的昵称和头像等信息  
            console.log('res:', res);
            // 这里你可以将昵称和ID等信息保存到状态中，或者传递给后端进行注册操作  
            this.setState({
              username: res.userInfo.nickName,
              id: res.signature
              // 更新其他状态...   
            });
            Taro.redirectTo({
              url: '/pages/home/index'
            });
          },
          fail: (err) => {
            console.log('err', err); // 登录失败时打印错误信息  
          }
        });
      } catch (error) {
        console.log('error', error); // 捕获异常信息  
      }
    } else {
      // 用户未同意，提示他们同意后再进行注册操作，或者直接跳过这一步...  
    }
  };
  render() {
    return (
      <View>
        {/* {this.state.isLoggedIn ? (
          <Text>已登录，欢迎回来！</Text>
        ) :''} */}
        <View className="poster">
          <Text className="title">欢迎来到雯雯记账本</Text>
          <Text className="description">致力于减少我们不必要的日常花销</Text>
        </View>
        <View style={{ textAlign: 'center' }}>

          {/* <Text>欢迎来到雯雯记账本，致力于减少我们不必要的日常花销</Text> */}
          <Radio style={{ margin: '24px 0' }} value='同意' checked={this.state.agreeToGetWeChatInfo} onClick={(e) => {
            if (this.state.agreeToGetWeChatInfo !== true) this.setState({ agreeToGetWeChatInfo: true });
          }}>{ }我同意授权微信个人信息</Radio>
          <Button style={{ width: '80%', borderRadius: '10px' }} onClick={this.handleSubmitRegister}>提交</Button>
          {!this.state.agreeToGetWeChatInfo && this.state.firstSubmit ?
            <Text style={{ color: 'red' }}>您还未同意授权信息，这样可以方便您下一次进入查看历史数据</Text> : ''}
        </View>
      </View>
    );
  }
}

export default LoginRegisterPage;