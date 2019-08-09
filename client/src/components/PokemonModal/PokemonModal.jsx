import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import PokemonForm from "../PokemonForm/PokemonForm";

function pokemonModal(props) {
  return (
    <Modal show={props.show} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Pokemon
        </Modal.Title>
      </Modal.Header>
    
      <Modal.Body>
        <Container>
          <Row className="show-grid">
            <PokemonForm 
              onHide={props.onHide} 
            />
          </Row>
        </Container>
      </Modal.Body>
  
      <Modal.Footer>
        <Button 
          onClick={props.onHide}
        >
        Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
  
}

export default pokemonModal;
