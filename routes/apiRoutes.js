const db = require("../models");

module.exports = function(app) {
  // --------------- Trainer Routes --------------------
  // GET all Trainers (READ)
  app.get("/api/trainers", async function(req, res) {
    // save the promise in a variable by accessing sequelize db and table using .findAll()
    let promise = db.Trainer.findAll();
    // results are saved to trainers
    let trainers = await promise; 
    // return the results in the response
    console.log("zzzz", trainers);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(trainers); 
  });

  //CREATE new trainer > Add to db (CREATE)
  // Works but info is undefined
  app.post("/api/trainer", function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    console.log("REQQQQQ", req.body);
    if (!req.body.name) {
      res.json({});
      return;
    }
    db.Trainer.create({
      name: req.body.name
    }).then(function(dbTrainer) {
      console.log("***** Created new trainer ***** : ", dbTrainer.dataValues);
      res.json(dbTrainer);

    });
  });

  // ALLOW preflight requests from the browser (where method type is OPTIONS)
  app.options("/api/trainer", function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Origin", "*");
    next(req, res);
  });

  // DELETE TRAINER
  app.post("/api/deletetrainer", function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    // res.header("Access-Control-Allow-Headers", "content-type");
    console.log("===== Trainer ID DELETING =====", req.query.name);
    db.Trainer.destroy({
      where: {
        name: req.query.name
      }
    }).then(function(dbTrainer) {
        res.json(dbTrainer);
      });
  });

  // -------------- Pokemon Routes --------------------
  // DELETE POKEMON
  app.post("/api/deletepokemon", async function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("===== POKEMON ID DELETING =====", req.query.id);
    db.Pokemon.destroy({
      where: {
        id: req.query.id
      }
    });
    
    let trainerPromise = db.Trainer.findOne({
      where: {
        name: req.query.trainerName
      }
    });

    let trainer = await trainerPromise;
    let pokemonList = trainer.pokemon_owned;
    let pokemonId = req.query.id;

    // algorithm to remove pokemon id from pokemon_owned list
    let pokemonArray = pokemonList.split(",");
    let index = pokemonList.indexOf(pokemonId);

    // splice(remove the pokemon starting at the index of and remove 1 )
    pokemonArray.splice(index, 1);
    pokemonList = pokemonArray.join();
    
    db.Trainer.update({
      pokemon_owned: pokemonList
    }, 
    {
      where: {name: trainer.name}
    })

    res.status(204).send();

  })



  // GET all Pokemon (READ) from the Trainer
  app.get("/api/:trainer/pokemons", async function(req, res) {
    req.query.accessMeHere // "shoes"
    console.log("Get Request for Trainer:", req.params.trainer);
    res.header("Access-Control-Allow-Origin", "*");
    // find one trainer by name
    // after the promise has been fulfilled and retrieved results, 
    // write a callback function so sequelize will give you the result (use .then...)
    let trainerPromise = db.Trainer.findOne({
      where: {
        name: req.params.trainer
      }
    });
    let trainer = await trainerPromise;

    // if there are pokemons in pokemon_own, do search, 
    // else, if there are none, return the empty result
    
    if (trainer.pokemon_owned) {
      let pokemonsPromise = db.Pokemon.findAll({ // Promise
        where: {
          ID: trainer.pokemon_owned.split(",")
        }
      });

      let pokemons = await pokemonsPromise;
      res.json(pokemons);

    } else {
      res.json([]);
    }

  });

  // CREATE new Pokemon for Trainer
  app.post("/api/pokemon/", function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    //db.tableName.create(req.body).then(function(dbName) {});
    db.Pokemon.create(req.body).then(function(newPokemon) {

      console.log("Trainer: ", req.query.trainerName);
      // Update trainer db with new pokemon with its id by getting the trainer by name
      // then we can update 
      db.Trainer.findOne({
        where: {
          name: req.query.trainerName
        }
      }).then(function(trainer){

        // initializing pokemon list to current list
        let pokemonslist = trainer.pokemon_owned;

        if (pokemonslist == null) {
          pokemonslist = newPokemon.id;
        }
        else {
          pokemonslist = pokemonslist + "," + newPokemon.id;
        }

        db.Trainer.update({
            pokemon_owned: pokemonslist
          },
          {
            where: {name: trainer.name}
          }
        );

      })

      console.log("dbpokemon id", newPokemon.id);
      // console.log(res);
      res.json(newPokemon);
    });
  });

  // -------------- Search Routes by Trainer and Pokemon Name --------------------
  app.get("/api/search", async function(req, res) {
    console.log("Search term: ", req.query.q);
    res.header("Access-Control-Allow-Origin", "*");

    let promise = db.Trainer.findAll({
      where: {
        name: {
          $like: "%" + req.query.q + "%"
        }
      }
    });

    let trainers = await promise; 

    res.json(trainers); 
  })
 


};
