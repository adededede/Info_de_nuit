<?php
class Router {
    // Route une requête entrante : exécution la bonne méthode de contrôleur en fonction de l'URL 
    public function routerRequete() {
		// s'il y a un parametre 'route'	
        if (!empty($_GET['route'])) {
            // on détermine avec quelle méthode de quel contrôleur on veut travailler
            switch($_GET['route']) {
                // case 'PlayersPerTeams' :    // liste des joueurs par équipes
                //                             $ctrlPlayer = new playerController();
                //                             $playersList = $ctrlPlayer->getPlayers();
                //                             $ctrlTeam = new teamController();
                //                             $teamsList = $ctrlTeam()->getTeams();
                //                             require 'views/playersPerTeams.php';
                //                             break;

                // case 'PlayersInTeam' :      // liste des joueurs d'une équipe
                //                             $ctrlPlayer = new ControleurEmplacement();
                //                             $playersList = $ctrlPlayer->getPlayersInTeam($_GET['idTeam']);
                //                             $ctrlTeam = new teamController();
                //                             $teamsList = $ctrlTeam()->getTeam($_GET['idTeam']);
                //                             require 'views/playersPerTeams.php';
                //                             break;
                                        
                // case 'Teams' :              // liste des équipes
                //                             $ctrlTeam = new teamController();
                //                             $teamsList = $ctrlTeam()->getTeams();
                //                             require 'views/teams.php';
                //                             break;

                // case 'Team' :               // détails d'une équipe
                //                             $ctrlTeam = new teamController();
                //                             $team = $ctrlTeam()->getTeam($_GET['idTeam']);
                //                             require 'views/team.php';
                //                             break;

                case 'Players' :            // listes des joueurs
                                            $ctrlPlayer = new playerController();
                                            $ctrlPlayer->showPlayersTable();
                                            break;
                                        
                // case 'Player' :             // détails d'un joueur
                //                             $ctrlPlayer = new playerController();
                //                             $ctrlPlayer->getPlayer($_GET['idPlayer']);
                //                             require 'views/player.php';
                //                             break;
                                            
                // case 'PlayerCreate' :       // creation d'un joueur
                                            

                //                             break;
                
                // case 'PlayerDelete' :	 	// suppression d'un joueur
                                            
                //                             break;

                // case 'TeamCreate' : 	    // création d'une équipe
                                            
                //                             break;
                                        
                // case 'TeamDelete' : 	    // suppression d'une équipe
                                            
                //                             break;

                // case 'TeamAddPlayer' : 	  	// ajout d'un joueur à une équipe
                                            
                //                             break;

                // case 'TeamRemovePlayer' :   // suppression d'un joueur d'une équipe
                                            
                //                             break;
                                        
                default: 	                // pour toutes les autres valeurs, on affiche la page d'accueil
                                            require '../app/views/home/home.php';
                                            break;			
            }
        // aucune paramètre 'route' : on affiche l'accueil'
        } else {  
            require '../app/views/home/home.php';
        } 
		
    }
}
