import React from 'react';
import Navbar from 'components/Navbars';
import { Input, Menu, Segment,List,Image } from 'semantic-ui-react';
import logo from 'asset/image/logo.png'

export default class Notification extends React.Component {
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
        <div>Notification</div>
        <h1>test</h1>
      </Navbar>
    )
  }
}