<?php
/**
 * Created by JetBrains PhpStorm.
 * User: James
 * Date: 4/10/12
 * Time: 7:10 PM
 * To change this template use File | Settings | File Templates.
 */

require_once('Maps.php');


$uri = $_SERVER['REQUEST_URI'];

$data = explode("?", $uri);

$segments = explode("|", $data[1]);

switch($segments[0]) {

    case "getMap":
        $map = new Map();
        echo $map->getMap($segments);
        break;

    case "saveMap":
        $map = new Map();
        echo $map->saveMap();
        break;

    case "getMapsByUserId":
        $map = new Map();
        echo $map->getMapsByUserId($segments);
        break;

    default:
        echo "Unknown Command: " . $segments[0];
        break;

}
