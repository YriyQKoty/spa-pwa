<?php
class Model {
    public static function getPatientsList() {
        return (new Database()) -> getArrayFromQuery(
            "SELECT *
            FROM `patients`"
        );
    }

    public static function editPatient($patient) {
        return (new Database())->runQuery(
            "UPDATE `patients` SET fullname='".$patient['fullname']."',
            doctor='".$patient['doctor']."' WHERE id=".$patient['id']."" 
        );
    }

    public static function addPatient($patient) {
        
        return (new Database())->runQuery(
            "INSERT INTO `patients` (fullname, doctor, recipes_quantity) values('".$patient['fullname']."', '".$patient['doctor']."',0)"
        
        );
    }

    public static function removePatient($patient) {
        return (new Database())->runQuery(
            "DELETE FROM `patients` WHERE id=".$patient['id']
        );
    }

    public static function getRecipes($patientId) {
        return (new Database())->getArrayFromQuery(
            "SELECT * FROM `recipes` WHERE patientId=".$patientId
        );
    }

    public static function addRecipe($recipe) {
        
        return (new Database())->runQuery(
            "INSERT INTO `recipes` (recipeName, `desc`, quantity, patientId) values('".$recipe['recipeName']."', '".$recipe['desc']."',".$recipe['quantity'].", ".$recipe['patientId']." )"
        );
    }

    public static function removeRecipe($recipe) {

        return (new Database())->runQuery(
            "DELETE FROM `recipes` WHERE id =".$recipe['id']
        );
    }

    public static function editRecipe($recipe) {
        return (new Database())->runQuery(
            "UPDATE `recipes` SET recipeName='".$recipe['recipeName']."',
            `desc`='".$recipe['desc']."', quantity=".$recipe['quantity']." WHERE id=".$recipe['id']."" 
        );
    }

}