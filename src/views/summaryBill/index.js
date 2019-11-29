import React, { useEffect, useState } from 'react';
import Navbar from 'components/Navbars';
import { Row, Col } from 'reactstrap';
import {
  Segment,
  Container,
  Image,
  List,
  Label,
  Header,
  Button
} from 'semantic-ui-react';

import axios from 'axios.js';
import { connect } from 'react-redux';
import billsum from './sumbill.css';

const SummaryBill = ({ match, id }) => {
  const [Owner, setOwner] = useState(null);
  const [modal, setModal] = useState(false);
  const [sumup, setsumup] = useState({});

  const toggle = () => setModal(!modal);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id);
        const response = await axios.get(`/Bill/${match.params.billid}`);
        const sum = {};
        console.log(response.data);
        response.data.detail.map(de => {
          de.friend.map(fri => {
            if (sum[fri.name]) {
              console.log(de.price);
              sum[fri.name] = sum[fri.name] + de.price / de.friend.length;
            } else {
              console.log(sum[fri.name]);
              sum[fri.name] = de.price / de.friend.length;
            }
          });
        });
        console.log(sum);
        setsumup(sum);

        setOwner(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const renderlist = () => {
    return (
      Owner &&
      Owner.detail.map(d => {
        return (
          <List.Item style={{ padding: '20px' }}>
            <List.Content floated="right" style={{ paddingRight: '1rem' }}>
              <Header as="h4" color="green" textAlign="right">
                {d.price + ' บาท'}
              </Header>
            </List.Content>
            <List.Content>
              <List.Header as="a">{d.name}</List.Header>
              <List.Description style={{ marginTop: '5%' }}>
                <Row style={{ margin: 0, width: '100%', overflow: 'scroll' }}>
                  {d.friend &&
                    d.friend.map(f => {
                      return (
                        <Col>
                          <Segment
                            inverted
                            color={f.userid === id ? 'orange' : ''}
                            style={{ minHeight: '8%' }}
                          >
                            <Image
                              avatar
                              src="https://picsum.photos/200/300"
                              avatar
                            />
                            <span>{f.name}</span>
                          </Segment>
                        </Col>
                      );
                    })}
                </Row>
              </List.Description>
            </List.Content>
          </List.Item>
        );
      })
    );
  };
  return (
    <div>
      <Navbar>
        <Container>
          <h2
            style={{
              fontSize: '30px',
              margin: '1rem 1rem',
              color: 'white',
              fontsize: '3.5vw'
            }}
          >
            {Owner && Owner.name}
          </h2>
        </Container>
        <Segment raised style={{ height: '100%' }}>
          {Owner && (
            <>
              <h2
                style={{
                  color: 'green',
                  fontSize: '2rem',
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                {'รวม ' + Owner.amount + ' บาท'}
              </h2>
              <Label
                color={Owner.flag === 'อาหาร' ? 'purple' : 'orange'}
                ribbon
                style={{ width: '50%', textAlign: 'center' }}
              >
                {Owner.flag}
              </Label>
            </>
          )}
          <List divided relaxed style={{ marginBottom: '0' }}>
            <List.Item style={{ padding: '20px' }}></List.Item>
            {renderlist()}
            <List.Item></List.Item>
          </List>
          <Container style={{ textAlign: 'center' }}>
            <Row>
              <Col>
                <h1>สรุป</h1>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col></Col>
              <Col xs={8} style={{ textAlign: 'left' }}>
                <List selection verticalAlign="middle">
                  {sumup &&
                    Object.keys(sumup).map(s => {
                      return (
                        <List.Item>
                          <Image
                            avatar
                            src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"
                          />
                          <List.Content>
                            <List.Header>{`${s} ยอด ${sumup[s]}`}</List.Header>
                          </List.Content>
                        </List.Item>
                      );
                    })}
                </List>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  inverted
                  color="red"
                  style={{
                    position: 'static',
                    marginTop: '3rem',
                    marginBottom: '3rem'
                  }}
                >
                  แก้ไข
                </Button>
              </Col>
              <Col>
                <Button
                  style={{
                    marginTop: '3rem',
                    marginBottom: '3rem'
                  }}
                >
                  ตกลง
                </Button>
              </Col>
            </Row>
          </Container>
        </Segment>
      </Navbar>
    </div>
  );
};
const mapStateToprops = state => {
  return { id: state.auth.id, username: state.auth.username };
};
export default connect(mapStateToprops, null)(SummaryBill);
