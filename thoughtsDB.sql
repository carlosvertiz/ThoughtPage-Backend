DROP DATABASE IF EXISTS thoughtsdb;
CREATE DATABASE thoughtsdb;

USE thoughtsdb;

DROP TABLE IF EXISTS thoughts;

CREATE TABLE thoughts (
id INT NOT NULL AUTO_INCREMENT,
thought TEXT NOT NULL,
categories TEXT,
views INT default(1),
dates timestamp NOT NULL DEFAULT (NOW()),
modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(id)
);

insert into thoughts (thought, categories) Values
("si", "prueba"),
("si2", "pruebaasdasd"),
("aaasi", "dasdprueba");




select * from thoughts;
ORDER BY id DESC
limit 2 offset 6 ;


