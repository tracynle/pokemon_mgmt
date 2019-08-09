import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./style.css";
import { addTrainer } from "../../actions";
import { connect } from 'react-redux';

function TrainerForm(props) {
  const [state, setState] = useState({
    trainerName: ""
  });

  let nameInput = (e) => {
    console.log("EEEEE", e)
    setState({
      trainerName: e.target.value
    });
  }

  return (
    <Form className="trainerForm">
        <Form.Group controlId="formBasic">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={nameInput} type="text" placeholder="Enter name" />
        </Form.Group>
    
        {/* <Form.Group controlId="formBasic">
          <Form.Label>Pokemon</Form.Label>
          <Form.Control type="text" placeholder="Pokemon name" />
        </Form.Group>
        
        <Form.Group controlId="formBasic">
          <Form.Label>Type</Form.Label>
          <Form.Control type="text" placeholder="Enter type" />
        </Form.Group>

        <Form.Group controlId="formBasic">
          <Form.Label>Move</Form.Label>
          <Form.Control type="text" placeholder="Enter moves" />
        </Form.Group> */}

        <Button 
          variant="primary" 
          onClick={() => {
            props.onHide();
            props.submitForm({
              name: state.trainerName,
              pokemons: []
        })}}>
          Submit
        </Button>
    </Form>
  )

}

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (data) => {
        console.log("Submitted", data);
        dispatch(addTrainer(data));
    }
  }
}

export default connect(null, mapDispatchToProps)(TrainerForm);