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
public function isValid($serial) {
return true;
}
public function authors() {
$authors = array('Chris "2pha" Brown (2pha.com)');
return $authors;
}

}

