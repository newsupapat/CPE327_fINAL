import React from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
} from 'semantic-ui-react';
import history from '../../history.js'
import Cookies from 'js-cookie'
//Redux
import { UpdateUser } from 'actions'
import { connect } from 'react-redux'

class LoginForm extends React.Component {
    state = {
        errorPaths:[]
    }
  handleChange = (e, component) => {
    this.setState({ [component.name]: component.value });
  };
  handleClick = (e) =>{
    e.preventDefault();
    const {username,password,errorPaths} = this.state
    console.log(username,password)
    this.setState({errorPaths:[]})
    let errorCheck = []
    if(!username){
        errorCheck.push('username')
    }
    if(!password){
        errorCheck.push('password')
    }
    if(errorCheck.length == 0) { 
        history.push('/')
        this.props.UpdateUser({username})
        Cookies.set('_user',{ username }, { expires: 1 })
    }else this.setState({errorPaths:errorCheck})
    
  }
  render() {
      const {errorPaths} = this.state
        return (
            <Grid
            textAlign="center"
            style={{
                height: '105vh',
                background: `url(${require('asset/image/wallpaper.png')})`,
                backgroundPosition: 'center center',
                backgroundSize: '100% 100%',
                transform: 'none'
            }}
            className="team"
            verticalAlign="middle"
            >
            <Grid.Column style={{ maxWidth: 500 }}>
                <Header
                as="h5"
                color="white"
                textAlign="center"
                style={{
                    transform: 'none',
                    marginTop: '50%',
                    color: 'white'
                }}
                >
                Make spliting bill simple.
                </Header>
                <div style={{ padding: '5%' }}>
                <Header
                    as="h2"
                    color="white"
                    textAlign="left"
                    style={{
                    transform: 'none',
                    marginTop: '7%',
                    marginBottom: '7%',
                    color: 'white'
                    }}
                >
                    เข้าสู่ระบบ
                </Header>
                <Form size="large">
                    <Form.Input fluid placeholder="ชื่อผู้ใช้" onChange={this.handleChange} name="username" 
                    error={errorPaths.includes('username') ? { content: 'Please enter your username', pointing: 'below' }:null}/>
                    <Form.Input placeholder="รหัสผ่าน" type="password" onChange={this.handleChange} name="password" 
                    error={errorPaths.includes('password') ? { content: 'Please enter your password', pointing: 'below' }:null}/>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p
                        style={{
                        textDecoration: 'underline',
                        color: 'white',
                        fontSize: '16px',
                        marginBottom: '2%'
                        }}
                    >
                        ลืมรหัสผ่าน ?
                    </p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button size="large" style={{ marginRight: '0px' }} onClick={this.handleClick}>
                        เข้าสู่ระบบ
                    </Button>
                    </div>
                </Form>
                <p
                    style={{
                    marginTop: '10%',
                    color: 'white',
                    fontSize: '15px'
                    }}
                >
                    ยังไม่มีบัญชีผู้ใช้งาน?{' '}
                    <span
                    style={{
                        textDecoration: 'underline'
                    }}
                    >
                    สมัครใช้งาน
                    </span>
                </p>
                </div>
            </Grid.Column>
            </Grid>
        );
            }
};

export default connect(null,{UpdateUser})(LoginForm);
