/**
 * ContractController
 *
 * @description :: Server-side logic for managing Contracts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var async = require("async");
var moment = require('moment');

module.exports = {

    /**
     * CreateOne
     * @description      :: Crée un Contrat
     * @route            :: /api/contract/create
     * @methode          :: POST
     * @param            :: {string} name
     * @param            :: {integer} machineId
     * @param            :: {float} monthlyPrice
     * @param            :: {string} dateStart
     * @param            :: {string} dateEnd
     * @return           :: {Json} Status code ||{Json} Status code + {Contract} Model Contract
     */
    add: function(req, res) {
        var _name = req.param('name');
        var _monthlyPrice = req.param('monthlyPrice');
        var _dateS = req.param('dateStart');
        var _dateE = req.param('dateEnd');
        var _machineId = req.param('machineId');
        if (!_name || !_monthlyPrice || !_dateS || !_dateE) return res.json(501, {
            err: "Bad parameters - Required : 'name' - string, 'monthlyPrice' - float, 'datetime' - dateStart, 'datetime' - dateEnd"
        })
        Contract.create({
            name: _name,
            machine: _machineId,
            monthlyPrice: _monthlyPrice,
            dateStart: _dateS,
            dateEnd: _dateE,
        }, function(err, contractCreated) {
            if (err) {
                console.log(err);
                return res.view('Manager/Contract/create', {
                    message: err
                });
            }
            async.parallel({
                    machinesList: function(callback) {
                        Machine.find().exec(callback);
                    }
                },
                function(error, data) {
                    if (error) {
                        console.log(error);
                        return res.view('Manager/Contract/create', {
                            message: err
                        });
                    } else {
                        return res.view(
                            'Manager/Contract/create', {
                                machines: data.machinesList,
                                message: 'success',
                                contract: contractCreated

                        });
                    }
                }
            );
        });
    },

    list: function(req, res) {
        _currentPage = req.param('currentPage');
        if (!_currentPage) return res.json(501, {
            err: "Bad parameters - Required : 'currentPage' - int"
        })

        Contract.find().paginate({
            page: _currentPage,
            limit: 20
        }).exec(function(err, results) {
            if (err) {
                console.log('/!\ Error : ' + err);
            }
            if (!results) return res.json(404, {
                err: 'No events found for this user'
            });
            else {
                console.log(results)
                return res.view('Manager/Contract/view', {
                    contracts: results,
                    moment: moment
                });
            }
        });
    },

    view: function(req, res) {
        var _id = req.param('id');
        if (!_id) return res.json(501, {
            err: "Bad parameters - Required : 'id' - string"
        })
        Contract.findOne({
            id: _id
        }).exec(function(err, result) {
            if (err) {
                console.log('/!\ Error : ' + err);
            }
            if (!result) return res.json(404, {
                err: err
            });
            else {
                return res.view('Manager/Contract/single-view', {
                    contract: result
                });
            }
        });
    },

    edit: function(req, res) {

    },

    create: function(req, res) {
        async.parallel({
                machinesList: function(callback) {
                    Machine.find().exec(callback);
                }
            },
            function(error, data) {
                if (error) {
                    console.log(error);
                    return res.send(500, error);
                } else {
                    return res.view(
                        'Manager/Contract/create', {
                            machines: data.machinesList,
                    });
                }
            }
        );
    }
}
