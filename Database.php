<?php
/**
 * Created by JetBrains PhpStorm.
 * User: James
 * Date: 4/10/12
 * Time: 7:35 PM
 * To change this template use File | Settings | File Templates.
 */

class Database {

    var $user = "root";
    var $pass = "";
    var $host = "127.0.0.1";
    var $name = "doctor_robot";

    function getById($table, $id) {

        $link = $this->connectToDatabase();

        $query = "SELECT * FROM " . $table . " where id=" . $id;
        $result = mysql_query($query) or die('Query failed: ' . mysql_error());

        $line = mysql_fetch_array($result, MYSQL_ASSOC);

        $this->disconnectFromDatabase($result, $link);
        return $line;

    }

    function doQuery($query)
    {
        $link = $this->connectToDatabase();
        $result = mysql_query($query) or die('Query failed: ' . mysql_error());
        $this->disconnectFromDatabase($result, $link);
    }

    function disconnectFromDatabase($result, $link)
    {
        // Free resultset
        mysql_free_result($result);

        // Closing connection
        mysql_close($link);

    }


    function connectToDatabase()
    {
        $link = mysql_connect($this->host, $this->user, $this->pass)
            or die('Could not connect: ' . mysql_error());

        mysql_select_db($this->name) or die('Could not select database');

        return $link;

    }

}


