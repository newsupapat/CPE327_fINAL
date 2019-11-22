import React from 'react';
import Navbar from 'components/Navbars';
import { Segment,
        Container,
        Dropdown,
        Card,
        Input,
        Grid, 
        GridRow,
        GridColumn} from 'semantic-ui-react'


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
    ]

    const friend = [
      { key: 1, text: 'kat', value: 1 },
      { key: 2, text: 'new', value: 2 },
      { key: 3, text: 'rose', value: 3 },
      { key: 4, text: 'tangkwa', value: 4 }
    ]

    return (
       <Navbar>
          <h1>สร้างบิล</h1>
          <Segment raised>
            <Container>
              <h4>หมวดหมู่</h4>
              <Dropdown selection options={category} placeholder='เลือกหมวดหมู่' />
            </Container>
            <hr style={{ backgroundColor: 'Lightgray', height: '1px' }}></hr>
            <Card>
            <Grid columns={2} divided>
                <GridRow>
                  <GridColumn>
                    <label>ชื่อรายการ</label>
                  </GridColumn>
                  <GridColumn>
                    <Input></Input>
                  </GridColumn>
                </GridRow>
                <GridRow>
                  <GridColumn>
                    <label>จำนวนเงิน</label>
                  </GridColumn>
                  <GridColumn>
                    <Input></Input>
                  </GridColumn>
                </GridRow>
                <GridRow>
                  <GridColumn>
                    <label>เพื่อน</label>
                  </GridColumn>
                  <GridColumn>
                    {/* shit happen here */}
                    <Dropdown style={{backgroundColor:"white",width : 10,margin : "0px 0px 0px -15px" }} selection options={friend} placeholder='เลือกเพื่อน' />
                  </GridColumn>
                </GridRow>
            </Grid>
          </Card>
          </Segment>
        </Navbar>
=======
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
>>>>>>> 8fb54197179c84196a5e76161dee320bdddfba3b
    );
  }
}
