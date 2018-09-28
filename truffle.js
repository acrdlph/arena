var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "lesson food wrist slam giggle scale twice maximum promote syrup police cloud";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/c640a46558fb49dfabcd5d5d14cbf7b7");
      },
      network_id: 1
    }
  }
};
