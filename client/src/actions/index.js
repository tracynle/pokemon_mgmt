// Actions are what you want to do
// Add and Delete trainer and pokemon
// import axios from 'axios';

// ===== TRAINER ACTIONS =====
export const getTrainersAction = () => {

    // With thunk middleware, you can return a function from this action creator
    return async (dispatch, getState) => {

        // asynchronously fetch trainers
        let fetchPromise = fetch("http://localhost:3001/api/trainers");
        let response = await fetchPromise;
        let trainers = await response.json(); // trainers is an array
        console.log("Response from fetching trainers:", trainers);

        // if you want to await, don't use map, because the function in map(function)
        // needs to be async, so those functions will run asynchronously and will not
        // wait until they are done. So any code after the map() will run immediately.
        //
        // Loop through trainers. For each trainer, fetch their pokemons.
        // Then put pokemons in the "pokemons" key.
        for (let i = 0; i < trainers.length; i++) {
            let trainer = trainers[i];
            fetchPromise = fetch(`http://localhost:3001/api/${trainer.name}/pokemons`);
            response = await fetchPromise;
            let pokemons = await response.json();
            trainer.pokemons = pokemons;
        }

        // After all trainers and respective pokemons are fetched, dispatch
        dispatch({
            type: "FETCHED TRAINERS FROM API",
            data: trainers
        });
    }
};

export const addTrainer = (data) => {
    console.log("DATAAAA", data);
    return async (dispatch, getState) => {
        // create a trainer/add
        let promise = fetch("http://localhost:3001/api/trainer", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: data.name})
        });

        let response = await promise;
        let trainer = await response.json();
        trainer.pokemons = [];

        dispatch ({
            type: "ADDED TRAINER",
            data:  trainer
        })
    }
}

export const getDeleteTrainerAction = (name) => {
    return async (dispatch, getState) => { // returns an action function
        let promise = fetch("http://localhost:3001/api/deletetrainer/?name=" + name, {
            method: "POST", // could be "delete" too
        });
        await promise; // we're assuming no errors

        dispatch({
            type: "TRAINER DELETED",
            name: name
        });
    };
}

export const searchTrainer = (data) => {
    return {
        type: 'SEARCH TRAINER',
        data: data
    };
}

// ===== POKEMON ACTIONS ==========

export const getAddPokemonAction = (data, trainerName) => {
    console.log("ADDINGGGGG", data);

    return async(dispatch, getState) => {
        let promise = fetch("http://localhost:3001/api/pokemon?trainerName=" + trainerName, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        let response = await promise;
        let pokemon = await response.json();
        pokemon.trainer = [];

        dispatch ({
            type: "ADDED POKEMON",
            data:  pokemon
        })
    }
}

export const getDeletePokemonAction = (id, trainerName) => {
    return async (dispatch, getState) => {

        // get trainer by name and pokemon by id
        let promise = fetch("http://localhost:3001/api/deletepokemon?trainerName=" + trainerName + "&id=" + id, {
            method: "POST", // could be "delete" too
        });
        await promise; // we're assuming no errors
        // get trainer's pokemon by the pokemon_owned id's in order to delete from the db
        dispatch({
            type: "DELETED POKEMON",
            trainerName: trainerName,
            id: id
        });
    };
}
export const getSearchAction = (searchTerms, checkedSearch) => {
    console.log("SEARCHINGGGGG", searchTerms);

    return async (dispatch, getState) => {
        let promise = fetch("http://localhost:3001/api/search?checked=" + checkedSearch + "&q=" + searchTerms, {
            method: "GET",
        });
        let response = await promise;
        let results = await response.json();

        dispatch({
            type: 'SEARCH',
            results: results
        });
    }
}

export const getAddToMeAction = (data) => {

    return {
        type: 'ADD TO ME',
        data: data
    }
}
