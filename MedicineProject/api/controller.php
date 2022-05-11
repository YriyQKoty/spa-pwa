<?php

class Controller {
    private $data;
    private $action;
    private $protectedActions = ['get-patients', 'edit-patient', 'add-patient', 'remove-patient',
                                'get-recipes', 'add-recipe', 'remove-recipe', 'edit-recipe'];

    function __construct()
    {
        $this->action = $_GET['action'];
        $this->data = json_decode(file_get_contents('php://input'), true);
        
    }

    function run() {
        $res = [];

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            return;
        }

        if (in_array($this->action, $this->protectedActions) && !Auth::checkToken($_GET['token'])) {
            return ['error' => 'authentication failed!'];
        }
        switch ($this->action) {
            case 'login':
                $res = Auth::getUserToken($this->data);
                break;
            case 'get-patients':
                $res = Model::getPatientsList();
                break;
            case 'edit-patient':
                if (Model::editPatient($this->data)) {
                    $res = ['update' => 'success'];
                }
                else {
                    $res = ['error' => 'patients update error'];
                }
                break;
            case 'add-patient':
                
                if (Model::addPatient($this->data)) {
                    $res = ['insert' => 'success'];
                }
                else {
                    $res = ['error' => 'patient insert error!'];
                }
                break;
            case 'remove-patient': 
                if (Model::removePatient($this->data)) {
                    $res = ['delete' => 'success'];
                }
                else {
                    $res = ['error' => 'patient delete error!'];
                }
                break;

            case 'get-recipes':
                $res = Model::getRecipes($_GET['patientId']);
                break;
            case 'add-recipe':
                if (Model::addRecipe($this->data)) {
                    $res = ['insert' => 'success'];
                }
                else {
                    $res = ['error' => 'recipe insert error!'];
                }
                break;
            case 'edit-recipe':
                if (Model::editRecipe($this->data)) {
                        $res = ['update' => 'success'];
                }
                else {
                        $res = ['error' => 'recipes update error'];
                }
                break;   
            case 'remove-recipe':
                if (Model::removeRecipe($this->data)) {
                        $res = ['delete' => 'success'];
                }
                else {
                        $res = ['error' => 'recipes delete error'];
                }
                break;
            default:
                $res = ['error' => 'This route is incorrect!'];
        }

        echo json_encode($res);
    }



}