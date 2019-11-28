import React, { useState, useEffect } from 'react';
import {
  Input,
  Menu,
  Segment,
  List,
  Image,
  Icon,
  Button,
  Header
} from 'semantic-ui-react';
import './group.css';
import axios from 'axios.js';
import Navbar from 'components/Navbars/index';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import history from 'history.js';

const AddFriend = ({ id }) => {
  const [activeItem, setactiveItem] = useState('รายชื่อเพื่อน');
  const [friend, setfriends] = useState([]);
  const [oldfriend, setoldfriends] = useState([]);
  const [friendid, setid] = useState(null);
  useEffect(() => {
    async function fetchData() {
      let friendtemp;
      try {
        const response = await axios.get(`/users?id_ne=${id}`);
        friendtemp = response.data;
        setfriends(
          response.data.map(f => {
            return { ...f, select: false };
          })
        );
      } catch (error) {
        console.error('cannot create', error);
      }
      try {
        const response = await axios.get(`/friend?userid=${id}`);
        setid(response.data[0].id);
        setoldfriends(response.data[0].friendlist);
        const oldfriends = response.data[0].friendlist.map(old => old.userid);
        const Friendafterslice = friendtemp.filter(
          f => !oldfriends.includes(f.id)
        );
        setfriends(
          Friendafterslice.map(f => {
            return { ...f, select: false };
          })
        );
      } catch (error) {
        console.error('cannot create', error);
      }
    }
    fetchData();
  }, []);
  const handleItemClick = (e, { name }) => {
    setactiveItem(name);
  };
  const addfriendlist = id => {
    const newfriend = friend.map(f => {
      if (f.id === id) {
        return { ...f, select: !f.select };
      }
      return f;
    });
    setfriends(newfriend);
  };
  const sendstateback = async () => {
    const modifySchema = friend
      .filter(f => f.select)
      .map(ff => {
        return { name: ff.username, userid: ff.id, select: false };
      });
    try {
      const response = await axios.put(`/friend/${friendid}`, {
        userid: id,
        friendlist: [...oldfriend, ...modifySchema]
      });
      console.log(response);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Save Complete',
          timer: 2000
        }).then(result => {
          history.push('/');
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const renderFrindList = () => {
    return friend.map((fie, index) => {
      return (
        <List.Item
          style={{
            paddingRight: '1rem',
            border: '1px solid rgba(34,36,38,.15)',
            padding: '1em 1em',
            boxShadow: '0 1px 2px 0 rgba(34,36,38,.15)',
            borderRadius: '.28571429rem',
            margin: '2% 0',
            backgroundColor: fie.select ? '#01B875' : 'white'
          }}
          key={index}
        >
          <List.Content floated="right">
            <button
              className={
                !fie.select
                  ? 'ui circular icon button positive'
                  : 'ui circular icon button red'
              }
              onClick={e => addfriendlist(fie.id)}
            >
              <i
                aria-hidden="true"
                className={!fie.select ? 'plus icon' : 'x icon'}
                style={{ fontSize: '20px' }}
              ></i>
            </button>
          </List.Content>
          <Image avatar src="https://picsum.photos/200/300" />
          <List.Content>
            <List.Header>{fie.username}</List.Header>
          </List.Content>
        </List.Item>
      );
    });
  };
  return (
    <Navbar>
      <Container>
        <Row style={{ marginTop: '5%' }}>
          <Col>
            <h1 style={{ color: 'white' }}>เพิ่มเพื่อน</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={{ size: 5, offset: 1 }}>
            <Menu text>
              <Menu.Item
                name="รายชื่อเพื่อน"
                active={activeItem === 'รายชื่อเพื่อน'}
                style={{
                  fontSize: '15px',
                  fontWeight: 'bold',
                  margin: '0 25%'
                }}
                onClick={handleItemClick}
              />
              <Menu.Item
                name="เพื่อนเมื่อเร็วๆนี้"
                active={activeItem === 'เพื่อนเมื่อเร็วๆนี้'}
                style={{
                  fontSize: '15px',
                  fontWeight: 'bold'
                }}
                onClick={handleItemClick}
              />
            </Menu>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input fluid placeholder="ค้นหารายชื่อเพื่อน" />
          </Col>
        </Row>
      </Container>
      <Segment
        raised
        style={{
          minHeight: '80vh',
          borderRadius: '20px'
        }}
      >
        <h5 style={{ fontWeight: 'bold' }}>เพื่อน</h5>
        <List relaxed verticalAlign="middle">
          {renderFrindList()}
        </List>
        <Button
          positive
          floated="right"
          style={{ marginTop: '5%' }}
          disabled={friend.filter(f => f.select).length === 0}
          onClick={e => sendstateback(e)}
        >
          เพิ่ม
        </Button>
      </Segment>
    </Navbar>
  );
};

const mapStateToprops = state => {
  return { id: state.auth.id, username: state.auth.username };
};
export default connect(mapStateToprops, null)(AddFriend);
