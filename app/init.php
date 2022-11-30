<?php
require_once 'config/config.php';
require_once 'helpers/database.php';

require_once 'controllers/router.php';
require_once 'controllers/playerController.php';
//require_once 'controllers/teamController.php';

include_once 'models/modelPlayer.php';
include_once 'models/player.php';

$db = new Database();

$db = $db->db;