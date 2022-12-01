<?php



class playerController {
    private $modelPlayer;
    
    public function __construct(){
        $this->modelPlayer = new ModelPlayer();
    }

    public function showPlayersTable(){
        $playersList = $this->modelPlayer->getPlayers();
        require '../app/views/players/playersTable.php' ;
    }
}