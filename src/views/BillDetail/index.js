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
import './BIllDetail.css'
import axios from "axios.js";
import logo from "asset/image/logo.png";
import { Link } from 'react-router-dom';
import profile from "asset/image/ProfilePict.png";

export default class Bill extends React.Component {
  state = { activeItem: "Debter", Owner: [], Debter: [] };
  async componentDidMount() {
    try {
      let response = await axios.get("/Owner");
      if (response.status === 200) {
        console.log(response);
        this.setState({
          Owner: response.data
        });
      }
      response = await axios.get("/Debter");
      if (response.status === 200) {
        console.log(response);
        this.setState({
          Debter: response.data
        });
      }
    } catch (error) {
      console.error(error);
    }
  }


  renderlist = () => {
    if (this.state.activeItem === "Owner") {
      console.log(this.state.Owner);
      return this.state.Owner.map(g => {

        return (
          <Link to={`/summaryBills/${g.id}`}>
          <Card.Group>
            <Label color={g.flag === "อาหาร" ? "purple" : "orange"} ribbon>
              {g.flag}
            </Label>
            <Card
              fluid
              style={{ backgroundColor: "#F5F5F5" }}
              //href="src\views\loginPage\index.js"
              textAlight="center"
            >
              <Card.Content>
                <Card.Header>{g.name}</Card.Header>
                <Header
                  as="h6"
                  textAlign="left"
                  style={{ color: "lightgray", marginTop: "0rem" }}
                >
                  {g.date}
                </Header>
                <Header
                  as="h4"
                  color= "green"
                  textAlign="right"
                  className="cardDescriptionTop"
                >
                  ติดเงินคุณ
                </Header>
                <Header
                  as="h4"
                  color="green"
                  textAlign="right"
                  className="cardDescriptionBottom"
                >
                  {g.amount} บาท
                </Header>
              </Card.Content>
            </Card>
          </Card.Group>
          </Link>
        );
      });
    } else {
      console.log(this.state.Debter);
      return this.state.Debter.map(g => {
        return (
          <Card.Group>
            <Label color={g.flag === "อาหาร" ? "purple" : "orange"} ribbon>
              {g.flag}
            </Label>
            <Card
              fluid
              style={{ backgroundColor: "#F5F5F5" }}
              //href="src\views\loginPage\index.js"
              textAlight="center"
            >
              <Card.Content>
                <Card.Header>{g.name}</Card.Header>
                <Header
                  as="h6"
                  textAlign="left"
                  style={{ color: "lightgray", marginTop: "0rem" }}
                >
                  {g.date}
                </Header>
                <Header
                  as="h4"
                  color={"red"}
                  textAlign="right"
                  className="cardDescriptionTop"
                >
                  คุณติดเงิน
                </Header>
                <Header
                  as="h4"
                  color={g.type === "ติดเงินคุณ" ? "green" : "red"}
                  textAlign="right"
                  className="cardDescriptionBottom"
                >
                  {g.amount} บาท
                </Header>
              </Card.Content>
            </Card>
          </Card.Group>
        );
      });
    }
  };

  handleChange(event) {
    this.setState({value: event.target.value});
  }

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
        <Segment attached="bottom" style={{height: '60vh'}}>
          <List divided relaxed verticalAlign="middle">
            {this.renderlist()}
          </List>
        </Segment>
      </Navbar>
    );
  }
}
