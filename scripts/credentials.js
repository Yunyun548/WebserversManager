var config = require('../config/api-parameters.json');

for (var credentials in config) {

console.log(credentials['endpoint']);

var ovh = require('ovh')({
    endpoint: credentials.endpoint,
    appKey: credentials.application,
    appSecret: credentials.secret
});

ovh.request('POST', '/auth/credential', {
    'accessRules': [{
        'method': 'GET',
        'path': '/*'
      }, {
         'method': 'POST',
         'path': '/*'
      }, {         'method': 'PUT',
         'path': '/*'
      }, {
       'method': 'DELETE',
        'path': '/*'
      }]
  }, function(error, credential) {
      console.log(error || credential);
  });
}
