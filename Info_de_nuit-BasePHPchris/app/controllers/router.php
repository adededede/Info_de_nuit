<?php
class Router
{
    // Route une requête entrante : exécution la bonne méthode de contrôleur en fonction de l'URL 
    public function routerRequete()
    {
        // s'il y a un parametre 'route'	
        if (!empty($_GET['route'])) {
            // on détermine avec quelle méthode de quel contrôleur on veut travailler
            switch ($_GET['route']) {
                case 'consentement':
                    require './app/views/home/consentement.php';
                    break;

                case 'malsain':
                    require './app/views/home/malsain.php';
                    break;

                case 'info':
                    require './app/views/home/info.php';
                    break;

                case 'news':
                    require './app/views/home/news.php';
                    break;

                case 'temoin':
                    require './app/views/home/temoi.php';
                    break;

                case 'contact':
                    require './app/views/home/contac.php';
                    break;

                case 'about':
                    require './app/views/home/about.php';
                    break;

                default:                     // pour toutes les autres valeurs, on affiche la page d'accueil
                    require './app/views/home/home.php';
                    break;
            }
            // aucune paramètre 'route' : on affiche l'accueil'
        } else {
            require './app/views/home/home.php';
        }
    }
}
