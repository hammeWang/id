const Proxy = artifacts.require('OwnedUpgradeabilityProxy');
const TakeBackNFT = artifacts.require('TakeBackNFT');

const conf = {
    networkId: 42,
    registry_address: '0xd8b7a3f6076872c2c37fb4d5cbfeb5bf45826ed7'
}

module.exports = async(deployer, network) => {

    if(network != 'kovan') {
        return;
    }

    deployer.deploy(Proxy);
    deployer.deploy(TakeBackNFT).then(async() => {
        let proxy = await Proxy.deployed();

        // update
        await proxy.upgradeTo(TakeBackNFT.address);

        // initialize
        let takeBackNFTProxy = await TakeBackNFT.at(proxy.address);
        await takeBackNFTProxy.initializeContract(conf.registry_address, conf.networkId);
    })
}