import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import PokemonModal from "../../components/PokemonModal/PokemonModal";
import { connect } from "react-redux";
import { getAddToMeAction } from "../../actions";


function AddPokemonButton(props) {
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
                variant="success" 
                onClick={() => {
                    showModal();
                    // include onclick to dispatch a trainer to track of trainer once pokemon is added
                    props.dispatchAddToMe(props.name);
                }} 
            >
                Add Pokemon
            </Button>
            <PokemonModal 
                onHide={() => hideModal()} 
                show={state.modalShow}
            />
        </div>
    )
    
}

const mapDispatchToProps = (dispatch) => {

    // function returns props 
    return {
        dispatchAddToMe: (data) => {
            console.log("Pokemon linked to Trainer", data);
            let action = getAddToMeAction(data);
            dispatch(action);
        }
    }

}

export default connect(null, mapDispatchToProps)(AddPokemonButton);