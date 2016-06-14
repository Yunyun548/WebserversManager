/**
 * MachineController
 *
 * @description :: Server-side logic for managing Machines
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var config = require('../../config/api-parameters.json');

module.exports = {

    /**
     * CreateOne
     * @description      :: Crée une machine
     * @route            :: /api/machines/create
     * @methode          :: POST
     * @param            :: {string} name
     * @param            :: {strinf} ip
     * @param            :: {string} dns
     * @param            :: {float} monthlyPrice
     * @param            :: {string} seller
     * @return           :: {Json} Status code ||{Json} Status code + {Machine} Model Machine
     */
    add: function(req, res) {
        var _name = req.param('name');
        var _ip = req.param('ip');
        var _dns = req.param('dns');
        var _monthlyPrice = req.param('monthlyPrice');
        var _seller = req.param('seller');
        if (!_name || !_ip || !_dns || !_monthlyPrice || !_seller) return res.json(501, {
            err: "Bad parameters - Required : 'name' - string, 'ip' - string, 'monthlyPrice' - float, 'dns' - string, 'seller' - string"
        })
        Machine.create({
            name: _name,
            ip: _ip,
            dns: _dns,
            monthlyPrice: _monthlyPrice,
            seller: _seller,
        }, function(err, machineCreated) {
            if (err) {
                console.log(err);
                return res.view('Manager/Machine/create', {
                    message: err
                });
            }
            return res.view('Manager/Machine/create', {
                message: 'success',
                contract: machineCreated
            });
        });
    },

    list: function(req, res) {
        _currentPage = req.param('currentPage');
        if (!_currentPage) return res.json(501, {
            err: "Bad parameters - Required : 'currentPage' - int"
        })

        Machine.find().paginate({
            page: _currentPage,
            limit: 25
        }).exec(function(err, results) {
            if (err) {
                console.log('/!\ Error : ' + err);
            }
            if (!results) return res.json(404, {
                err: 'No events found for this user'
            });
            else {
                return res.view('Manager/Machine/view', {
                    machines: results,
                });
            }
        });
    },

    view: function(req, res) {
        var _id = req.param('id');
        if (!_id) return res.json(501, {
            err: "Bad parameters - Required : 'id' - string"
        })
        Machine.findOne({
            id: _id
        }).exec(function(err, result) {
            if (err) {
                console.log('/!\ Error : ' + err);
            }
            if (!result) return res.json(404, {
                err: err
            });
            else {
                return res.view('Manager/Machine/single-view', {
                    machine: result
                });
            }
        });
    },

    getForm: function(req, res) {
        var _id = req.param('id');
        if (!_id) return res.json(501, {
            err: "Bad parameters - Required : 'id' - string"
        })
        Machine.findOne({
            id: _id
        }).exec(function(err, result) {
            if (err) {
                console.log('/!\ Error : ' + err);
            }
            if (!result) return res.json(404, {
                err: err
            });
            else {
                return res.view('Manager/Machine/edit', {
                    machine: result
                });
            }
        });
    },


    /**
     * CreateOne
     * @description      :: Update a machine
     * @route            :: /api/machines/update
     * @methode          :: POST
     * @param            :: {string} id
     * @param            :: {string} name
     * @param            :: {strinf} ip
     * @param            :: {string} dns
     * @param            :: {float} monthlyPrice
     * @param            :: {string} seller
     * @return           :: {Json} Status code ||{Json} Status code + {Machine} Model Machine
     */
    update: function(req, res) {
        var _id = req.param('id');
        var _name = req.param('name');
        var _ip = req.param('ip');
        var _dns = req.param('dns');
        var _monthlyPrice = req.param('monthlyPrice');
        var _seller = req.param('seller');
        if (!_id || !_name || !_ip || !_dns || !_monthlyPrice || !_seller) return res.json(501, {
            err: "Bad parameters - Required : 'id' - string, 'name' - string, 'ip' - string, 'monthlyPrice' - float, 'dns' - string, 'seller' - string"
        })
        Machine.update(_id, {
            name: _name,
            ip: _ip,
            dns: _dns,
            monthlyPrice: _monthlyPrice,
            seller: _seller,
        }).exec(function afterwards(err, result) {
            if (err) {
                console.log('/!\ Error : ' + err);
                return;
            }

            return res.view('Manager/Machine/edit', {
                machine: result,
                message : "success"
            });
        });
    },

    create: function(req, res) {
        return res.view('Manager/Machine/create');
    },

    getLoad: function(req, res) {
        _serviceName = req.param('serviceName');
        _seller = req.param('seller');
        if (!_serviceName || !_seller) return res.json(501, {
            err: "Bad parameters - Required : 'serviceName' - string + 'seller' - string"
        })
        else {

            switch (_seller) {
                case 'kimsufi':
                    var endpn = 'kimsufi-eu'
                    var appKey = config.kimsufi.application
                    var appSecret = config.kimsufi.secret
                    var consumerKey = config.kimsufi.consumer
                    break;
                case 'soyoustart':
                    var endpn = 'soyoustart-eu'
                    var appKey = config.soyoustart.application
                    var appSecret = config.soyoustart.secret
                    var consumerKey = config.soyoustart.consumer
                    break;
                case 'ovh':
                    var endpn = 'ovh-eu'
                    var appKey = config.ovh.application
                    var appSecret = config.ovh.secret
                    var consumerKey = config.ovh.consumer
                    break;
                default:
                    return res.json(400, {
                        err: "Bad Request"
                    });
                    break;
            }


            var ovh = require('ovh')({
                endpoint: endpn,
                appKey: appKey,
                appSecret: appSecret,
                consumerKey: consumerKey
            });

            var path = '/dedicated/server/' + _serviceName + '/statistics/load';

            ovh.request('GET', path, function(err, data) {
                if (err) {
                    console.log('/!\ Error : ' + err);
                } else {
                    return res.json(200, {
                        response: data
                    })
                }
            });

        }
    },

}
