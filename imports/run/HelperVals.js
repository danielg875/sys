import { Positions } from '../api/positions.js';
import { Candidates } from '../api/candidates.js';
import { Companies } from '../api/companies.js';

export const HelperVals = function($state, $rootScope, $reactive) { 

  tempDate = new Date();
  $rootScope.currentDate = tempDate.toJSON();
  $rootScope.currentDay = tempDate.getDate();
  $rootScope.currentMonth = tempDate.getMonth() + 1;
  $rootScope.currentYear = tempDate.getFullYear();

  $reactive(this).attach($rootScope);

  this.subscribe('positions');
  this.subscribe('companies');
  this.subscribe('candidates');

  $rootScope.stateDetails = $state;
  $rootScope.$watch('stateDetails.current.name', function(newValue, oldValue) {
      if(newValue == 'dashboard'){
        if(!$rootScope.companiesModel){
          $state.go('setup')
        } else if ($rootScope.companiesModel.length == 0){
          $state.go('setup')
        }
      };

      if(newValue == 'positionNew'){
        if(!$rootScope.companiesModel){
          $state.go('setup')
        } else if ($rootScope.companiesModel.length == 0){
          $state.go('setup')
        }
      };
      
      $rootScope.stateName = newValue;
    });



  $rootScope.helpers({
    focusSurvey() {
      return Positions.findOne({_id: $rootScope.stateDetails.params.positionId});
    }
  });

  $rootScope.helpers({
    focusCandidate() {
      return Candidates.findOne({_id: $rootScope.stateDetails.params.candidateId});
    }
  });

  $rootScope.helpers({
      positions() {
        return Positions.find({fullyRemoved: false, createdBy: Meteor.userId()});
      }
    });

  $rootScope.helpers({
  	candidates() {
        return Candidates.find({fullyRemoved: false});
      }
  });

  $rootScope.helpers({
    companiesModel() {
      return Companies.find({createdBy: Meteor.userId()});
    }
  });

};