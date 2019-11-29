import React from 'react';
import { Button, Form, Grid, Header,Modal } from 'semantic-ui-react';
import history from '../../history.js';
import Cookies from 'js-cookie';
//Redux
import { UpdateUser } from 'actions';
import { connect } from 'react-redux';
import axios from 'axios.js';
import { Link } from 'react-router-dom';
class LoginForm extends React.Component {
  state = {
    errorPaths: [],
    invalidUser:false
  };
  handleChange = (e, component) => {
    this.setState({ [component.name]: component.value });
  };
  handleClick = async (e) => {
    e.preventDefault();
    const { username, password, errorPaths } = this.state;
    console.log(username, password);
    this.setState({ errorPaths: [] });
    let errorCheck = [];
    if (!username) {
      errorCheck.push('username');
    }
    if (!password) {
      errorCheck.push('password');
    }
    if (errorCheck.length == 0) {
      try {
        let res = await axios.get(
          `/users?username=${username}&password=${password}`
        );
        console.log(res);
        if (res.status === 200 && res.data.length > 0) {
            this.props.UpdateUser({ username:res.data[0].username,id:res.data[0].id });
            Cookies.set('_user', { username:res.data[0].username,id:res.data[0].id }, { expires: 1 });
            history.push('/');
        }else{
            this.setState({invalidUser:true})
            errorCheck.push('username');
            errorCheck.push('password');
            this.setState({ errorPaths: errorCheck })
        }
      } catch (error) {
        console.error(error);
      }
    } else this.setState({ errorPaths: errorCheck });
  };
  render() {
    const { errorPaths } = this.state;
    return (
      <>
      <Grid
        textAlign='center'
        style={{
          height: '105vh',
          background: `url(${require('asset/image/wallpaper.png')})`,
          backgroundPosition: 'center center',
          backgroundSize: '100% 100%',
          transform: 'none',
        }}
        className='team'
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header
            as='h5'
            color='white'
            textAlign='center'
            style={{
              transform: 'none',
              marginTop: '50%',
              color: 'white',
            }}
          >
            Make spliting bill simple.
          </Header>
          <div style={{ padding: '5%' }}>
            <Header
              as='h2'
              color='white'
              textAlign='left'
              style={{
                transform: 'none',
                marginTop: '7%',
                marginBottom: '7%',
                color: 'white',
              }}
            >
              เข้าสู่ระบบ
            </Header>
            <Form size='large'>
              <Form.Input
                fluid
                placeholder='ชื่อผู้ใช้'
                onChange={this.handleChange}
                name='username'
                error={
                  errorPaths.includes('username') ? (
                    { content: 'Please enter your username', pointing: 'below' }
                  ) : null
                }
              />
              <Form.Input
                placeholder='รหัสผ่าน'
                type='password'
                onChange={this.handleChange}
                name='password'
                error={
                  errorPaths.includes('password') ? (
                    { content: 'Please enter your password', pointing: 'below' }
                  ) : null
                }
              />
              {this.state.invalidUser && <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p
                  style={{
                    color: 'white',
                    fontSize: '20px',
                    marginTop: '2%',
                   backgroundColor:'red'
                  }}
                >
                 username หรือ password ไม่ถูกต้อง
                </p>
              </div>}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p
                  style={{
                    textDecoration: 'underline',
                    color: 'white',
                    fontSize: '16px',
                    marginBottom: '2%',
                  }}
                >
                  ลืมรหัสผ่าน ?
                    ยังไม่มีบัญชีผู้ใช้งาน?{' '}
                    <Link to="reg" style={{color : 'white'}}>
                    <span
                    style={{
                        textDecoration: 'underline'
                    }}
                    >
                    สมัครใช้งาน
                    </span>
                    </Link>
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  size='large'
                  style={{ marginRight: '0px' }}
                  onClick={this.handleClick}
                >
                  เข้าสู่ระบบ
                </Button>
              </div>
            </Form>
            <p
              style={{
                marginTop: '10%',
                color: 'white',
                fontSize: '15px',
              }}
            >
              ยังไม่มีบัญชีผู้ใช้งาน?{' '}
              <Link to="reg" style={{color : 'white'}}>
                <span
                  style={{
                    textDecoration: 'underline',
                  }}
                >
                  สมัครใช้งาน
                </span>
              </Link>
            </p>
          </div>
        </Grid.Column>
      </Grid>
      <Modal
      defaultOpen
      style={{
        height: '30%',
        margin: '20rem 0 0 40rem'
      }}
      size ='mini'
      header='Warning!'
      content='Please enter inspect mode to view in mobile size before visit our website'
      actions={[{ key: 'done', content: 'Got it!', positive: true }]}
  />
  </>
    );
  }
}

export default connect(null, { UpdateUser })(LoginForm);
