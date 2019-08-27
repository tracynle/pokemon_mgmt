// create a reducer that will keep track of added trainers and pokemon

// store initializes with 0 trainers in an empty array
const initialState = {
    trainers: {},
    addToMe: "",
    searchResults: []
};

const trainerReducer = (state = initialState, action) => {
    let newState;
    let trainersCopy = {...state.trainers};
    let trainer;

    switch(action.type) {

        case "FETCHED TRAINERS FROM API":
            action.data.map(trainer => {
                trainersCopy[trainer.name] = trainer;
            });

            newState = Object.assign({}, state, {trainers: trainersCopy});
            return newState;

        case "ADDED TRAINER":
            console.log("Case ADD TRAINER", action);
            console.log("ADD TRAINER state", state);

            // https://redux.js.org/basics/reducers
            // "..." is to spread trainers array into a new array, since we're not supposed to change state.trainers array directly

            trainersCopy[action.data.name] = action.data; // {name: "Misty", pokemons: []}
            // map[newKey] = newValue

            newState = Object.assign(
                {}, 
                state, 
                {trainers: trainersCopy} 
            );

            console.log(newState);
            return newState;
        
        case "SAVE NAME":
            console.log("Save trainer name reducer", action.name)
            trainersCopy = {...state.trainers}
            return newState;

        case "TRAINER DELETED": 
            console.log("Case DELETE TRAINER", action.name);
            console.log("Delete Trainer state", state);
            
            trainersCopy = {...state.trainers}
            delete trainersCopy[action.name];
            
            newState = Object.assign({}, state, {trainers: trainersCopy} )
            return newState;

        case "ADDED POKEMON":
            console.log("Case ADD POKEMON", action);
            console.log("ADD POKEMON state", state);

            // get access to trainers pokemon into array
            trainer = {...state.trainers[state.addToMe]}
            trainer.pokemons.push(action.data);

            trainersCopy[state.addToMe] = trainer;
            
            newState = Object.assign(
                {},
                state,
                {trainers: trainersCopy}
            );

            console.log(newState);
            return newState;

        case "ADD TO ME":
            console.log("Case ADD TO ME", action.data);
            console.log("ADD TO ME state", state);

            newState = Object.assign(
                {}, 
                state, 
                {addToMe: action.data}
            );
            console.log(newState);
            return newState;

            

        //Delete pokemon from the array
        case "DELETED POKEMON":
            console.log("Case DELETED POKEMON", action.id);
            console.log("Delete Pokemon state", state);

            // get trainer object from the state and get the trainer's 
            // name from the action that was dispatched
            // Get pokemon out of trainer by name
            trainer = {...state.trainers[action.trainerName]};
            // pokemon array. saved in a copy
            let pokemons = trainer.pokemons;

            // find the index of the pokemon from the array (loop) by id
            let index;
            for (let i = 0; i < pokemons.length; i++) {
                let pokemon = pokemons[i];
                if (pokemon.id == action.id) {
                    index = i;
                    break;
                }
            }
            // splice pokemon array to delete 
            pokemons.splice(index, 1);
            console.log("POKEMONS SPLICE", pokemons)
            // update trainer's pokemon after deleting
            trainer.pokemons = pokemons;
            console.log("Trainer.pokemons:", trainer.pokemons);
            trainersCopy[action.trainerName] = trainer;
            
            newState = Object.assign({}, state, {trainers: trainersCopy});
            
            console.log("Deleted pokemon newState", newState);

            return newState;
        
        case "SEARCH":
            console.log("SEARCHED", action.results);
            newState = Object.assign(
                {}, 
                state, 
                {searchResults: action.results}
            );
            console.log(newState);
            return newState;






        default: 
            return state;

    }
}

export default trainerReducer;
