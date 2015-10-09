<?php
//------------------------------------------------------------------------------------
//    Copyright 2009 Sun Microsystems, Inc.  All rights reserved.
//    Use is subject to license terms.
//    Developer: Divyen Patel, ISV-Engineering
//------------------------------------------------------------------------------------
class Conn {

    private $conn_ = null;

    public function __construct($dbname) {
        $this->conn_ = new mysqli(MYSQL_SERVER, MYSQL_USER, MYSQL_PASS, $dbname);
    }
	
    public function __destruct() {
        $this->close();
    }

    public function close() {
        if ($this->conn_) {
            $this->conn_->close();
            $this->conn_ = null;
        }
    }

    public function query($sql) {
        if (!$this->conn_) {
            error_log('CloudwareV-1.0: Invalid Resource');
        }
        $ret = $this->conn_->query($sql);
        if ($ret == false) {
            $error = $this->conn_->errno;
			error_log('CloudwareV-1.0: Query Failed: '.$sql);
            error_log('CloudwareV-1.0: Query Failed with: '.$error);
        }
        return $ret;
    }
	
	

    public function error() {
        if  (is_resource($this->conn_)) {
            return mysqli_error($this->conn_);
        } else {
            return 0;
        }
    }

    public function affected_rows() {
        if  ($this->conn_) {
            return $this->conn_->affected_rows;
        } else {
            return 0;
        }
    }
}

class DB {
    public static function get_conn($db=MYSQL_DBNAME) {
        return new Conn($db);
    }
}
?>
