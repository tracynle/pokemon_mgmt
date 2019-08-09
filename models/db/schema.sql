-- Drops db if it currently exists --
DROP DATABASE IF EXISTS pokemon_db;
CREATE DATABASE pokemon_db;

USE pokemon_db;

-- Trainer table --
CREATE TABLE Trainer (
    name VARCHAR (50),
    pokemon_owned VARCHAR(50)
);

-- Pokemon table --
CREATE TABLE Pokemon (
    ID INTEGER(10),
    name VARCHAR (50),
    move VARCHAR (50),
    type VARCHAR (50)
);

INSERT INTO Trainer (Name, Pokemon_owned) 
VALUES 
    ("Ash Ketchum", "1,4"), 
    ("Misty", "7"),
    ("Brock", "3")
;

INSERT Pokemon (ID, Name, Move, Type)
VALUES 
    (1, "Bulbasaur", "Vinewhip", "Grass"), 
    (4, "Charmander", "Flamethrower", "Fire"), 
    (7, "Squirtle", "Ice Beam", "Water"),
    (3, "Onyx", "Tackle", "Rock")
; 

DELETE FROM Trainer;
SELECT * FROM Trainer;
SELECT * FROM Pokemon;