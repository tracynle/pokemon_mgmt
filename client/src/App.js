import React, { useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import AddTrainerButton from './components/AddTrainerButton/AddTrainerButton';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import TrainerProfile from './components/TrainerProfile/TrainerProfile';
import { getTrainersAction } from "./actions";
import { connect } from 'react-redux';
import Footer from './components/Footer/Footer';

function App(props) {
  // This replaces componentDidMount (that was in the class but we're using function)
  let callbackFunctionAfterMounted = () => {
    props.dispatchFetchTrainers();
  }
  useEffect(callbackFunctionAfterMounted, []);
  // Map the trainer's data from db
  let getTrainerProfile = Object.values(props.trainers).map(trainer => {
    return (
      <TrainerProfile 
        key={trainer.id}
        id={trainer.id}
        name={trainer.name}
        pokemon_owned={trainer.pokemon_owned}
        pokemons= {trainer.pokemons}
      />

    )
  })

  // map search results in searchbar

  return (
    <div className="App">
      <SearchBar/>
      <Container className="trainerButtons">
        <Row className="justify-content-lg-center">
          <Col md="6">
            <AddTrainerButton />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            {getTrainerProfile}
          </Col></Row>
      </Container>
      <Footer></Footer>
    </div>
  );
  
}

// This function gets called when the Redux store gets updated
// maps the changed state to the mapped properties
function mapStateToProps(fullState) {
  console.log('mapStateToProps in App', fullState);
  return {
    trainers: fullState.trainerReducer.trainers,
    
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchFetchTrainers: () => {
      dispatch(getTrainersAction());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
