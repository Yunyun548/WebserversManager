/**
 * MachineController
 *
 * @description :: Server-side logic for managing Machines
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
     * @return           :: {Json} Status code ||{Json} Status code + {Contract} Model Contract
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
        console.log(req.session.user)
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

    edit: function(req, res) {

    },

    create: function(req, res) {
        return res.view('Manager/Machine/create');
    }

}
