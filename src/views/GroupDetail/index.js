import React from 'react';
import Navbar from 'components/Navbars';
import HomeMenu from 'components/HomeMenu';
import {
  Menu,
  Segment,
  List,
  Image,
  Header,
  Message,
  Button,
  Card,
  Label,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import profile from 'asset/image/ProfilePict.png';
import { connect } from 'react-redux';
import { UpdateMoney } from 'actions/index';
import axios from 'axios.js'
import './BIllDetail.css'

class Group extends React.Component {
  state = {
    activeItem: 'Debter',
    group:null
  };
  async componentDidMount() {
    try {
      console.log(this.props.match)
      let response = await axios.get(`/groups/${this.props.match.params.groupid}`);
      if (response.status === 200) {
        console.log(response.data)
        this.setState({group:response.data})
      }
    } catch (error) {
      console.error(error);
    }
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Navbar>
        <Image
          src={profile}
          size='medium'
          circular
          style={{
            maxWidth: '60px',
            position: 'absolute',
            top: '6.1rem',
            right: '2rem',
          }}
        />
        <h2 style={{fontSize:'30px'}}>{this.state.group && this.state.group.name}</h2>
        <Message
          style={{
            maxWidth: '80%',
            display: 'flex',
            marginLeft: '2.5rem',
            height: '100px',
            marginTop: '2rem',
          }}
        >
          <Message.Header>ยอดเงินรวม</Message.Header>
          <h3>
            00
          </h3>
          <p style={{ margin: '2.5rem 0.5rem' }}>บาท</p>
        </Message>

        <Menu attached='top' tabular>
          <Menu.Item
            name='log'
            content='ประวัติการทำรายการ'
            className='fix_column'
            active={activeItem === 'Debter'}
            style={{ width: '50%' }}
            onClick={(e) => this.setState({ activeItem: 'Debter' })}
          />
          <Menu.Item
            name='bill'
            content='รายการบิล'
            className='fix_column'
            active={activeItem === 'Owner'}
            style={{ width: '50%' }}
            onClick={(e) => this.setState({ activeItem: 'Owner' })}
          />
        </Menu>
        <Segment attached='bottom' style={{ height: '60vh' }}>
          <List divided relaxed verticalAlign='middle'>
          </List>
        </Segment>
      </Navbar>
    );
  }
}
const mapStateToprops = (state) => {
  return {
    id: state.auth.id,
    username: state.auth.username,
    Owner: state.money.Owner,
    Debter: state.money.Debter,
    alldepter: state.money.alldepter,
    allOwner: state.money.allOwner,
  };
};
export default connect(mapStateToprops, {UpdateMoney})(Group);
