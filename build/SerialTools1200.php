<?php
class SerialTools1200
{
public function getFormat($serial) {
if (preg_match('/^(GE[0-9][a-z]{2}[0-9])+/i', $serial)) {
return 'GE0XX';
} else if (preg_match('/^([a-z]{2}[0-9][a-z]{2}[0-9])+/i', $serial)) {
return 'XX0XX';
} else if (preg_match('/^([a-z]{2}[0-9]{4}[a-z])+/i', $serial)) {
return 'XX0000X';
} else if (preg_match('/^([a-z]{2}[0-9][a-z][0-9]{2}[a-z])+/i', $serial)) {
return 'XX0X00X';
} else {return false;
}}
public function endsInNumerls($serial) {
$format = $this->getFormat($serial);
if ($format) {
$strlen = count(str_split($format));
$stringToTest = substr($serial, $strlen);
if (!preg_match('/[^0-9]+/', $stringToTest)) {
return true;
}}return false;
}
public function isValid($serial) {
$format = $this->getFormat($serial);
if (!$this->endsInNumerls($serial)) {
return false;
}switch ($format){case 'GE0XX':
return true;

case 'XX0XX':
return true;

case 'XX0000X':
return true;

case 'XX0X00X':
return true;

}return false;
}

}

