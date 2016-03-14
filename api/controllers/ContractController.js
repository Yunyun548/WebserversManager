/**
 * ContractController
 *
 * @description :: Server-side logic for managing Contracts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
	add: function(req, res)
	{
		var _name = req.param('name');
		var _machineId = req.param('machineId');
		var _monthlyPrice = req.param('monthlyPrice');
		var _dateS = req.param('dateStart');
		var _dateE = req.param('dateEnd');
		if (!_name || !_machineId || !_dateS || !_dateE) return res.json(501,
		{
			err: "Bad parameters - Required : 'name' - string, 'machineId' - integer (id), 'monthlyPrice' - float, 'datetime' - dateStart, 'datetime' - dateEnd"
		})
		console.log(req.session.user)
		Contract.create(
		{
			name: _name,
			integer: _machineId,
			monthlyPrice: _monthlyPrice,
			dateStart: _dateS,
			dateEnd: _dateE,
		}, function(err, contractCreated)
		{
			if (err)
			{
				console.log(err);
				return res.view('Manager/Contract/create',
				{
					message: err
				});
			}
			return res.view('Manager/Contract/create',
			{
				message: 'success',
				contract: contractCreated
			});
		});
	},

    list: function(req, res)
    {
        _currentPage = req.param('currentPage');
		if (!_currentPage) return res.json(501,
		{
			err: "Bad parameters - Required : 'currentPage' - int"
		})

		Contract.find().paginate(
		{
			page: _currentPage,
			limit: 25
		}).exec(function(err, results)
		{
			if (err)
			{
				console.log('/!\ Error : ' + err);
			}
			if (!results) return res.json(404,
			{
				err: 'No events found for this user'
			});
			else
			{
				return res.view('Manager/Contract/view',
				{
					contracts: results,
				});
			}
		});
    },

    view: function(req, res)
    {

    },

    create: function(req, res) {
        return res.view('Manager/Contract/create');
    }

}
