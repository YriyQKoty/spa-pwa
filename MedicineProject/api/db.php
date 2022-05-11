<?php
class Database {
    private $link;
    public $err;
    public function connect() {
        $this->link = new \mysqli(
            \Config::$server, \Config::$user, \Config::$pwd, \Config::$db
        );

        if(!$this->link) {
            return false;
        }

       // $this->runQuery("SET NAMES 'utf-8'");
    }


    public function dissconnect() {
        $this->link->close();
        unset($this->link);
    }

    public function runQuery($sql) {
        if (!$this->link) {
            $this->connect();
        }
        $res = $this->link->query($sql);
        if (!$res) {
            $this->err = $this->link->error;

        }
        //var_dump($res);
        return $res;
    }


    public function getArrayFromQuery($sql) {
        $result_arr = [];
        $rs = $this->runQuery($sql) or var_dump($this->err);
        while($row = $rs->fetch_assoc()) {
            $result_arr[] = $row;
        }
        return $result_arr;
    }
}