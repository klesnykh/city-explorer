import React from "react";
import {Form, Button } from 'react-bootstrap';


class CityForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cityNameInput: ''
    }
  }

  handleCityInput = (event) =>{
    this.setState({
      cityNameInput: event.target.value
    });
  }

  citySubmitHelper = (event) => {
    event.preventDefault();
    this.props.citySubmit(this.state.cityNameInput);
  }

  render(){
    return(
      <>
        <Form onSubmit={this.citySubmitHelper}>
          <Form.Label>Pick a City
            <Form.Control type="text" onChange={this.handleCityInput} />
          </Form.Label>
          <Button variant="primary" type="submit">Explore!</Button>
        </Form>
      </>
    );
  }
}

export default CityForm;