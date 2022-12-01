<?php

class Database {

    public $db;
    function __construct(){
        $this->openDatabaseConnection();
    }

    // function __destruct() {
    //     $this->closeDatabaseConnection();
    //     echo 'database is disconnected <br>';
    // }

    private function openDatabaseConnection(){
        try{
            $this->db = new PDO(DB_TYPE . ":host=". DB_HOST .";dbname=" . DB_NAME, DB_USER, DB_PASS,
                array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        } catch (PDOException $e){
            echo "Erreur: ".$e->getMessage()."<br>";
        }
    }

    // private function closeDatabaseConnection()
    // {
    //     $this->db->close();    
    // }

}