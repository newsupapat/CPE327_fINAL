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
  Progress,
  Header,
  Popup,
  Button
} from "semantic-ui-react";
import "./home.css";
import axios from "axios.js";
import logo from "asset/image/logo.png";
import profile from "asset/image/ProfilePict.png";
import { Link } from "react-router-dom";

export default class Homepage extends React.Component {
  state = { activeItem: "friend", groups: [] };
  async componentDidMount() {
    try {
      let response = await axios.get("/groups");
      if (response.status === 200) {
        this.setState({
          groups: response.data
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  renderlist = () => {
    if (this.state.activeItem === "group") {
      console.log(this.state.groups);
      return this.state.groups.map((g, index) => {
        return (
          <List.Item key={index}>
            <List.Content floated="right" style={{ paddingRight: "1rem" }}>
              <Header as="h4" textAlign="right">
                เงินกองกลาง
              </Header>
              <Header as="h4" color="green" textAlign="right">
                {g.pool + "  บาท"}
              </Header>
            </List.Content>
            <Image avatar src="https://picsum.photos/200/300" />
            <List.Content>
              <List.Header>{g.name}</List.Header>
            </List.Content>
          </List.Item>
        );
      });
    }
    return (
      <>
        <List.Item>
          <List.Content floated="right" style={{ paddingRight: "1rem" }}>
            <Header as="h4" color="red" textAlign="right">
              คุณติดเงิน
            </Header>
            <Header as="h4" color="red" textAlign="right">
              100.00 บาท
            </Header>
          </List.Content>
          <Image avatar src="https://picsum.photos/200/300" />
          <List.Content>
            <List.Header>Helen</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated="right" style={{ paddingRight: "1rem" }}>
            <Header as="h4" color="green" textAlign="right">
              ติดเงินคุณ
            </Header>
            <Header as="h4" color="green" textAlign="right">
              500.00 บาท
            </Header>
          </List.Content>
          <Image avatar src="https://picsum.photos/200/300" />
          <List.Content>
            <List.Header>Christian</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content floated="right" style={{ paddingRight: "1rem" }}>
            <Header as="h4" color="red" textAlign="right">
              คุณติดเงิน
            </Header>
            <Header as="h4" color="red" textAlign="right">
              900.00 บาท
            </Header>
          </List.Content>
          <Image avatar src="https://picsum.photos/200/300" />
          <List.Content>
            <List.Header>Daniel</List.Header>
          </List.Content>
        </List.Item>
      </>
    );
  };
  render() {
    const { activeItem } = this.state;

    return (
      <Navbar>
        <div className="profile">
          <Progress
            percent={100}
            size={"large"}
            style={{
              marginBottom: "0px",
              transform: "rotate(0deg) scaleX(-1)"
            }}
            color="red"
          />
          <Image
            src={profile}
            size="medium"
            circular
            style={{ position: "absolute", zIndex: "1", maxWidth: "100px" }}
          />
          <Progress
            percent={52}
            size={"large"}
            style={{ marginBottom: "0px" }}
          />
        </div>
        <Menu attached="top" tabular>
          <Menu.Item
            name="friend"
            content="เพื่อน"
            className="fix_column"
            active={activeItem === "friend"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="group"
            content="กลุ่ม"
            className="fix_column"
            active={activeItem === "group"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="noti"
            content="แจ้งเตือน"
            className="fix_column"
            active={activeItem === "noti"}
            onClick={this.handleItemClick}
          />
        </Menu>
        <Segment
          attached="bottom"
          style={{ height: '67vh',
            overflow: 'scroll' }}
        >
          <List divided relaxed verticalAlign="middle">
            {this.renderlist()}
          </List>
          <div>
            <Popup
              trigger={
                <Button
                  icon="add"
                  content="เพิ่ม"
                  style={{
                    boxShadow:
                      " 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                    backgroundColor: "indianred",
                    color: "white",
                    position: "fixed",
                    bottom: "50px",
                    right: "30px",
                    zIndex: "1"
                  }}
                />
              }
              content={
                <Button.Group vertical>
                  <Button
                    icon="user"
                    content="เพื่อน"
                    primary
                    style={{ marginBottom: "20px" }}
                  ></Button>
                  <Link to="addgroup">
                    <Button icon="users" content="กลุ่ม" primary></Button>
                  </Link>
                </Button.Group>
              }
              on="click"
              position="top right"
            />
          </div>
        </Segment>
      </Navbar>
    );
  }
}
