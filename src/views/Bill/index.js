import React from 'react';
import Navbar from 'components/Navbars';
import { Segment, Container, Dropdown } from 'semantic-ui-react';

import './bill.css';
// import Step1 from './segment/step1';
// import Step2 from './segment/step2';
// import Step3 from './segment/step3';
export default class MenuExampleTabularOnTop extends React.Component {
  render() {
    const options = [
      { key: 1, text: 'อาหาร', value: 1 },
      { key: 2, text: 'เสื้อผ้า', value: 2 },
      { key: 3, text: 'เดินทาง', value: 3 },
      { key: 4, text: 'อื่นๆ', value: 4 }
    ];

    return (
      <Navbar>
        <h1>สร้างบิล</h1>
        <Segment raised>
          <Container>
            <h4>หมวดหมู่</h4>
            <hr style={{ backgroundColor: 'red', height: '2px' }}></hr>
            <Dropdown selection options={options} placeholder="เลือกหมวดหมู่" />
          </Container>
          <Segment raised style={{ height: '20vh' }}></Segment>
        </Segment>
      </Navbar>
    );
  }
}
