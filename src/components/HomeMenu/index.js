import React, { Component }  from 'react';
import {Menu} from 'semantic-ui-react'
import './homemenu.css';
export default class MenuExampleTabular extends Component{
    state = { activeItem: 'friend' } //change page??
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })


  render() {
        const { activeItem } = this.state
    return (
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
    )
}
}