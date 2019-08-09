import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import TrainerModal from "../../components/TrainerModal/TrainerModal";


function AddTrainerButton(props) {
    const [state, setState] = useState({
        modalShow: false
    });

    // create hideModal function and set the state to false
    let hideModal = () => {
        setState({
            modalShow: false
        })
    }
    // create showModal function and set to true (so that modal will show up once button is clicked)
    let showModal = () => {
        console.log("STATE", state);
        setState({
            modalShow: true
        })
    }
    
   
    return (
        <div> 
            <Button 
                variant="danger" 
                onClick={() => showModal()} 
            >
                Add Trainer
            </Button>
            <TrainerModal 
                onHide={() => hideModal()} 
                show={state.modalShow}
            />
        </div>
    )
    
}

export default AddTrainerButton;