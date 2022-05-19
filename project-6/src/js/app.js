App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x1A58e72531E280634E53544Da05111D41303c09E",
    originManufacturererID: "0x1A58e72531E280634E53544Da05111D41303c09E",
    originManufacturerName: null,
    originManufacturerInformation: null,
    productNotes: null,
    productPrice: 0,
    manufacturerID: "0xe75B532b11318E2b5f3424d9C82065eF422BaaB9",
    auditorID: "0xe6B1b9e1661565257A9072bC1075443284343F5F",
    maintainerID: "0x465D859585c1104a38De900C775245e9861049E4",
    endUserID: "0x5dA886443Ca7e9d9B70892D72975E685325d7A37",
    assigneeID: "",
    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originManufacturererID = $("#originManufacturererID").val();
        App.originManufacturerName = $("#originManufacturerName").val();
        App.originManufacturerInformation = $("#originManufacturerInformation").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.auditorID = $("#auditorID").val();
        App.endUserID = $("#endUserID").val();
        App.manufacturerID = $("#manufacturerID").val();
        App.maintainerID = $("#maintainerID").val();
        App.certificationNotes =  $("#certificationNotes").val();
        App.quoteMaintenaceCost= $("#quoteMaintenaceCost").val() ;
        App.quoteMaintenaceFee = $("#quoteMaintenaceFee").val();
        App.quoteMaintenanceNote = $("#quoteMaintenanceNote").val();
        App.maintenanceInspection = $("#maintenanceInspection").val();
        App.purchaseValue = $("#purchaseValue").val();
        App.maintenanceQouteCostFee = $("#maintenanceQouteCostFee").val();
        App.assigneeID = $("#assigneeID").val();
        console.log(
            App.sku,
            App.upc,
            App.ownerID, 
            App.originManufacturererID, 
            App.originManufacturerName, 
            App.originManufacturerInformation,
            App.productNotes, 
            App.productPrice, 
            App.auditorID, 
            App.endUserID,
            App.maintainerID,
            App.manufacturerID,
            App.purchaseValue,
            App.certificationNotes,
            App.quoteMaintenanceNote,
            App.maintenanceInspection,
            App.quoteMaintenaceFee,
            App.quoteMaintenaceCost,
            App.maintenanceQouteCostFee,
            App.assigneeID
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://192.168.1.118:8545');
        }

        App.getMetaskAccountID();

        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err);
                return;
            }
            console.log('getMetaskID:',res);
            App.metamaskAccountID = res[0];

        })
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='../../build/contracts/SupplyChain.json';
        
        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            console.log('data',data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
            
            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();
            App.fetchEvents();

        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();
        App.readForm();
        App.getMetaskAccountID();
        
        var processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);

        switch(processId) {
            case 1:
                return await App.createEquipment(event);
                break;
            case 2:
                return await App.manufactureEquipment(event);
                break;
            case 3:
                return await App.modifyEquipment(event);
                break;
            case 4:
                return await App.requestCertification(event);
                break;
            case 5:
                return await App.shipEquipment(event);
                break;
            case 6:
                return await App.requestModification(event);
                break;
            case 7:
                return await App.inspectEquipment(event);
                break;
            case 8:
                return await App.rejectCertification(event);
                break;
            case 9:
                return await App.certifyEquipment(event);
                break;
            case 10:
                return await App.quoteMaintenace(event);
                break;
            case 11:
                return await App.requireRepair(event);
                break;
            case 12:
                return await App.inspectEquipmentMaintainance(event);
                break;
            case 13:
                return await App.purchaseEquipment(event);
                break;
            case 14:
                return await App.receiveEquipment(event);
                break;
            case 15:
                return await App.commissioningEquipment(event);
                break;
            case 16:
                return await App.utilseEquipment(event);
                break;
            case 17:
                return await App.orderMaintainance(event);
                break;
            case 18:
                return await App.rejectMaintenanceQoute(event);
                break;
            case 19:
                return await App.payMaintenanceQuote(event);
                break;
            case 20:
                return await App.repairEquipment(event);
                break;
            case 21:
                return await App.requestInspection(event);
                break;
            case 22:
                return await App.shipEquipmentMaintainer(event);
                break;
            case 23:
                return await App.addManufacturer(event);
                break;
            case 24:
                return await App.addAuditor(event);
                break;
            case 25:
                return await App.addEndUser(event);
                break;
            case 26:
                return await App.addMaintainer(event);
                break;
            case 27:
                return await App.fetchItemBufferOne(event);
                break;
            case 28:
                return await App.fetchItemBufferTwo(event);
                break;
            }
    },

    createEquipment: function(event) {
        console.log('createEquipment started');
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.createEquipment(
                App.upc, 
                App.manufacturerID, 
                App.originManufacturerName, 
                App.originManufacturerInformation,
                App.productNotes,
                App.productPrice, {from: App.metamaskAccountID}
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('createEquipment',result);
        }).catch(function(err) {
            console.log(err.message);
        });
        console.log('createEquipment finished');
    },

    manufactureEquipment: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.manufactureEquipment(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('manufactureEquipment',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    modifyEquipment: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.modifyEquipment(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('modifyEquipment',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    requestCertification: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.requestCertification(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('requestCertification',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    shipEquipment: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.shipEquipment(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('shipEquipment',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    requestModification: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.requestModification(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('requestModification',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    inspectEquipment: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.inspectEquipment(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('inspectEquipment',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    rejectCertification: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.rejectCertification(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('rejectCertification',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    certifyEquipment: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.certifyEquipment(App.upc, App.certificationNotes, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('certifyEquipment',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    quoteMaintenace: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.quoteMaintenace(App.upc, App.quoteMaintenaceCost, App.quoteMaintenaceFee, App.quoteMaintenanceNote, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('quoteMaintenace',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    requireRepair: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.requireRepair(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('requireRepair',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    inspectEquipmentMaintainance: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.inspectEquipmentMaintainance(App.upc, (App.maintenanceInspection === 'true'), {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('inspectEquipmentMaintainance',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    purchaseEquipment: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        console.log('args',
        App.upc, 
        App.manufacturerID, 
        App.auditorID, 
        App.endUserID, 
        App.metamaskAccountID);

        const walletValue = web3.toWei(3, "ether");
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.purchaseEquipment(App.upc, App.auditorID, {from: App.metamaskAccountID, value: App.purchaseValue});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('purchaseEquipment',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    receiveEquipment: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.receiveEquipment(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('receiveEquipment',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    commissioningEquipment: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.commissioningEquipment(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('commissioningEquipment',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    utilseEquipment: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.utilseEquipment(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('utilseEquipment',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    orderMaintainance: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.orderMaintainance(App.upc, App.maintainerID, App.auditorID, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('orderMaintainance',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    rejectMaintenanceQoute: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.rejectMaintenanceQoute(App.upc, {from: App.metamaskAccountID, value: App.maintenanceQouteCostFee});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('rejectMaintenanceQoute',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    payMaintenanceQuote: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.payMaintenanceQuote(App.upc, {from: App.metamaskAccountID, value: App.maintenanceQouteCostFee});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('payMaintenanceQuote',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    repairEquipment: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.repairEquipment(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('repairEquipment',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    requestInspection: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.requestInspection(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('requestInspection',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    shipEquipmentMaintainer: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.shipEquipmentMaintainer(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('shipEquipmentMaintainer',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    addManufacturer: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.addManufacturer(App.assigneeID, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('addManufacturer',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    addAuditor: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.addAuditor(App.assigneeID, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('addAuditor',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    addEndUser: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.addEndUser(App.assigneeID, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('addEndUser',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    addMaintainer: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.addMaintainer(App.assigneeID, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('addMaintainer',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    fetchItemBufferOne: function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        console.log('upc',App.upc);

        App.contracts.SupplyChain.deployed().then(function(instance) {
            //return instance.isManufacturer(App.auditorID, {from: App.metamaskAccountID});
            return instance.fetchItemBufferOne(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchItemBufferOne', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchItemBufferTwo: function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        console.log('upc',App.upc);

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferTwo.call(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchItemBufferTwo', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
        var events = instance.allEvents(function(err, log){
          if (!err)
            $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
        });
        }).catch(function(err) {
          console.log(err.message);
        });
        
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
