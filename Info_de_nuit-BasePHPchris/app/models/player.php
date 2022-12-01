<?php

class player {
    public $id;
    public $idTeam;
    public $firstname;
    public $lastname;
    public $age;
    public $nationality;

    public function __construct($p_id, $p_idTeam, $p_firstname, $p_lastname, $p_age, $p_nationality) {
        $this->id = $p_id;
        $this->idTeam = $p_idTeam;
        $this->firstname = $p_firstname;
        $this->lastname = $p_lastname;
        $this->age = $p_age;
        $this->nationality = $p_nationality;
    }
}