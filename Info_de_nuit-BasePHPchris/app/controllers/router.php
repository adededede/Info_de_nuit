<?php
class Router {
    // Route une requête entrante : exécution la bonne méthode de contrôleur en fonction de l'URL 
    public function routerRequete() {
		// s'il y a un parametre 'route'	
        if (!empty($_GET['route'])) {
            // on détermine avec quelle méthode de quel contrôleur on veut travailler
            switch($_GET['route']) {
                                       
                case 'Info': 
                                            require'../app/views/home/info.php';
                                            break;

                case 'Temo': 
                                            require'../app/views/home/temoi.php';
                                            break;
                                        
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
