import React, { useEffect, useState } from 'react';
import Navbar from 'components/Navbars';
import { Segment, Container, Dropdown, Image, List } from 'semantic-ui-react';
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
        return (
          <List.Item style={{ padding: '20px' }}>
            <List.Content>
              <List.Header as="a">{d.name}</List.Header>
              <List.Description as="a">
                <Image avatar src="https://picsum.photos/200/300" />
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
          <h2 style={{ fontSize: '3rem', margin: '1rem 1rem', color: 'white' }}>
            Loman
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
        <Segment raised style={{ height: '80vh' }}>
          <h2
            style={{
              fontSize: '2rem',
              color: '#01B875',
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            850 บาท
          </h2>
          <List divided relaxed>
            <List.Item style={{ padding: '20px' }}></List.Item>
            {renderlist()}
            <List.Item style={{ padding: '20px' }}></List.Item>
          </List>
        </Segment>
      </Navbar>
    </div>
  );
};

export default SummaryBill;
