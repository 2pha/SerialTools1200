This is basically just for testing some build tools and workflow.  
What it does:

- generates PHP class from JS class using JS2PHP.
- compiles JS class.
- runs mocha tests on compiled JS
- runs custom tests on PHP class

scripts:

- **tests**
- npm test - test compiled js class
- npm run testphp - test generated PHP class
- npm testall - test + testphp
- **build**
- npm run build - build js
- npm run buildphp - generate PHP class from JS source
- npm buildall - buildjs + buildphp
