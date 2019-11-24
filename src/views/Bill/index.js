import React from 'react';
import Navbar from 'components/Navbars';
import { Segment, Dropdown, Card, Input, Button } from 'semantic-ui-react';
import { Container, Row, Col } from 'reactstrap';
import { Formik, Form, Field, FieldArray } from 'formik';

import './bill.css';
export default class AddBILL extends React.Component {
  state = {
    name: null,
    flag: null,
    detail: [{ name: null, price: null, friend: [] }],
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
  render() {
    const category = [
      { key: 1, text: 'อาหาร', value: 'อาหาร' },
      { key: 2, text: 'เสื้อผ้า', value: 'เสื้อผ้า' },
      { key: 3, text: 'เดินทาง', value: 'เดินทาง' },
      { key: 4, text: 'อื่นๆ', value: 'อื่นๆ' },
    ];

    const friend = [
      { key: 1, text: 'kat', value: 1 },
      { key: 2, text: 'new', value: 2 },
      { key: 3, text: 'rose', value: 3 },
      { key: 4, text: 'tangkwa', value: 4 },
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
              detail: [{ name: null, price: null, friend: [] }],
            }}
            onSubmit={(values) => console.log(values)}
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
                                    type='text'
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
                                    render={({ field,form }) => (
                                      <Dropdown
                                        style={{
                                          backgroundColor: 'white',
                                          width: '106%',
                                          margin: '0px 0px 0px -15px',
                                        }}
                                        {...field}
                                        onChange={(e, data) =>
                                          form.setFieldValue(`detail.${index}.friend`, data.value)}
                                        value={d.friend}
                                        fluid
                                        multiple
                                        selection
                                        options={friend}
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
                                        name: null,
                                        price: null,
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
                        <button
                          type='button'
                          onClick={() =>
                            arrayHelpers.push({
                              name: null,
                              price: null,
                              friend: [],
                            })}
                        >
                          {/* show this when user has removed all friends from the list */}
                          Add a friend
                        </button>
                      )}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginTop: '5%',
                        }}
                      >
                        <Button
                          color='green'
                          type='submit'
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
