var config = require('../config/api-parameters.json');

console.log(config.kimsufi.endpoint);

var ovh = require('ovh')({
    endpoint: config.kimsufi.endpoint,
    appKey: config.kimsufi.application,
    appSecret: config.kimsufi.secret
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

console.log(config.soyoustart.endpoint);

var ovh = require('ovh')({
    endpoint: config.soyoustart.endpoint,
    appKey: config.soyoustart.application,
    appSecret: config.soyoustart.secret
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
