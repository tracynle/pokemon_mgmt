import React,{ useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import SearchModal from "../../components/SearchModal/SearchModal";
import { connect } from "react-redux";
import { getSearchAction } from "../../actions";
import "./SearchBar.css";

function SearchBar(props){
  const [state, setState] = useState({
    search: "",
    modalShow: false,
    clickedRadio: "trainer"
  });

  let searchInput = (e) => {
    console.log("SEARCHING: ", e);

    setState({
      ...state,
      search: e.target.value
    })
  }

  // create hideModal function and set the state to false
  let hideModal = () => {
    setState({
      ...state,
        modalShow: false
    })
  }

  // create showModal function and set to true (so that modal will show up once button is clicked)
  let showModal = () => {
      console.log("STATE", state);
      setState({
        ...state,
          modalShow: true
      })
  }

  let searchTypeRadioClicked = (e) => {
    console.log("Clicked radio!!!!", e.target.value);
    setState({
      ...state,
      clickedRadio: e.target.value
    })
  }


    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Col md={7}>
            <Navbar.Brand href="#home">Poké Trainer Stats</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Col>
          <Col md={5}>
            <Navbar.Collapse id="basic-navbar-nav">
              <Form inline>
                <FormControl 
                  type="text" 
                  name="search"
                  onChange= {searchInput}
                  laceholder="Search" 
                  className="mr-sm-2 searchBar" 
                  />
                <Button 
                  onClick={() => {
                    showModal();
                    props.search(state.search, state.clickedRadio);
                  }}
                  variant="outline-success"
                  >Search
                </Button>
                <span className="checkbox"> 
                  {state.clickedRadio == "trainer" ?
                      <span><input type="radio" name="search" value="trainer" checked onClick={searchTypeRadioClicked}/>Trainer<br/></span> :
                      <span><input type="radio" name="search" value="trainer" onClick={searchTypeRadioClicked}/>Trainer<br/></span> 
                  }
                  {state.clickedRadio == "pokemon" ?
                      <span><input type="radio" name="search" value="pokemon" checked onClick={searchTypeRadioClicked}/>Pokemon<br/></span> :
                      <span><input type="radio" name="search" value="pokemon" onClick={searchTypeRadioClicked}/>Pokemon<br/></span> 
                  }
                </span>
                <SearchModal
                  onHide={() => hideModal()}
                  show= {state.modalShow}
                />
              </Form>
            </Navbar.Collapse>
          </Col>
        </Navbar>

      </div>
    )
    
}

const mapDispatchtoProps = (dispatch) => {
  return {
    search: (data, checkedSearch) => {
      console.log("SEARCHING TRAINERS/POKEMON", data);
      let action = getSearchAction(data, checkedSearch);
      dispatch(action);
    }
  }
}



export default connect(null, mapDispatchtoProps)(SearchBar);