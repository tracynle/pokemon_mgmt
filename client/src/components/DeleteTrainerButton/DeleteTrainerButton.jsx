import React from "react";
import Button from "react-bootstrap/Button";
import { getDeleteTrainerAction } from "../../actions";
import { connect } from "react-redux";


function deleteTrainerButton(props) {
     
    return (
        <Button 
            variant="secondary"
            onClick={() => {
                // check if trainers have 0 pokemons or not from the state
                if (props.pokemons.length === 0) {
                    props.dispatchDeleteTrainer(props.name);
                } else {
                    // create an alert to tell user they can't delete trainer if there are pokemons in profile
                    alert("Trainer can't be deleted if there are Pokemons");
                }
            }}
        >
        Delete Trainer
        </Button>
        
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchDeleteTrainer: (name) => {
            console.log("Deleting trainer", name);
            let action = getDeleteTrainerAction(name);
            dispatch(action);
        }
    } 
}

// get access to the pokemons props from the store
const mapStateToProps = (state, ownProps) => {
    console.log("GETTING POKEMONS FROM STORE", state);
    let pokemons = state.trainerReducer.trainers[ownProps.name].pokemons;

    return {
        pokemons: [...pokemons]
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(deleteTrainerButton);