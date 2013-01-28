"use strict";

var basename = require("path").basename;

var LogLevels =
{
	error: 0,
	warning: 1,
	debug: 2
};

var GLOBAL_LOG_LEVEL = LogLevels.warning;

module.exports = function logger(filename, logLevelName)
{
	return {

		levels: LogLevels,

		// default log level
		LOG_LEVEL: LogLevels[logLevelName] || LogLevels.warning,

		error: function()
		{
			var args = Array.prototype.slice.call(arguments);
			args.unshift(LogLevels.error); 
			this._log.apply(this, args);
		},

		warning: function()
		{
			var args = Array.prototype.slice.call(arguments);
			args.unshift(LogLevels.warning);
			this._log.apply(this, args);
		},

		debug: function()
		{
			var args = Array.prototype.slice.call(arguments);
			args.unshift(LogLevels.debug);
			this._log.apply(this, args);
		},

		_log: function()
		{
			var args = Array.prototype.slice.call(arguments);

			var level = args.shift();

			var prefix = "[" + (valueForKey(LogLevels, level) || "log") + "]";

			if (level > this.LOG_LEVEL && level > GLOBAL_LOG_LEVEL) return;

			// capture location of log message
			var errList = new Error().stack.split('\n')[3].split(/[:)]/);
			var line = errList[errList.length - 3];

			args.unshift(basename(filename) + ":" + line + ":");
			args.unshift(prefix);
			console.log.apply(this, args);
		},

		setLevel: function(name)
		{
			var level = LogLevels[name];

			this.LOG_LEVEL = level;
		},

		setGlobalLevel: function(name)
		{
			var level = LogLevels[name];

			GLOBAL_LOG_LEVEL = level;
		}
	}
}

function valueForKey(object, value)
{
	for (var i in object)
	{
		if (object.hasOwnProperty(i) && object[i] == value) return i;
	}

	return undefined;
}
