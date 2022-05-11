<?php 
class Auth {
    public static function getUserToken($user) {
        $res = (new Database())->getArrayFromQuery(
            "SELECT id FROM users WHERE nickname='".$user['nickname']."'and password=md5('".$user['password']."')"
        );
        if(count($res) > 0) {
            $id = $res[0]['id'];
            $token = bin2hex(random_bytes(64));
            $res2 = (new Database())->runQuery(
                "UPDATE users SET token='$token' WHERE id=$id"
            );
            if ($res2) {
                return ['token' => $token];
            }
        }

        return ['error' => 'Nickname or password is incorrect!'];
    }

    public static function checkToken($token) {
        $res = (new Database())->getArrayFromQuery(
            "SELECT id FROM users WHERE token='$token'"
        );

        if (count($res) > 0) {
            return true;
        }
        return false;
    }
}