<?php
/**
 * Created by JetBrains PhpStorm.
 * User: James
 * Date: 4/10/12
 * Time: 7:07 PM
 * To change this template use File | Settings | File Templates.
 */

require_once("Database.php");

class Map {

    var $database;


    function __construct()
    {
        $this->database = new Database();
    }

    function getMap($segments)
    {
        $id = $segments[1];
        $result = $this->database->getById("map", $id);
        $r = $result['name'] . "\n";
        $r .= $result['tiles'];
        return $r;

    }

    function saveMap()
    {
        $tiles = $_POST['tiles'];
        $user_id = 1;
        $name = $_POST['name'];
        $id = $_POST['id'];
        $query = "update map set tiles='$tiles', name='$name' where id=$id";
        $this->database->doQuery($query);

    }

    function getMapsByUserId($segments)
    {
        $userId = $segments[1];

    }


}