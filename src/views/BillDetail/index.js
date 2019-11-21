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
  Message,
  Button,
  Card,
  Label
} from "semantic-ui-react";
import "./BillDetail.css";
import logo from "asset/image/logo.png";
import profile from "asset/image/ProfilePict.png";

export default class Bill extends React.Component {
  state = { activeItem: "Debter" };

  renderlist = () => {
    return (
      <Card.Group>
        <Label color="purple" ribbon>
          Food
        </Label>
        <Card
          fluid
          header="นักเก็ต "
          style={{ backgroundColor: "#F5F5F5" }}
        />
        <Label color="orange" ribbon>
          Group
        </Label>
        <Card
          fluid
          header="กางเกง"
          style={{ backgroundColor: "#F5F5F5"}}
        />
        <Label color="green" ribbon>
          Fashion
        </Label>
        <Card
          fluid
          header="ทริปพัทยา"
          style={{ backgroundColor: "#F5F5F5" }}
        />
      </Card.Group>
    );
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Navbar>
        <Button color="red">ทวงเงิน</Button>
        <h2>Loman</h2>
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
            height: "100px",
            marginTop: "2rem"
          }}
        >
          <Message.Header>ติดเงินรวม</Message.Header>
          <h3>1,000.00</h3>
          <p style={{ margin: "2.5rem 0.5rem" }}>บาท</p>
        </Message>

        <Menu attached="top" tabular>
          <Menu.Item
            name="Debter"
            content="คุณติดเงิน"
            className="fix_column"
            active={activeItem === "Debter"}
            onClick={e => this.setState({ activeItem: "Debter" })}
          />
          <Menu.Item
            name="Owner"
            content="ติดเงินคุณ"
            className="fix_column"
            active={activeItem === "Owner"}
            onClick={e => this.setState({ activeItem: "Owner" })}
          />
        </Menu>
        <Segment attached="bottom">
          <List divided relaxed verticalAlign="middle">
            {this.renderlist()}
          </List>
        </Segment>
      </Navbar>
    );
  }
}
