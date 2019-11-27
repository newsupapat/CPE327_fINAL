import React from "react";
import {
  Grid,
   Container,
   Input,
   Button
} from "semantic-ui-react";
import reg from "./reg.css"

export default class Homepage extends React.Component {
  render() {
    return (
        <Container>
            <Grid>
                <Grid.Row style={{'padding-top' : '2rem',
                                    'padding-bottom' : '0rem'}}>
                    <h1 style={{color:'white'}}>Billy</h1>
                </Grid.Row>
                <Grid.Row style={{'padding-top' : '0rem'}}>
                    <h5 style={{color:'white'}}>Make Splitting Bill Simple</h5>
                </Grid.Row>
                <Grid.Row style={{'padding-top' : '2.5rem'}}>
                    <h3 style={{color:'white'}}>สมัครสมาชิก</h3>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column style={{'padding-left':'0rem'}}>
                        <span>ชื่อผู้ใช้</span>
                    </Grid.Column>
                    <Grid.Column>
                        <Input placeholder='ระบุชื่อผู้ใช้' />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column style={{'padding-left':'0rem'}}>
                        <span>รหัสผ่าน</span>
                    </Grid.Column>
                    <Grid.Column>
                        <Input type='password' placeholder='ระบุรหัสผ่าน' />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column style={{'padding-left':'0rem'}}>
                        <span>ยืนยันรหัสผ่าน</span>
                    </Grid.Column>
                    <Grid.Column>
                        <Input type='password' placeholder='ระบุรหัสผ่านอีกครั้ง' />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column style={{'padding-left':'0rem'}}>
                        <span>อีเมล</span>
                    </Grid.Column>
                    <Grid.Column>
                        <Input placeholder='Someone@example.com' />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column style={{'padding-left':'0rem'}}>
                        <span>เบอร์โทรศัพท์</span>
                    </Grid.Column>
                    <Grid.Column>
                        <Input placeholder='081-234-5678' />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column style={{'padding-left':'0rem'}}>
                    </Grid.Column>
                    <Grid.Column>
                        <Button inverted color='yellow'>
                            สมัครสมาชิก
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
      </Container>
    );
  }
}
