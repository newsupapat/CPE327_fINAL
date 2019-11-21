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
import '../group.css';
import axios from 'axios.js';
import { Container, Row, Col } from 'reactstrap';

const Step3 = ({ currentstep, onsubmit, value }) => {
  const [activeItem, setactiveItem] = useState('รายชื่อเพื่อน');
  const [friend, setfriends] = useState([]);
  useEffect(() => {
    console.log(value);
  }, [value]);
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
  const sendstateback = () => {
    onsubmit(friend.filter(f => f.select));
  };
  const renderFrindList = () => {
    return friend.map(fie => {
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
            <List.Header>{fie.name}</List.Header>
          </List.Content>
        </List.Item>
      );
    });
  };
  if (currentstep !== 3) {
    // Prop: The current step
    return null;
  }
  return (
    <>
      <Container>
        <Row style={{ marginTop: '5%' }}>
          <Col>
            <h1 style={{ color: 'white' }}>{value.name || 'xxxx'}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h6 style={{ color: 'white' }}>เพื่อน</h6>
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
          ต่อไป
        </Button>
      </Segment>
    </>
  );
};

export default Step3;