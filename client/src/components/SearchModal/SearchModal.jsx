import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";
import PokemonProfile from "../PokemonProfile/PokemonProfile";


function SearchModal(props) {
    let searchResults = props.searchResults.map(result => {
        // console.log("SEARCH RESULTS FROM SEARCHMODAL", searchResults);
        return (
            <Container>
                {result.name}

                {result.pokemons.map(pokemon => {
                    return (
                        <PokemonProfile 
                            key={pokemon.id}
                            id={pokemon.id}
                            pokemonName={pokemon.name}
                            type={pokemon.type}
                            move={pokemon.move}
                            name={props.name}
                            hideDelete={true}
                        />
                    )
                })}
            </Container>
        )
    })

    return (
            
        <Modal show={props.show} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                Results:
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <Container>
                    <Row className="show-grid">
                    {searchResults}
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

const mapStateToProps = (state, ownProps) => {
    console.log("SEARCH MODAL", state);
    return {
        searchResults: state.trainerReducer.searchResults
    }
}

export default connect(mapStateToProps)(SearchModal);