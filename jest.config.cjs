/** @format */

const { defaults } = require("jest-config");
module.exports = {
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.js$": "babel-jest",
	},
	moduleNameMapper: {
		"^src/(.*)$": "<rootDir>/src/$1",
	},
};
