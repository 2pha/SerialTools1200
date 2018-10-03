var fs = require('fs');
fs.readFile('./build/SerialTools1200.php', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(
    /preg_match\(\$regexString/g,
    'preg_match("/".$regexString."/"'
  );

  fs.writeFile('./build/SerialTools1200.php', result, 'utf8', function(err) {
    if (err) return console.log(err);
  });
});
