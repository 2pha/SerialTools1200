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
public function copyright() {
return "
    Copyright 2017 Chris Brown http://2pha.com

    Licensed under the Apache License, Version 2.0 (the 'License');
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an 'AS IS' BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    ";
}

}

