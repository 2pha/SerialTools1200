<?php
class SerialTools1200
{
public function isValid($serial) {
}
public function isNewSerialFormat($serial) {
return substr(strtolower($serial), 0, 2) === 'ge';
}
public function authors() {
$authors = array('Chris "2pha" Brown (2pha.com)');
$authors->forEach(function ($value) {
$console->log($value);
}
);
return $authors;
}

}

