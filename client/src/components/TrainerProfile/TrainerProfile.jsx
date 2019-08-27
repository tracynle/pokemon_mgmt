import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import AddPokemonButton from "../../components/AddPokemonButton/AddPokemonButton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style.css";
import { connect } from "react-redux";
import { saveName } from "../../actions";
import EditIcon from  "../../media/editicon.png";
import PokemonProfile from "../../components/PokemonProfile/PokemonProfile";
import DeleteTrainerButton  from "../../components/DeleteTrainerButton/DeleteTrainerButton";


function TrainerProfile(props) {
    const [state, setState] = useState({
        editTrainer: false,
        editedName: ""
    });

    let editTrainerName = () => {
        // create a function on click 
        if (state.editTrainer == true) {
            setState({
                ...state,
                editTrainer: false
            })
        }
        else {
            setState({
                ...state,
                editTrainer: true
            })
        }
    }

    let saveTrainersName = (event) => {
        setState({
            ...state,
            editedName: event.target.value
        })
        props.saveName(event.target.value, props.name);
        
        // by saving the name, it needs to be saved and changed from the db
        // once name has been changed, dispatch
        // (call to api will be made in Actions)
    }

    let enterKey = (event) => {
        console.log(event.key);
        if (event.key === 'Enter') {
            console.log('Changing to false');
            setState({
                ...state,
                editTrainer: false
            })
        }
    }
    
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
                            <Card.Header as="h5" >
                                    
                                {state.editTrainer ? (
                                    <input type="text" 
                                        defaultValue={props.name} 
                                        onKeyPress={enterKey} 
                                        onChange={saveTrainersName}
                                    />
                                ) : 
                                ( 
                                    props.name
                                )}
                                
                                <img src={EditIcon} alt="" onClick={editTrainerName}></img>
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

// update pokemon props to the state
const mapStateToProps = (state, ownProps) => {
    console.log('mapStateToProps in TrainerProfile', state);
    let pokemons = state.trainerReducer.trainers[ownProps.name].pokemons;

    return {
        pokemons: [...pokemons]
    };
}
// mapDispatchToprops
// in actions, connect to API to dispatch name change
const mapDispatchToprops = (dispatch) => {
    return {
        saveName: (name, oldName) => {
            console.log("SAVED EDITED TRAINER NAME: ", name);
            dispatch(saveName(name, oldName));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToprops)(TrainerProfile);
//TO DO FOR DISPATCH: 
    // connect API to dispatch name to be saved 
    // dispatch editedTrainer name
    // make API call to db
    // specify WHERE and pass data to API 
    // make PUT request (updating)
    // id or prev.name that you want to save 
