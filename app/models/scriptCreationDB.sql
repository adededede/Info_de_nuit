CREATE DATABASE dbMVC;
USE dbMVC;

DROP TABLE Players;
DROP TABLE Teams;

CREATE TABLE Teams (
    id INT AUTO_INCREMENT,
    name VARCHAR(100),
    ranking INT,
    PRIMARY KEY (id)
);

CREATE TABLE Players (
    id INT AUTO_INCREMENT,
    idTeam INT,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    age INT,
    nationality VARCHAR(100),
    PRIMARY KEY (id),
    FOREIGN KEY (idTeam) REFERENCES Teams(id)
);



 