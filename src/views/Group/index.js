import React from 'react';
import Navbar from 'components/Navbars';

import './group.css';
import Step1 from './segment/step1';
import Step2 from './segment/step2';
import Step3 from './segment/step3';
export default class Group extends React.Component {
  state = {
    currentStep: 1,
    step1: null,
    friend: [],
  };
  handleSubmitStep1 = (value) => {
    this.setState({ step1: value });
    this.setState({ currentStep: 2 });
  };
  handleSubmitStep2 = (value) => {
    this.setState({ friend: value });
    this.setState({ currentStep: 3 });
  };
  render() {
    return (
      <Navbar>
        <Step1
          onsubmit={(e) => this.handleSubmitStep1(e)}
          currentstep={this.state.currentStep}
          value={this.state.step1}
        />
        <Step2
          onsubmit={(e) => this.handleSubmitStep2(e)}
          currentstep={this.state.currentStep}
        />
        <Step3
          onsubmit={(e) => this.handleSubmitStep2(e)}
          currentstep={this.state.currentStep}
          value={{ ...this.state.step1, friend: this.state.friend ,imagePreviewUrl:null}}
        />
      </Navbar>
    );
  }
}
