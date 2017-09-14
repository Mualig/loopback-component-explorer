// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-component-explorer
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

// Refactoring of inline script from index.html.
/*global SwaggerUi, log, ApiKeyAuthorization, hljs, window, $ */
$(function() {
  // Pre load translate...
  if (window.SwaggerTranslator) {
    window.SwaggerTranslator.translate();
  }

  var lsKey = 'swagger_accessToken';
  $.getJSON('config.json', function(config) {
    log(config);
    loadSwaggerUi(config);
  });

  var accessToken;
  console.log(SwaggerUIBundle.presets.apis);
  function loadSwaggerUi(config) {
    var methodOrder = ['get', 'head', 'options', 'put', 'post', 'delete'];
    /* eslint-disable camelcase */
    window.swaggerUi = new SwaggerUIBundle({
      validatorUrl: null,
      url: config.url || 'swagger.json',
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      plugins: [
      ],
      layout: "StandaloneLayout",
      apiKey: '',
      oauth2RedirectUrl: config.oauth2RedirectUrl
    });
    window.ui = swaggerUi;
    /* eslint-disable camelcase */

  }

  function log() {
    if ('console' in window) {
      console.log.apply(console, arguments);
    }
  }
});
