<?php
class SerialTools1200
{
public $mks;
public $monthMap;
public $formats;
public function __construct() {
$this->mks = array("mk2" => array("start_year" => 1979, "end_year" => 2010), "mk3" => array("start_year" => 1989, "end_year" => 1998), "mk4" => array("start_year" => 1996, "end_year" => 2005), "mk3d" => array("start_year" => 1997, "end_year" => 2002), "m3d" => array("start_year" => 1997, "end_year" => 2002), "ltd" => array("start_year" => 1995, "end_year" => 2002), "mk5" => array("start_year" => 2002, "end_year" => 2010), "mk5g" => array("start_year" => 2002, "end_year" => 2010), "m5g" => array("start_year" => 2002, "end_year" => 2010), "gld" => array("start_year" => 2004, "end_year" => 2004), "mk6" => array("start_year" => 2007, "end_year" => 2010), "gae" => array("start_year" => 2016, "end_year" => 0), "g" => array("start_year" => 2016, "end_year" => 0), "gl" => array("start_year" => 2017, "end_year" => 0));
$this->monthMap = array("1" => 'january', "a" => 'january', "2" => 'february', "b" => 'february', "3" => 'march', "c" => 'march', "4" => 'april', "d" => 'april', "5" => 'may', "e" => 'may', "6" => 'june', "f" => 'june', "7" => 'july', "g" => 'july', "8" => 'august', "h" => 'august', "9" => 'september', "i" => 'september', "j" => 'october', "k" => 'november', "l" => 'december');
$this->formats = array("GE0XX00000R" => array("regex" => array('[GE]{2}', '[0-9]', '[A-L]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[R]'), "maxlength" => 11), "GE0XX000000" => array("regex" => array('[GE]{2}', '[0-9]', '[A-L]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]'), "maxlength" => 11), "XX0XX00000" => array("regex" => array('[GE|NH]{2}', '[0-9]', '[A-L]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]'), "maxlength" => 10), "XX0X00X000" => array("regex" => array('[CG|AG|MJ|MU|DA]{2}', '[0-9]', '[(1-9)|(JKL)]', '[0-3]', '[0-9]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]'), "maxlength" => 10), "LA0XX000000" => array("regex" => array('[LA]{2}', '[0-9]', '[A-Z]', '[A-Z]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]', '[0-9]'), "maxlength" => 11));
}
public function getFormat($string, $full = true) {
$length = strlen($string);
if ($length < 2) {
return false;
}foreach ($this->formats as $format => $___){$skip = false;
if ($length > $this->formats[$format]['maxlength']) {
$skip = true;
}if (!$skip) {
$addCount = 0;
if ($full) {
$addCount = count($this->formats[$format]['regex']);
} else {strlen($string) - 1;
}$regex = array('^');
for ($i = 0;
$i < $addCount;$i++) {array_push($regex, $this->formats[$format]['regex'][$i]);
}if ($full) {
array_push($regex, '$');
}$regexString = join('', $regex);
if (preg_match("/".$regexString."/", strtoupper($string))) {
return $format;
}}}return false;
}
public function isValid($string, $full = true) {
if ($this->getFormat($string, $full)) {
return true;
}return false;
}
public function getDateData($serial, $format = false, $mk = false) {
$val = array("day" => '0', "month" => '', "years" => array());
$format = ($format) ? $format : $this->getFormat($serial);
if ($format) {
if ($format == 'XX0X00X000') {
array_push($val['day'], substr($serial, 4, 2));
}$val['month'] = $this->monthMap[substr($serial, 3, 1)];
$yearval = substr($serial, 2, 1);
$startyear = 1979;
if ($yearval < 9) {
$startyear = $startyear + $yearval + 1;
}for ($i = $startyear;
$i < 2018;$i += 10) {if ($mk) {
if ($i >= $this->mks[$mk]['start_year'] || $i <= $this->mks[$mk]['end_year']) {
array_push($val['years'], $i);
}} else {array_push($val['years'], $i);
}}}return $val;
}

}

