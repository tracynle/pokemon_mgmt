import React from "react";
import Button from "react-bootstrap/Button";
import { getDeletePokemonAction } from "../../actions";
import { connect } from "react-redux";


function deletePokemonButton(props) {
    // delete pokemon from array when button is clicked on. Props will be dispatched
    return (
        <Button 
            variant="warning"
            onClick={() => {
                props.dispatchDelete(props.id, props.name);
            }}
        >
        Delete Pokemon
        </Button>
    )
    
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        dispatchDelete: (id, name) => {
            console.log("Pokemon Deleted!", id);
            let action = getDeletePokemonAction(id, name);
            dispatch(action);
        }
    }
}



export default connect(null, mapDispatchToProps)(deletePokemonButton);