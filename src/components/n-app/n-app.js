import {module, component, inject} from 'angular/decorators';

@module('n')
@component('n-app')
@inject('$scope')
export class AppComponent {
  constructor($scope) {
    $scope.counter = 0;
    $scope.increment = () => $scope.counter ++;
    $scope.decrement = () => $scope.counter --;
  }
}
