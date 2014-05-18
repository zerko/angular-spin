(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular', 'spin'], factory);
    } else { 
        factory(root.angular, root.Spinner);
    }
}(this, function (angular, Spinner) {
    'use strict';
    angular.module('spin.js', [])
        .directive('spin', function () {
            var getColor = function (el) {
                    var color;
                    el = el[0];
                    if (window.getComputedStyle) {
                        color = window.getComputedStyle(el, null).getPropertyValue('color');
                    } else if (document.documentElement.currentStyle) {
                        color = el.currentStyle['color'];
                    }
                    return color;
                },
                augmentOpts = function (color, opts) {
                    if (!opts.color) {
                        opts.color = color;
                    }
                };
            return {
                restrict: 'A',
                transclude:true,
                replace:true,
                template: '<div ng-transclude></div>',
                scope: {
                    config: '=spin',
                    spinif: '=spinIf'
                },
                link: function (scope, element, attrs) {
                    var cssColor = element.css('color') || getColor(element),
                        stoped = false,
                        hideElement = !!scope.config.hideElement,
                        spinner;
                    augmentOpts(cssColor, scope.config),
                    spinner = new Spinner(scope.config),
                    spinner.spin(element[0]);

                    scope.$watch('config', function (newValue, oldValue) {
                        if (newValue == oldValue)
                            return;
                        spinner.stop();
                        hideElement = !!newValue.config.hideElement;
                        spinner = new Spinner(newValue);
                        if (!stoped)
                            spinner.spin(element[0]);
                    }, true);

                    if (attrs.hasOwnProperty('spinIf')) {
                        scope.$watch('spinif', function (newValue) {
                            if (newValue) {
                                spinner.spin(element[0]);
                                if (hideElement) {
                                    element.css('display', '');
                                }
                                stoped = false
                            } else {
                                spinner.stop();
                                if (hideElement) {
                                    element.css('display', 'none');
                                }
                                stoped = true
                            }
                        });
                    }

                    scope.$on('$destroy', function() {
                        spinner.stop();
                    });
                }
            }
        });
}));
