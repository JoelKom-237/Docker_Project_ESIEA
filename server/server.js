const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();
const server = express();
server.use(cors());
server.use(bodyParser.json());


//Etablir la connexion à la base de données
const db = mysql.createPool({

    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,
});

/*db.connect(function (error){
    if (error){
        console.log("Error connecting to DB");
    } else {
        console.log("Successfully connected to DB");
    }
});*/


//Configuration du port serveur 
server.listen(3001, function check (error){
    if (error) {
        console.log("Error..!");
    } else {
        console.log("Server Started!");
    }
});

//Ajouter des enregistrements
server.post("/api/student/add", (req, res) => {
    let details = {
        stname : req.body.stname,
        course : req.body.course,
        fee : req.body.fee,
    };
    let sql = "INSERT INTO student SET ?";
    db.query(sql, details, (error) => {
        if (error) {
            res.send({status : false, message: "Echec lors de la creation d'un nouvel etudiant" });
        }   else {
            res.send({status: true, message: "Etudiant ajoute avec success" });
        }
    });
});


//Obtenir les enregistrements

server.get("/api/student/", (req, res) => {
    var sql = "SELECT * FROM student";
    db.query(sql, function(error, result){
        if (error){
            console.log("Erreur lors de la connexion  à la base de données");
        } else {
            res.send({status: true, data: result });
        }
    });
});

//Obtenir un enregistrement à partir de son id

server.get("/api/student/:id", (req, res) => {
    let sql = "SELECT * FROM student WHERE id = ?";
    let values = [req.params.id];
    db.query(sql, values, (error, result) => {
        if (error) {
            res.status(500).send({ status: false, message: "Erreur lors de la lecture", error: error.message });
        } else {
            res.send({ status: true, message: "Lecture réussie" });
        }
    });
});


//Mettre à jour un enregistrement

server.put("/api/student/update/:id", (req, res) => {
    let sql = "UPDATE student SET stname = ?, course = ?, fee = ? WHERE id = ?";
    let values = [req.body.stname, req.body.course, req.body.fee, req.params.id];

    db.query(sql, values, (error, result) => {
        if (error) {
            res.status(500).send({ status: false, message: "Mise à jour échouée", error: error.message });
        } else {
            res.send({ status: true, message: "Mise à jour réussie" });
        }
    });
});


//Supprimer un enregistrement 

server.delete("/api/student/delete/:id", (req, res) => {
    let sql = "DELETE FROM student WHERE id = ?";
    let values = [req.params.id];

    db.query(sql, values, (error, result) => {
        if (error) {
            res.status(500).send({ status: false, message: "Suppression échouée ", error: error.message });
        } else {
            res.send({ status: true, message: "Suppression de l'enregistrement réussie" });
        }
    });
});






