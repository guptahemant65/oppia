// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Unit tests for the controller of the page showing the
 * user's explorations.
 */

require('pages/creator_dashboard/CreatorDashboard.ts');

describe('Creator dashboard controller', function() {
  describe('CreatorDashboard', function() {
    var scope, ctrl, $httpBackend;
    var CREATOR_DASHBOARD_DATA_URL = '/creatordashboardhandler/data';
    var dashboardData = {
      explorations_list: [{
        category: 'Featured category',
        id: 'featured_exp_id',
        num_open_threads: 2,
        num_total_threads: 3,
        status: 'public',
        title: 'Featured exploration'
      }, {
        category: 'Private category',
        id: 'private_exp_id',
        num_open_threads: 0,
        num_total_threads: 0,
        status: 'private',
        title: 'Private exploration'
      }],
      collections_list: [],
      dashboard_stats: {
        total_plays: 2,
        average_ratings: 3,
        num_ratings: 2,
        total_open_feedback: 1
      },
      last_week_stats: {
        total_plays: 1,
        average_ratings: 4,
        num_ratings: 1,
        total_open_feedback: 0
      }
    };

    beforeEach(
      angular.mock.module('oppia', GLOBALS.TRANSLATOR_PROVIDER_FOR_TESTS));

    beforeEach(function() {
      angular.mock.module('oppia');
    });

    beforeEach(angular.mock.inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
    }));

    beforeEach(angular.mock.inject(
      function($controller, $rootScope, CreatorDashboardBackendApiService) {
        $httpBackend.expect('GET', CREATOR_DASHBOARD_DATA_URL).respond(
          dashboardData);
        scope = $rootScope.$new();
        ctrl = $controller('CreatorDashboard', {
          $scope: scope,
          AlertsService: null,
          CreatorDashboardBackendApiService: CreatorDashboardBackendApiService
        });
      }
    ));

    it('should have the correct data for creator dashboard', function() {
      $httpBackend.flush();
      expect(scope.explorationsList).toEqual(dashboardData.explorations_list);
      expect(scope.collectionsList).toEqual(dashboardData.collections_list);
      expect(scope.dashboardStats).toEqual(dashboardData.dashboard_stats);
      expect(scope.lastWeekStats).toEqual(dashboardData.last_week_stats);
    });
  });
});
