import React from 'react';
import Navbar from 'components/Navbars';
import { Segment, Dropdown, Card, Input, Button } from 'semantic-ui-react';
import { Container, Row, Col } from 'reactstrap';
import { Formik, Form, Field, FieldArray } from 'formik';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import './bill.css';
import axios from 'axios.js';
import history from 'history.js';
class AddBILL extends React.Component {
  state = {
    name: null,
    flag: null,
    detail: [{ name: null, price: null, friend: [] }],
    friendoption: [],
    submit: false,
  };
  MyInput = ({ field, form, ...props }) => {
    return (
      <Input
        style={{
          width: '100%',
        }}
        {...field}
        {...props}
      />
    );
  };
  onsubmit = async (value) => {
    const { name, flag, submit } = this.state;
    if (submit) {
      let d = new Date();
      this.setState({ submit: false });
      let amount = value.detail.reduce((a, d) => {
        return a + d.price;
      }, 0);
      console.log(value);
      let billdetail = {
        ...value,
        name,
        flag,
        date: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`,
        amount,
        billowner: this.props.id,
      };
      try {
        let response = await axios.post('/Bill', billdetail);
        console.log(response);
        if (response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Save Complete',
            timer: 2000,
          }).then((result) => {
            history.push('/');
          });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log(value);
    }
  };
  async componentDidMount() {
    try {
      let res = await axios.get('/friend');
      if (res.status === 200) {
        console.log(res);
        let friendoption = res.data.map((friend, index) => {
          return { key: index, text: friend.name, value: friend };
        });
        this.setState({
          friendoption,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    const category = [
      { key: 1, text: 'อาหาร', value: 'อาหาร' },
      { key: 2, text: 'เสื้อผ้า', value: 'เสื้อผ้า' },
      { key: 3, text: 'เดินทาง', value: 'เดินทาง' },
      { key: 4, text: 'อื่นๆ', value: 'อื่นๆ' },
    ];
    return (
      <Navbar>
        <h1>สร้างบิล</h1>
        <Segment raised style={{ height: ' 100%' }}>
          <Container>
            <h5>Name:</h5>
            <Input
              fluid
              placeholder='Search...'
              onChange={(e) => this.setState({ name: e.target.value })}
              value={this.state.name}
            />
            <h4 style={{ marginTop: '10px' }}>หมวดหมู่</h4>
            <Dropdown
              selection
              options={category}
              onChange={(e, data) => {
                console.log(data.value);
                this.setState({ flag: data.value });
              }}
              placeholder='เลือกหมวดหมู่'
            />
          </Container>
          <hr style={{ backgroundColor: 'Lightgray', height: '1px' }} />
          <Formik
            initialValues={{
              detail: [{ name: '', price: '', friend: [] }],
            }}
            onSubmit={(values) => this.onsubmit(values)}
            render={({ values }) => (
              <Form>
                <FieldArray
                  name='detail'
                  render={(arrayHelpers) => (
                    <div>
                      {values.detail && values.detail.length > 0 ? (
                        values.detail.map((d, index) => (
                          <div key={index}>
                            <Card
                              style={{
                                margin: 'auto',
                                marginTop: '5%',
                                padding: '20px',
                                width: '100%',
                              }}
                            >
                              <Row style={{ marginBottom: '20px' }}>
                                <Col xs='4'>
                                  <label>ชื่อรายการ</label>
                                </Col>
                                <Col
                                  xs='8'
                                  style={{
                                    paddingLeft: '0px',
                                  }}
                                >
                                  <Field
                                    name={`detail.${index}.name`}
                                    placeholder='name'
                                    type='text'
                                    value={d.name}
                                    component={this.MyInput}
                                  />
                                </Col>
                              </Row>
                              <Row style={{ marginBottom: '20px' }}>
                                <Col xs='4'>
                                  <label>จำนวนเงิน</label>
                                </Col>
                                <Col
                                  xs='8'
                                  style={{
                                    paddingLeft: '0px',
                                  }}
                                >
                                  <Field
                                    name={`detail.${index}.price`}
                                    placeholder='price'
                                    value={d.price}
                                    type='number'
                                    component={this.MyInput}
                                  />
                                </Col>
                              </Row>
                              <Row style={{ marginBottom: '20px' }}>
                                <Col xs='4'>
                                  <label>เพื่อน</label>
                                </Col>
                                <Col xs='8'>
                                  <Field
                                    name='friend'
                                    render={({ field, form }) => (
                                      <Dropdown
                                        style={{
                                          backgroundColor: 'white',
                                          width: '106%',
                                          margin: '0px 0px 0px -15px',
                                        }}
                                        onChange={(e, data) =>
                                          form.setFieldValue(
                                            `detail.${index}.friend`,
                                            data.value
                                          )}
                                        fluid
                                        multiple
                                        selection
                                        options={this.state.friendoption}
                                        placeholder='เลือกเพื่อน'
                                      />
                                    )}
                                  />
                                </Col>
                              </Row>
                              <Card.Content extra>
                                <div className='ui two buttons'>
                                  <Button
                                    basic
                                    color='green'
                                    onClick={() =>
                                      arrayHelpers.insert(index, {
                                        name: '',
                                        price: '',
                                        friend: [],
                                      })}
                                  >
                                    Add
                                  </Button>
                                  <Button
                                    basic
                                    color='red'
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </Card.Content>
                            </Card>
                          </div>
                        ))
                      ) : (
                        <Button
                          basic
                          color='green'
                          //type='button'
                          onClick={() =>
                            arrayHelpers.push({
                              name: '',
                              price: '',
                              friend: [],
                            })}
                        >
                          {/* show this when user has removed all friends from the list */}
                          Add Bill
                        </Button>
                      )}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginTop: '5%',
                        }}
                      >
                        <Button
                          type='submit'
                          color='green'
                          onClick={(e) => this.setState({ submit: true })}
                          style={{ width: '60%', padding: '5%' }}
                        >
                          ตกลง
                        </Button>
                      </div>
                    </div>
                  )}
                />
              </Form>
            )}
          />
        </Segment>
      </Navbar>
    );
  }
}
const mapStateToprops = (state) => {
  return { id: state.auth.id };
};
export default connect(mapStateToprops, null)(AddBILL);
