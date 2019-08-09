import React from "react";
import Card from "react-bootstrap/Card";
import AddPokemonButton from "../../components/AddPokemonButton/AddPokemonButton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style.css";
// import { addToMe } from "../../actions";
import { connect } from "react-redux";

import PokemonProfile from "../../components/PokemonProfile/PokemonProfile";
import DeleteTrainerButton  from "../../components/DeleteTrainerButton/DeleteTrainerButton";
function TrainerProfile(props) {

    // Retrieve pokemon data from each trainer
    // let getPokemons = (e) => {
    //     fetch("http://localhost:3001/api/" + props.name + "/pokemons")
    //     .then(async (response) => {
    //         let jsonResponse = await response.json();
    //         console.log("Trainer's Pokemon(s):", jsonResponse);
            
    //         // store in state 
    //         // this.setState({
    //         //     pokemons: jsonResponse
    //         // });
    //     }).catch(error => console.log(error));
    // }

    
    // Map the pokemon's data from db
    let getPokemonsProfile = props.pokemons.map(pokemon => {
        return (
            <PokemonProfile 
                key={pokemon.id}
                id={pokemon.id}
                pokemonName={pokemon.name}
                type={pokemon.type}
                move={pokemon.move}
                name={props.name}
            />
        )
    })

    return (
        <div>
            <Container className="trainer-div">
                <Row className="justify-content-md-center">
                    <Col md="8">
                        <Card className="justify-content-md-center">
                            <Card.Header as="h5">
                                {props.name}
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <span className="list">
                                        {getPokemonsProfile}
                                    </span>
                                </Card.Text>
                                <Row>
                                    <Col>
                                        <AddPokemonButton
                                            name={props.name} 
                                            className="addButton"
                                        >
                                        </AddPokemonButton>
                                    </Col>
                                    <Col>
                                        <DeleteTrainerButton
                                            name={props.name}
                                            className="deleteButton"
                                        >
                                        </DeleteTrainerButton>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
    
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         dispatchAddToMe: (trainerName) => {
//             console.log("Dispatched AddToMe", trainerName);
//             dispatch(addToMe(trainerName));
//         }
//     }
// }

// update pokemon props to the state
const mapStateToProps = (state, ownProps) => {
    console.log('mapStateToProps in TrainerProfile', state);
    let pokemons = state.trainerReducer.trainers[ownProps.name].pokemons;

    return {
        pokemons: [...pokemons]
    };
}


export default connect(mapStateToProps)(TrainerProfile);