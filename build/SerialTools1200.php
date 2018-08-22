<?php
class SerialTools1200
{
public $formats;
public function __construct() {
$this->formats = array("GE0XX00000X" => array("regex" => array('[GE]{2}', '[0-9]', '[A-L]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[A-Z]')), "GE0XX000000" => array("regex" => array('[GE]{2}', '[0-9]', '[A-L]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]')), "XX0XX00000" => array("regex" => array('[GE|NH]{2}', '[0-9]', '[A-L]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '')), "XX0X00X000" => array("regex" => array('[CG|AG|MJ|MU|DA]{2}', '[0-9]', '[(1-9)|(JKL)]', '[0-3]', '[0-9]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '')));
}
public function getFormat($string) {
$length = strlen($string);
if ($length < 2) {
return false;
}foreach ($this->formats as $format => $___){$regex = array('/^');
for ($i = 0;
$i < $length;$i++) {if ($i < count($this->formats[$format]['regex'])) {
array_push($regex, $this->formats[$format]['regex'][$i]);
}}array_push($regex, '$/');
$regexString = join('', $regex);
if (preg_match($regexString, strtoupper($string))) {
return $format;
}}return '';
}
public function endsInNumerls($string) {
$format = $this->getFormat($string);
if ($format) {
$strlen = count(str_split($format));
$stringToTest = substr($string, $strlen);
if (!preg_match('/[^0-9]+/', $stringToTest)) {
return true;
}}return false;
}
public function isValid($string) {
$format = $this->getFormat($string);
if (!$this->endsInNumerls($string)) {
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

