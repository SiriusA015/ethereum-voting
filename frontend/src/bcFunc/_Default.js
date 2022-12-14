_Default = {

    contracts : {},

    load: async () => {
        await this.loadWeb3();
        await this.loadAccount(); 
        await this.loadContract();
        await _Main.render();
    },

    loadWeb3: async () => {
        if(typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
            _Main.web3Provider = web3.currentProvider;
        }else {
            window.alert("Please connect to Metamask");
        }

        if(window.ethereum) {
            window.web3 = new Web3(ethereum);
            try {
                await ethereum.enable();
                web3.eth.sendTransaction({ });
            }catch (error) {

            }
        }else if(window.web3) {
            _Main.web3Provider = web3.currentProvider;
            window.web3 = new Web3(web3.currentProvider);
            web3.eth.sendTransaction({});
        }else{
            console.log('Non-Ethereum Browser detected');
        }
    },

    loadAccount: async() => {
        await web3.eth.getAccounts().then((result)=>{
            _Main.account = result[0];
        });
    },

    loadContract: async () => {
        const MainContract = await $.getJSON('/mainContractJSON');
        this.contracts.MainContract = TruffleContract(MainContract);
        this.contracts.MainContract.setProvider(_Main.web3Provider);
        
        _Main.MainContract = await this.contracts.MainContract.deployed();
    }
}

$(() => {
    window.addEventListener('load', ()=>{
        this.load();
    })
});

export default _Default;