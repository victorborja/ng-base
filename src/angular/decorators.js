import _ from 'lodash';
import angular from 'angular';
import {componentView} from 'config/loaders';

function registerService(mod, Target) {
  function service(...args) {
    return new Target(...args);
  }
  const serviceName = Target.$service.name;
  const deps = _.flatten([ Target.$inject || [], [service] ]);
  mod.factory(serviceName, deps);
}

function registerController(mod, target) {
  mod.controller(target.$controller.name, target);
}

function registerFilter(mod, Target) {
  function filter(...args) {
    const instance = new Target(...args);
    return instance.filter.bind(instance);
  }
  const filterName = Target.$filter.name;
  const deps = _.flatten([ Target.$inject || [], [filter] ]);
  mod.filter(filterName, deps);
}

function registerComponent(mod, target) {
  const elementName = target.$component.elementName || _.kebabCase(target.$component.name);
  const directiveName = target.$component.directiveName || _.camelCase(target.$component.name);
  const controllerName = target.$component.controllerName || `${directiveName}Ctrl`;
  const view = target.$component.view || `${elementName}/${elementName}`;
  const template = target.$component.template || componentView(view);
  mod.controller(controllerName, target);
  mod.directive(directiveName, function directive() {
    return {
      restrict: 'E',
      template: template,
      controller: controllerName,
      controllerAs: target.$component.controllerAs || directiveName,
      scope: target.$component.scope || {}
    };
  });
}

function registerComponentRoute(mod, target) {
  mod.config(['$stateProvider', function config($stateProvider) {
      const elementName = target.$component.elementName || _.kebabCase(target.$component.name);
      const template = `<${elementName}></${elementName}>`;
      $stateProvider.state(target.$route.name, _.merge({
        template: template
      }, target.$route));
    }]);
}

function namedDecorator(type) {
  return function named(name, options) {
    function decorator(target) {
      target[type] = _.merge({
        name: name || target.name
      }, options || {});
      return target;
    }
    if (typeof name === 'function') {
      const target = name;
      const targetName = target.name;
      return named(targetName, options)(target);
    }
    return decorator;
  };
}

const filter = namedDecorator('$filter');
const service = namedDecorator('$service');
const controller = namedDecorator('$controller');
const component = namedDecorator('$component');
export { angular, filter, service, controller, component };

export function module(...args) {
  return function decorator(target) {
    const mod = angular.module(...args);
    if (target.$component) {
      registerComponent(mod, target);
      if (target.$route) {
        registerComponentRoute(mod, target);
      }
    } else if (target.$service) {
      registerService(mod, target);
    } else if (target.$filter) {
      registerFilter(mod, target);
    } else if (target.$controller) {
      registerController(mod, target);
    }
    return target;
  };
}

export function inject(...deps) {
  return function decorator(target) {
    target.$inject = deps;
  };
}

export function route(name, url, options) {
  return function decorator(target) {
    target.$route = _.merge({
      name: name,
      url: url
    }, options || {});
  };
}
