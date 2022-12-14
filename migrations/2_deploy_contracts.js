const MainContract = artifacts.require("MainContract");
const Election = artifacts.require("Election");

module.exports = function(deployer) {
	deployer.deploy(MainContract);
	deployer.deploy(Election, ["Election 0", "This is initial Election with ID = 0"], [0,1], ["Candidate0"]);
};