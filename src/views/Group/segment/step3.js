import React, { useState, useEffect } from 'react';
import {
  Input,
  Menu,
  Segment,
  List,
  Image,
  Icon,
  Button,
  Header,
  Card,
  Form,
  TextArea
} from 'semantic-ui-react';
import '../group.css';
import axios from 'axios.js';
import history from 'history.js';
import { Container, Row, Col } from 'reactstrap';

const Step3 = ({ currentstep, onsubmit, value }) => {
  const [pool, setpool] = useState(null);
  const [detail, setdetail] = useState(null);
  const submitdata = async () => {
    const groupAdd = { ...value, pool, detail };
    try {
      const response = await axios.post('/groups', groupAdd);
      if (response.status === 201) {
        history.push('/');
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    console.log(pool, detail);
  };
  const renderFriendlist = () => {
    return (
      value &&
      value.friend.map(f => {
        return (
          <Card style={{ width: '50%' }}>
            <Card.Content style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                size="mini"
                src="https://picsum.photos/200/200"
                circular
                style={{ width: '20%' }}
              />
            </Card.Content>
            <Card.Content
              extra
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Card.Header>{f.name}</Card.Header>
            </Card.Content>
          </Card>
        );
      })
    );
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
            <Card.Group
              style={{ display: ' -webkit-inline-box', overflowX: 'scroll' }}
            >
              {renderFriendlist()}
            </Card.Group>
          </Col>
        </Row>
      </Container>
      <Segment
        raised
        style={{
          minHeight: '70vh',
          borderRadius: '20px'
        }}
      >
        <h5>รายละเอียด</h5>
        <div style={{ padding: '10px' }}>
          <Form>
            <Form.Field
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10%'
              }}
            >
              <label style={{ width: '50%' }}>จำนวนเงินกองกลาง</label>
              <Input
                placeholder="0"
                label={{ basic: true, content: 'บาท' }}
                labelPosition="right"
                name="pool"
                value={pool}
                onChange={e => setpool(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label style={{ width: '50%' }}>รายละเอียด</label>
              <TextArea
                name="details"
                value={detail}
                onChange={e => setdetail(e.target.value)}
              />
            </Form.Field>
          </Form>
          <Button
            color="red"
            floated="right"
            style={{ marginTop: '5%' }}
            onClick={e => submitdata(e)}
            disabled={!pool}
          >
            เรียบร้อย
          </Button>
        </div>
      </Segment>
    </>
  );
};

export default Step3;
