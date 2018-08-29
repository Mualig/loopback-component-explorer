// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-component-explorer
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';


// Refactoring of inline script from index.html.
/*global SwaggerUi, log, ApiKeyAuthorization, hljs, window, $ */
$(function () {
    // Pre load translate...
    if (window.SwaggerTranslator) {
        window.SwaggerTranslator.translate();
    }

    var lsKey = 'swagger_accessToken';
    $.getJSON('config.json', function (config) {
        log(config);
        loadSwaggerUi(config);

      $('.topbar-wrapper').remove();
      setTimeout(function () {
          $('.information-container').remove();
        }, 300)
    });

    const UpdateTitle = function(system) {
        return {
            statePlugins: {
                spec: {
                    wrapActions: {
                        updateSpec: (oriAction, system) => (str) => {
                            try {
                                let js = JSON.parse(str);
                                document.title = js.info.title;
                            } catch (ex) {
                                log(ex);
                            }
                            return oriAction(str)
                        }
                    }
                }
            }
        }
    };

    var accessToken;

    function loadSwaggerUi(config) {
        var methodOrder = ['get', 'head', 'options', 'put', 'post', 'delete'];
        /* eslint-disable camelcase */
        // Build a system
        window.swaggerUi = new SwaggerUIBundle({
            validatorUrl:      "",
            url:               config.url || 'swagger.json',
            dom_id:            '#swagger-ui',
            presets:           [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
            ],
            plugins:           [
                SwaggerUIBundle.plugins.DownloadUrl,
                UpdateTitle
            ],
            layout:            "StandaloneLayout",
            apiKey:            '',
            oauth2RedirectUrl: config.oauth2RedirectUrl
        });
        window.ui        = swaggerUi;
        /* eslint-disable camelcase */
    }

    function log() {
        if ('console' in window) {
            console.log.apply(console, arguments);
        }
    }
});
