import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style.css";
import ListGroup from "react-bootstrap/ListGroup"
import DeletePokemonButton from "../../components/DeletePokemonButton/DeletePokemonButton";

function pokemonProfile(props) {
    
    return(
        <div>
            <Container className="pokemon-div">
                <Row className="justify-content-md-center">
                    <Col md="8">
                        <Card className="justify-content-md-center">
                            <span className="list">
                                <ListGroup>
                                    <ListGroup.Item>Pokemon: {props.pokemonName}</ListGroup.Item>
                                    <ListGroup.Item>Type: {props.type}</ListGroup.Item>
                                    <ListGroup.Item>Move: {props.move}</ListGroup.Item> 
                                    <DeletePokemonButton 
                                        className="deleteButton"
                                        id={props.id}
                                        name={props.name}
                                    ></DeletePokemonButton>
                                </ListGroup>
                            </span>
                        <Row>
                        </Row> 
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
    
}



export default pokemonProfile;