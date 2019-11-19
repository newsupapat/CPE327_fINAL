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
  Header
} from "semantic-ui-react";
import "./home.css";
import logo from "asset/image/logo.png";
import profile from "asset/image/ProfilePict.png";

export default class MenuExampleTabularOnTop extends React.Component {
  state = { activeItem: "friend" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  renderlist = () => {
    return (
      <>
        <List.Item>
          <List.Content floated='right'style={{paddingRight:'1rem'}}>
          <Header as='h4' color='red' textAlign='right' >คุณติดเงิน</Header>
          <Header as='h4' color='red' textAlign='right'>100.00 บาท</Header>
           </List.Content>
          <Image avatar src="https://picsum.photos/200/300" />
          <List.Content>
            <List.Header>Helen</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
        <List.Content floated='right'style={{paddingRight:'1rem'}}>
          <Header as='h4' color='green' textAlign='right' >ติดเงินคุณ</Header>
          <Header as='h4' color='green' textAlign='right'>500.00 บาท</Header>
           </List.Content>
          <Image avatar src="https://picsum.photos/200/300" />
          <List.Content>
            <List.Header>Christian</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
        <List.Content floated='right'style={{paddingRight:'1rem'}}>
          <Header as='h4' color='red' textAlign='right' >คุณติดเงิน</Header>
          <Header as='h4' color='red' textAlign='right'>900.00 บาท</Header>
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
            style={{ position: "absolute", zIndex: "1" }}
          />
          <Progress
            percent={52}
            size={"large"}
            style={{ marginBottom: "0px" }}
          />
        </div>
        <HomeMenu>
        </HomeMenu>
        <Segment attached="bottom">
          <List divided relaxed verticalAlign='middle'>
            {this.renderlist()}
          </List>
        </Segment>
      </Navbar>
    );
  }
}
