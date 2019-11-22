import React from 'react';
import Navbar from 'components/Navbars';
import { Segment, Dropdown, Card, Input } from 'semantic-ui-react';
import { Container, Row, Col } from 'reactstrap';

import './bill.css';
// import Step1 from './segment/step1';
// import Step2 from './segment/step2';
// import Step3 from './segment/step3';
export default class MenuExampleTabularOnTop extends React.Component {
  render() {
    const category = [
      { key: 1, text: 'อาหาร', value: 1 },
      { key: 2, text: 'เสื้อผ้า', value: 2 },
      { key: 3, text: 'เดินทาง', value: 3 },
      { key: 4, text: 'อื่นๆ', value: 4 }
    ];

    const friend = [
      { key: 1, text: 'kat', value: 1 },
      { key: 2, text: 'new', value: 2 },
      { key: 3, text: 'rose', value: 3 },
      { key: 4, text: 'tangkwa', value: 4 }
    ];

    return (
      <Navbar>
        <h1>สร้างบิล</h1>
        <Segment raised>
          <Container>
            <h4>หมวดหมู่</h4>
            <Dropdown
              selection
              options={category}
              placeholder="เลือกหมวดหมู่"
            />
          </Container>
          <hr style={{ backgroundColor: 'Lightgray', height: '1px' }}></hr>
          <Segment style={{ height: '26%' }}>
            <Row style={{ marginBottom: '20px' }}>
              <Col xs="4">
                <label>ชื่อรายการ</label>
              </Col>
              <Col
                xs="8"
                style={{
                  paddingLeft: '0px'
                }}
              >
                <Input
                  style={{
                    width: '100%'
                  }}
                ></Input>
              </Col>
            </Row>
            <Row style={{ marginBottom: '20px' }}>
              <Col xs="4">
                <label>จำนวนเงิน</label>
              </Col>
              <Col
                xs="8"
                style={{
                  paddingLeft: '0px'
                }}
              >
                <Input
                  style={{
                    width: '100%'
                  }}
                ></Input>
              </Col>
            </Row>
            <Row style={{ marginBottom: '20px' }}>
              <Col xs="4">
                <label>เพื่อน</label>
              </Col>
              <Col xs="8">
                {/* shit happen here */}
                <Dropdown
                  style={{
                    backgroundColor: 'white',
                    width: '106%',
                    margin: '0px 0px 0px -15px'
                  }}
                  selection
                  options={friend}
                  placeholder="เลือกเพื่อน"
                />
              </Col>
            </Row>
          </Segment>
        </Segment>
      </Navbar>
    );
  }
}
