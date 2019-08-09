import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { connect } from "react-redux";


function SearchModal(props) {
    let getSearchResults = props.searchResults.map(result => {
        return (
            <Container>
                {result.name}</Container>
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
                    {getSearchResults}
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