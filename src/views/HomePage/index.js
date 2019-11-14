import React from 'react';
import Navbar from 'components/Navbars';
import { Input, Menu, Segment,List,Image } from 'semantic-ui-react';
import './home.css'
import logo from 'asset/image/logo.png'

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