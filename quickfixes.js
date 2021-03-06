/* eslint-disable */
var fs = require('fs');
var os = require('os');
fs.readFile('./src/SerialTools1200.php', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  // Fix regex problem.
  var result = data.replace(
    /preg_match\(\$regexString/g,
    'preg_match("/".$regexString."/"'
  );
  // Fix newline after closing brace (variable after).
  result = result.replace(/}\$/g, '}' + os.EOL + '$');
  // Fix newline after closing brace (if after).
  result = result.replace(/}if/g, '}' + os.EOL + 'if');
  // Fix newline after closing brace (for after).
  result = result.replace(/}for/g, '}' + os.EOL + 'for');
  // Fix newline after closing brace (return after).
  result = result.replace(/}return/g, '}' + os.EOL + 'return');

  // Add namespace.
  result = result.replace('<?php', '<?php ' + os.EOL + os.EOL + 'namespace Twopha\\SerialTools1200;' + os.EOL);

  // PHP current year.
  result = result.replace('new Date()->getFullYear();', 'intval(date("Y"));');

  fs.writeFile('./src/SerialTools1200.php', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
