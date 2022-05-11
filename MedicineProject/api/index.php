<?php 
require 'config.php';
require 'db.php';
require 'models/model.php';
require 'auth.php';
require 'controller.php';

header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

$input = json_decode(file_get_contents('php://input'), true);


(new Controller())->run();
