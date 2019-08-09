import React from "react";
import Button from "react-bootstrap/Button";
import { getDeleteTrainerAction } from "../../actions";
import { connect } from "react-redux";


function deleteTrainerButton(props) {
    
    return (
        <Button 
            variant="secondary"
            onClick={() => {
                props.dispatchDeleteTrainer(props.name);
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

export default connect(null, mapDispatchToProps)(deleteTrainerButton);