import React from 'react';
import Navbar from 'components/Navbars';
import HomeMenu from 'components/HomeMenu';
import {
  Input,
  Menu,
  Segment,
  List,
  Image,
  Grid,
  Progress,
  Header,
  Popup,
  Button,
} from 'semantic-ui-react';
import './home.css';
import axios from 'axios.js';
import profile from 'asset/image/ProfilePict.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { UpdateMoney } from 'actions/index';

class Homepage extends React.Component {
  state = { activeItem: 'friend', groups: [], friend: [],alldepter:0,allOwner:0 };
  async componentDidMount() {
    try {
      let response = await axios.get('/groups');
      if (response.status === 200) {
        this.setState({
          groups: response.data,
        });
      }
    } catch (error) {
      console.error(error);
    }
    try {
      let responsefriend = await axios.get(`/friend?userid=${this.props.id}`);
      if (responsefriend.status === 200) {
        this.setState({
          friend: responsefriend.data[0].friendlist,
        });
      }
    } catch (error) {
      console.error(error);
    }
    try {
      let response = await axios.get(`/Bill`);
      let money = {}
      if (response.status === 200) {
        let owner = response.data.filter((o) => o.billowner === this.props.id)
        money.Owner = owner
        let depter = this.finddepter(
          response.data.filter((o) => o.billowner !== this.props.id)
        );
        money.Debter =depter.filter((d) => d.depter !== 0)
        money.alldepter = depter.reduce((all, dep) => {
          return dep.depter + all;
        }, 0)
        this.setState({alldepter:money.alldepter})
        money.allOwner = owner.reduce((all, dep) => {
          return dep.amount + all;
        }, 0)
        this.setState({allOwner:money.allOwner})
        this.props.UpdateMoney(money)
      }
    } catch (error) {
      console.error(error);
    }
  }
  finddepter(filterOwner) {
    let response = filterOwner.map((depter) => {
      return {
        ...depter,
        depter: depter.detail.reduce((sumup, detail) => {
          if (detail.friend.some((f) => f.userid === this.props.id)) {
            return sumup + detail.price / detail.friend.length;
          }
          return sumup;
        }, 0)
      };
    });
    return response;
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  renderlist = () => {
    if (this.state.activeItem === 'group') {
      return this.state.groups.map((g, index) => {
        return (
          <List.Item key={index}>
            <List.Content floated='right' style={{ paddingRight: '1rem' }}>
              <Header as='h4' textAlign='right'>
                เงินกองกลาง
              </Header>
              <Header as='h4' color='green' textAlign='right'>
                {g.pool + '  บาท'}
              </Header>
            </List.Content>
            <Image avatar src='https://picsum.photos/200/300' />
            <List.Content>
              <List.Header>{g.name}</List.Header>
            </List.Content>
          </List.Item>
        );
      });
    } else if (this.state.activeItem === 'friend') {
      return this.state.friend.map((f, index) => {
        return (
          <List.Item key={index}>
            <Image avatar src='https://picsum.photos/200/300' />
            <List.Content>
              <List.Header>{f.name}</List.Header>
            </List.Content>
          </List.Item>
        );
      });
    }
  };
  render() {
    const { activeItem ,allOwner,alldepter} = this.state;

    return (
      <Navbar>
        <div className='profile'>
          <Progress
            percent={alldepter/(alldepter+allOwner) *100}
            size={'large'}
            style={{
              marginBottom: '0px',
              transform: 'rotate(0deg) scaleX(-1)',
            }}
            color='red'
          />
          <Image
            src={profile}
            size='medium'
            circular
            style={{ position: 'absolute', zIndex: '1', maxWidth: '100px' }}
          />
          <Progress
            percent={allOwner/(alldepter+allOwner) *100}
            size={'large'}
            style={{ marginBottom: '0px' }}
          />
        </div>
        <Menu attached='top' tabular>
          <Menu.Item
            name='friend'
            content='เพื่อน'
            className='fix_column'
            active={activeItem === 'friend'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='group'
            content='กลุ่ม'
            className='fix_column'
            active={activeItem === 'group'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='noti'
            content='แจ้งเตือน'
            className='fix_column'
            active={activeItem === 'noti'}
            onClick={this.handleItemClick}
          />
        </Menu>
        <Segment
          attached='bottom'
          style={{
            height: '67vh',
            overflow: 'scroll',
          }}
        >
          <List divided relaxed verticalAlign='middle'>
            {this.renderlist()}
          </List>
          <div>
            <Popup
              trigger={
                <Button
                  icon='add'
                  content='เพิ่ม'
                  style={{
                    boxShadow:
                      ' 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
                    backgroundColor: 'indianred',
                    color: 'white',
                    position: 'fixed',
                    bottom: '50px',
                    right: '30px',
                    zIndex: '1',
                  }}
                />
              }
              content={
                <Button.Group vertical>
                  <Link to='addfriend'>
                    <Button
                      icon='users'
                      content='เพิ่มเพื่อน'
                      primary
                      style={{ marginBottom: '20px' }}
                    />
                  </Link>
                  <Link to='billdetail'>
                    <Button
                      icon='book'
                      content='สรุปบิล'
                      primary
                      style={{ marginBottom: '20px' }}
                    />
                  </Link>
                  <Link to='addbill'>
                    <Button
                      icon='money bill alternate'
                      content='บิล'
                      primary
                      style={{ marginBottom: '20px' }}
                    />
                  </Link>
                  <Link to='addgroup'>
                    <Button icon='users' content='กลุ่ม' primary />
                  </Link>
                </Button.Group>
              }
              on='click'
              position='top right'
            />
          </div>
        </Segment>
      </Navbar>
    );
  }
}

const mapStateToprops = (state) => {
  return { id: state.auth.id, username: state.auth.username };
};
export default connect(mapStateToprops, { UpdateMoney })(Homepage);
