var async = require("async");
var moment = require("moment");

module.exports = {

	login: function(req, res)
	{
		return res.view('Manager/login');
	},

	register: function(req, res)
	{
		return res.view('Manager/register');
	},

	success: function(req, res)
	{
		return res.view('Manager/success');
	},

	error: function(req, res)
	{
		return res.view('Manager/error');
	},

	dashboard: function(req, res)
	{
		async.parallel(
			{
                machines: function(callback)
				{
					Machine.count(callback);
				},
				contracts: function(callback)
				{
					Contract.count(callback);
				},
                users: function(callback)
				{
					User.count(callback);
				},
				contractsList: function(callback)
				{
                    Contract.find().paginate(
					{
						page: 1,
						limit: 10
					}).exec(callback);
				},
				machinesList: function(callback)
				{
					Machine.find().paginate(
					{
						page: 1,
						limit: 20
					}).exec(callback);
				}
			},
			function(error, data)
			{
				if (error)
				{
					console.log(error);
					return res.send(500, error);
				}
				else
				{
					return res.view(
						'Manager/dashboard',
						{
							totalUsers: data.users,
							totalMachines: data.machines,
							totalContracts: data.contracts,
							listContracts: data.contractsList,
							listMachines: data.machinesList,
							moment: moment
						});
				}
			}
		);
	},
}
