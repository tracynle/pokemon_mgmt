import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./style.css";
import { getAddPokemonAction} from "../../actions";
import { connect } from "react-redux";

function PokemonForm(props) {
  const [state, setState] = useState({
    name: "",
    type: "",
    move: ""
  });

  let nameInput = (e) => {
    console.log("POKEMON name", e)

    setState({
      ...state,
      name: e.target.value
    })
  }
  
  let typeInput = (e) => {
    console.log("POKEMON type", e)

    setState({
      ...state,
      type: e.target.value
    })
  }
  
  let moveInput = (e) => {
    console.log("POKEMON move", e)

    setState({
      ...state,
      move: e.target.value
    })
  }

  return (
    <Form className="pokemonForm">
      <Form.Group controlId="formName">
        <Form.Label>Pokemon</Form.Label>
        <Form.Control type="text" id="name" name="name" onChange={nameInput} placeholder="Pokemon name" />
      </Form.Group>
      
      <Form.Group controlId="formType">
        <Form.Label>Type</Form.Label>
        <Form.Control type="text" id="type" name="type" onChange={typeInput} placeholder="Enter type" />
      </Form.Group>

      <Form.Group controlId="formMove">
        <Form.Label>Move</Form.Label>
        <Form.Control type="text" id="move" name="move" onChange={moveInput} placeholder="Enter moves" />
      </Form.Group>

      <Button 
        variant="primary" 

        onClick={() => {
          props.onHide();
          props.submitForm({
              name: state.name,
              type: state.type,
              move: state.move
            },
            props.trainerName
        )}}     
        >
        Submit
      </Button>
    </Form>
  )
}

const mapDispatchToProps = (dispatch) => {
  
  return {
    submitForm: (data, trainerName) => {
      console.log("Submitted Pokemon Form!", data);
      dispatch(getAddPokemonAction(data, trainerName));
    }
  }
}

// Given updated state build new props for pokemonForm
const mapStateToProps = (state) => {
  return {
    trainerName: state.trainerReducer.addToMe
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonForm);