import React from 'react';
import Navbar from 'components/Navbars';
import { Input, Menu, Segment,List,Image,Grid,Progress } from 'semantic-ui-react';
import './home.css'
import logo from 'asset/image/logo.png'
import profile from 'asset/image/logo512.png'

export default class MenuExampleTabularOnTop extends React.Component {
  state = { activeItem: 'bio' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  renderlist = () =>{
    return [...Array(10).keys()].map(e=> (
      <List.Item>
        <Image avatar src={logo} />
        <List.Content>
          <List.Header>Snickerdoodle</List.Header>
          An excellent companion
        </List.Content>
      </List.Item>
    ))
  }
  render() {
    const { activeItem } = this.state

    return (
      
      <Navbar>
        <div className="profile">
        <Progress percent={33} size={"large"} style={{marginBottom: "0px"}} />
        <Image src={profile} size='medium' circular />
        <Progress percent={33} size={"large"} style={{marginBottom: "0px"}} />
        </div>
        <Menu attached='top' tabular>
          <Menu.Item
            name='bio'
            className="fix_column"
            active={activeItem === 'bio'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='photos'
            className="fix_column"
            active={activeItem === 'photos'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='test'
            className="fix_column"
            active={activeItem === 'test'}
            onClick={this.handleItemClick}
          />
        </Menu>

        <Segment attached='bottom'>
            <List celled>
              {this.renderlist()}
          </List>
        </Segment>
      </Navbar>
    )
  }
}