import React from 'react';
import Navbar from 'components/Navbars';
import HomeMenu from 'components/HomeMenu';
import {
  Menu,
  Segment,
  List,
  Image,
  Header,
  Message,
  Button,
  Card,
  Label,
} from 'semantic-ui-react';
import './BIllDetail.css';
import { Link } from 'react-router-dom';
import profile from 'asset/image/ProfilePict.png';
import { connect } from 'react-redux';
import { UpdateMoney } from 'actions/index';
import axios from 'axios.js'

class Bill extends React.Component {
  state = {
    activeItem: 'Debter'
  };
  async componentDidMount() {
    try {
      let response = await axios.get(`/Bill`);
      let money = {}
      if (response.status === 200) {
        let owner = response.data.filter((o) => o.billowner === this.props.id)
        money.Owner = owner
        let depter = this.finddepter(
          response.data.filter((o) => o.billowner !== this.props.id)
        );
        money.Debter =depter.filter((d) => d.depter !== 0)
        money.alldepter = depter.reduce((all, dep) => {
          return dep.depter + all;
        }, 0)
        money.allOwner = owner.reduce((all, dep) => {
          return dep.amount + all;
        }, 0)
        this.props.UpdateMoney(money)
      }
    } catch (error) {
      console.error(error);
    }
  }
  finddepter(filterOwner) {
    let response = filterOwner.map((depter) => {
      return {
        ...depter,
        depter: depter.detail.reduce((sumup, detail) => {
          if (detail.friend.some((f) => f.userid === this.props.id)) {
            return sumup + detail.price / detail.friend.length;
          }
          return sumup;
        }, 0)
      };
    });
    return response;
  }
  renderlist = () => {
    if (this.state.activeItem === 'Owner') {
      return this.props.Owner && this.props.Owner.map((g) => {
        return (
          <Link to={`/summaryBills/${g.id}`}>
            <Card.Group style={{width: '100%'}}>
              <Label color={g.flag === 'อาหาร' ? 'purple' : 'orange'} ribbon>
                {g.flag}
              </Label>
              <Card
                fluid
                style={{ backgroundColor: '#F5F5F5' }}
                //href="src\views\loginPage\index.js"
                textAlight='center'
              >
                <Card.Content>
                  <Card.Header>{g.name}</Card.Header>
                  <Header
                    as='h6'
                    textAlign='left'
                    style={{ color: 'lightgray', marginTop: '0rem' }}
                  >
                    {g.date}
                  </Header>
                  <Header
                    as='h4'
                    color='green'
                    textAlign='right'
                    className='cardDescriptionTop'
                  >
                    ติดเงินคุณ
                  </Header>
                  <Header
                    as='h4'
                    color='green'
                    textAlign='right'
                    className='cardDescriptionBottom'
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
      return this.props.Debter && this.props.Debter.map((g) => {
        return (
          <Card.Group>
            <Label color={g.flag === 'อาหาร' ? 'purple' : 'orange'} ribbon>
              {g.flag}
            </Label>
            <Card
              fluid
              style={{ backgroundColor: '#F5F5F5',width: '100%' }}
              //href="src\views\loginPage\index.js"
              textAlight='center'
            >
              <Card.Content>
                <Card.Header>{g.name}</Card.Header>
                <Header
                  as='h6'
                  textAlign='left'
                  style={{ color: 'lightgray', marginTop: '0rem' }}
                >
                  {g.date}
                </Header>
                <Header
                  as='h4'
                  color={'red'}
                  textAlign='right'
                  className='cardDescriptionTop'
                >
                  คุณติดเงิน
                </Header>
                <Header
                  as='h4'
                  color={g.type === 'ติดเงินคุณ' ? 'green' : 'red'}
                  textAlign='right'
                  className='cardDescriptionBottom'
                >
                  {g.depter} บาท
                </Header>
              </Card.Content>
            </Card>
          </Card.Group>
        );
      });
    }
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Navbar>
        <Button
          color='red'
          href='/notiplanner'
          style={
            this.state.activeItem === 'Debter' ? (
              { display: 'none' }
            ) : (
              { display: 'block' }
            )
          }
        >
          ทวงเงิน
        </Button>
        <h2>{this.props.username}</h2>
        <Image
          src={profile}
          size='medium'
          circular
          style={{
            maxWidth: '60px',
            position: 'absolute',
            top: '6.1rem',
            right: '2rem',
          }}
        />
        <Message
          style={{
            maxWidth: '80%',
            display: 'flex',
            marginLeft: '2.5rem',
            height: '100px',
            marginTop: '2rem',
          }}
        >
          <Message.Header>ติดเงินรวม</Message.Header>
          <h3
            style={this.state.activeItem === 'Debter' ? { color: 'red' } : {}}
          >
            {this.state.activeItem === 'Debter' ? this.props.alldepter : this.props.allOwner}
          </h3>
          <p style={{ margin: '2.5rem 0.5rem' }}>บาท</p>
        </Message>

        <Menu attached='top' tabular>
          <Menu.Item
            name='Debter'
            content='คุณติดเงิน'
            className='fix_column'
            active={activeItem === 'Debter'}
            style={{ width: '50%' }}
            onClick={(e) => this.setState({ activeItem: 'Debter' })}
          />
          <Menu.Item
            name='Owner'
            content='ติดเงินคุณ'
            className='fix_column'
            active={activeItem === 'Owner'}
            style={{ width: '50%' }}
            onClick={(e) => this.setState({ activeItem: 'Owner' })}
          />
        </Menu>
        <Segment attached='bottom' style={{ height: '60vh' }}>
          <List divided relaxed verticalAlign='middle'>
            {this.renderlist()}
          </List>
        </Segment>
      </Navbar>
    );
  }
}
const mapStateToprops = (state) => {
  return {
    id: state.auth.id,
    username: state.auth.username,
    Owner: state.money.Owner,
    Debter: state.money.Debter,
    alldepter: state.money.alldepter,
    allOwner: state.money.allOwner,
  };
};
export default connect(mapStateToprops, {UpdateMoney})(Bill);
