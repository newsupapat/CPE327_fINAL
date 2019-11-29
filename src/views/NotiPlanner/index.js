import React from "react";
import Navbar from "components/Navbars";
import HomeMenu from "components/HomeMenu";
import {
  Input,
  Menu,
  Segment,
  List,
  Image,
  Grid,
  Component,
  Header,
  Message,
  Button,
  Card,
  Checkbox,
  Label,
  Form,
  TextArea,
  Container
} from "semantic-ui-react";
import "./NotiPlanner.css";
import axios from "axios.js";
import logo from "asset/image/logo.png";
import profile from "asset/image/ProfilePict.png";
import { TimePicker } from "antd";
import moment from "moment";
import { connect } from 'react-redux';
import Swal from "sweetalert2";
import history from 'history.js'

const frequency = [
  { key: "d", text: "วัน", value: "day" },
  { key: "w", text: "อาทิตย์", value: "week" },
  { key: "m", text: "เดือน", value: "month" }
];

const number = [
  { key: "2", text: "2 ครั้ง", value: "2" },
  { key: "3", text: "3 ครั้ง", value: "3" },
  { key: "4", text: "5 ครั้ง", value: "4" },
  { key: "5", text: "8 ครั้ง", value: "5" },
  { key: "6", text: "10 ครั้ง", value: "6" }
];

const format = "HH:mm";

class Bill extends React.Component {
  state = { activeItem: "Owner", Owner: [],allOwner:0,showWireframe:false,check:false };
  async componentDidMount() {
    try {
      const response = await axios.get(`/Bill?billowner=${this.props.id}`);
      console.log(response)
      if (response.status === 200) {
        this.setState({
          Owner: response.data
        });
        let allOwner = response.data.reduce((all, dep) => {
          return dep.amount + all;
        }, 0)
        this.setState({allOwner})
      }
    } catch (error) {
      console.error(error);
    }
  }
  submit = () => {
    Swal.fire({
      icon: 'success',
      title: 'Save Complete',
      timer: 2000,
    }).then((result) => {
      history.push('/billdetail');
    });
  }

  renderlist = () => {
    return this.state.Owner.map(g => {
      console.log(g.flag);

      return (
        <Card.Group>
          <Label color={g.flag === "อาหาร" ? "purple" : "orange"} ribbon>
            {g.flag}
          </Label>
          <Card
            fluid
            style={{ backgroundColor: "#F5F5F5" }}
            textAlight="center"
          >
            <Card.Content>
              <Card.Header>{g.name}</Card.Header>
              <Header
                as="h4"
                color="green"
                textAlign="right"
                style={{ marginTop: "-1.5rem" }}
              >
                {g.amount} บาท
              </Header>
            </Card.Content>
          </Card>
          <Checkbox style={{ margin: "2.8rem 0 0 1.3rem" }} onChange={this.handleclick}/>
        </Card.Group>
      );
    });
  };

  handleWireframe = (e, { checked }) =>{
    console.log(checked)
    this.setState({ showWireframe: checked });
  }
  handleclick = (e, { checked }) =>{
    this.setState({ check: checked });
  }

  render() {
    const { activeItem } = this.state;
    const { calculations, showWireframe } = this.state;
    return (
      <Navbar>
        <h2>{this.props.username}</h2>
        <h2 style={{ marginTop: "-1rem", fontSize: "2rem" }}>ทวงเงิน</h2>
        <Image
          src={profile}
          size="medium"
          circular
          style={{
            maxWidth: "60px",
            position: "absolute",
            top: "6.1rem",
            right: "2rem"
          }}
        />
        <Message
          style={{
            maxWidth: "80%",
            display: "flex",
            marginLeft: "2.5rem",
            height: "100px"
          }}
        >
          <Message.Header>ติดเงินรวม</Message.Header>
          <h3>{this.state.allOwner}</h3>
          <p style={{ margin: "2.5rem 0.5rem" }}>บาท</p>
        </Message>
        <Segment attached="bottom">
          <List divided relaxed verticalAlign="middle">
            <h5 style={{ marginLeft: "1rem" }}>รายการ</h5>
            {this.renderlist()}
          </List>
          <h5 style={{ marginLeft: "1rem", marginTop: "2rem" }}>ข้อความ</h5>
          <Form>
            <TextArea defaultValue="รบกวนคืนเงินด้วยนะ" />
          </Form>
          <Checkbox
            label="ทำซ้ำ"
            style={{ marginLeft: "1rem", marginTop: "2rem" }}
            value="repeat"
            onChange={this.handleWireframe}
          />

          {showWireframe ? (
            <Container>
              <Form>
                <Form.Group inline>
                  <label>ทุกๆ</label>
                  <Form.Select
                    fluid
                    options={frequency}
                    placeholder="วัน"
                    style={{ width: "15rem", left: "4rem" }}
                  />
                </Form.Group>
                <Form.Group inline>
                  <label>เตือนซ้ำ</label>
                  <Form.Select
                    fluid
                    options={number}
                    placeholder="2 ครั้ง"
                    style={{ width: "15rem", left: "2.5rem" }}
                  />
                </Form.Group>
                <Form.Group inline>
                  <label>เวลา</label>
                  <Form.Input
                    fluid
                    placeholder="09.00"
                    style={{ width: "15rem", left: "4rem" }}
                  />
                </Form.Group>
              </Form>
            </Container>
          ) : null}
          <Button
            color="green"
            style={{
              position: "relative",
              left: "17rem",
              top: "2rem",
              marginBottom: "1rem",
              display: "block"
            }}
            disabled={!this.state.check}
            onClick={this.submit}
          >
            ทวงเงิน
          </Button>
          <Button
            inverted
            color="red"
            style={{
              position: "relative",
              left: "2rem",
              top: "-1.5rem",
              marginBottom: "1rem"
            }}
            href="/billdetail"
          >
            ยกเลิก
          </Button>
        </Segment>
      </Navbar>
    );
  }
}
const mapStateToprops = state => {
  return { id: state.auth.id, username: state.auth.username,allowner:state.money.allOwner };
};
export default connect(mapStateToprops, null)(Bill);