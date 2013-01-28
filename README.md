## Badger
### a node logger that doesn't suck


Badger is a simple logger, providing the two things that are essential for maintainable logging:

- automatic printing of file/line number where the log message happened 
- easy local/global granularity controls 

#### Installation

	npm install badger
	
#### Usage

**main.js**

	var badger = require("badger")(__filename);
	
	badger.error("An error");
	badger.warning("A warning");
	badger.debug("A debug statement");

**Output** 

	[error] main.js:3: An error
	[warning] main.js:4: A warning
	
The debug message is not shown because the highest level log message shown by default is a warning. In order to show debug messages in the scope of a single file, you can do this:

	badger.setLevel("debug");
	
	# debug messages will now be shown
	
Debug messages can also be set to be shown globally:

	badger.setGlobalLevel("debug");
	
#### Where's badger.log?

badger is intentionally does not include a generic log command, because I believe that a generic log command encourages sloppy, unmaintainble logging. All logs can be categorized as either warnings, errors, or debug messages.
