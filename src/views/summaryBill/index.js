import React, { useEffect, useState } from 'react';
import Navbar from 'components/Navbars';
import {
  Segment,
  Container,
  Dropdown,
  Image,
  List,
  Label,
  Header
} from 'semantic-ui-react';
import { Row, Col } from 'reactstrap';
import axios from 'axios.js';

const SummaryBill = ({ match }) => {
  const [Owner, setOwner] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/Owner/${match.params.billid}`);
        console.log(response);
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
        console.log(d);
        return (
          <List.Item style={{ padding: '20px' }}>
            <List.Content floated="right" style={{ paddingRight: '1rem' }}>
              <Header as="h4" color="green" textAlign="right">
                {d.price + ' บาท'}
              </Header>
            </List.Content>
            <List.Content>
              <List.Header as="a">{d.name}</List.Header>
              <List.Description as="a">
                {d.friend &&
                  d.friend.map(f => {
                    return <Image avatar src="https://picsum.photos/200/300" />;
                  })}
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
          {/* <Image
            src={profile}
            size="medium"
            circular
            style={{
              maxWidth: '60px',
              position: 'absolute',
              top: '6.1rem',
              right: '2rem'
            }}
          /> */}
        </Container>
        <Segment raised style={{ height: '100%' }}>
          {Owner && (
            <>
              <h2
                style={{
                  fontSize: '2rem',
                  color: '#01B875',
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
              <Col xs={7} style={{ textAlign: 'left' }}>
                <List selection verticalAlign="middle">
                  <List.Item>
                    <Image
                      avatar
                      src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"
                    />
                    <List.Content>
                      <List.Header>Helen ยอด 460</List.Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <Image
                      avatar
                      src="https://react.semantic-ui.com/images/avatar/small/christian.jpg"
                    />
                    <List.Content>
                      <List.Header>Christian ยอด 460</List.Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <Image
                      avatar
                      src="https://react.semantic-ui.com/images/avatar/small/daniel.jpg"
                    />
                    <List.Content>
                      <List.Header>Daniel ยอด 460 </List.Header>
                    </List.Content>
                  </List.Item>
                </List>
              </Col>
            </Row>
          </Container>
        </Segment>
      </Navbar>
    </div>
  );
};

export default SummaryBill;
