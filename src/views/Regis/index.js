import React from "react";
import { Container, Button } from "semantic-ui-react";
import { Image } from 'semantic-ui-react';
import reg from "./reg.css";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  AutoComplete
} from "antd";

class Regis extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  state = {
    confirmDirty: false,
  };
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("โปรดระบุรหัสผ่านให้ตรงกัน");
    } else {
      callback();
    }
  };

  validatePhone = (rule,value, callback) =>{
    if(value.length===10)
    {
        callback();
    } else {
        callback("โปรดระบุเบอร์โทรศัพท์ให้ถูกต้อง");
    }
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    return (
      <Container>
        <div>
        <Image
          src={require('asset/image/logo.png')}
          size="small"
          style={{ position: 'relative',marginTop:'10%',marginBottom:'10%',marginLeft:'-5%' }}
        />
          <h3>สมัครสมาชิก</h3>
        </div>

        {/* form */}

        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="ชื่อผู้ใช้">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "กรุณาระบุชื่อผู้ใช้",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item label="รหัสผ่าน">
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "กรุณาระบุรหัสผ่าน"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input.Password visibilityToggle={false}/>)}
          </Form.Item>

          <Form.Item label="ยืนยันรหัสผ่าน">
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "กรุณายืนยันรหัสผ่าน"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input.Password visibilityToggle={false} onBlur={this.handleConfirmBlur} />)}
          </Form.Item>

          <Form.Item label="อีเมล">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "อีเมลไม่ถูกต้อง"
                },
                {
                  required: true,
                  message: "กรุณาระบุอีเมล"
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item label="เบอร์โทรศัพท์">
            {getFieldDecorator("phone", {
              rules: [
                { required: true, },
                {
                    validator: this.validatePhone
                }
              ],
              validateTrigger:['onBlur']
            })(
              <Input type="number" style={{ width: "100%" }} />
            )}
          </Form.Item>

          <Button inverted color="yellow" type="submit">
            สมัครสมาชิก
          </Button>
        </Form>
      </Container>
    );
  }
}

const WrapperdForm = Form.create()(Regis);

export default WrapperdForm;
