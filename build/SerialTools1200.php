<?php
class SerialTools1200
{
public function isValid($serial) {
}
public function isNewSerialFormat($serial) {
return substr(strtolower($serial), 0, 2) === 'ge';
}

}

