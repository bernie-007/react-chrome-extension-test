import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      domain: window.location.hostname,
      url: window.location.href,
      ismodalOpen: true
    };

    this.toggle = this.toggle.bind(this);
    this.clickSubmit = this.clickSubmit.bind(this);
  }


  toggle() {
    this.setState({
      ismodalOpen: !this.state.ismodalOpen,
    });
  }

  async clickSubmit() {
    this.toggle();
    
    try {
      const response = await axios.post('http://youta-api.ngrok.io/starter-project/', { 
        timestamp: new Date().getTime(),
        username: 'berniedev007@gmail.com',
        domain: this.state.domain,
        url: this.state.url
      });
      console.log('👉 Returned data:', response);
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }
  }

  render() {
    return (
      <div className="App">
        <Modal className="extModal" show={this.state.ismodalOpen} onHide={this.toggle}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.domain}</Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="primary" onClick={this.clickSubmit}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default App;
