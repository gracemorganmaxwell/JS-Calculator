/** @format */

module.exports = {
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"\\.(css|less)$": "identity-obj-proxy",
	},
	setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
	transform: {
		"^.+\\.js$": "babel-jest",
	},
};
