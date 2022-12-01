<?php

class ModelPlayer {

    public function getPlayer($idPlayer) {
        $res = $db->prepare("Select * from Players WHERE id=?");
		$res->execute([$idPlayer]);			
		return new Player($player["id"], $player["idTeam"],  $player["firstname"],  $player["lastname"],  $player["age"],  $player["nationality"]);
    }

    public function getPlayers() {
        global $db;
        $res = $db->prepare("Select * from Players");
		$res->execute();			
		foreach($res as $player) {
		    $playersList[] = new Player($player["id"], $player["idTeam"],  $player["firstname"],  $player["lastname"],  $player["age"],  $player["nationality"]);
 		}
		return $playersList; 
    }

    public function createPlayer($idTeam, $firstname, $lastname, $age, $nationality) {
        return null;
    }

    public function deletePlayer($idPlayer) {
        return null;
    }


}