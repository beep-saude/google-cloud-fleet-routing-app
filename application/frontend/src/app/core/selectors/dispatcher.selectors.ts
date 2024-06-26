/*
Copyright 2024 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDispatcher from '../reducers/dispatcher.reducer';

export const selectDispatcherState = createFeatureSelector<fromDispatcher.State>(
  fromDispatcher.dispatcherFeatureKey
);

export const selectScenario = createSelector(selectDispatcherState, fromDispatcher.selectScenario);

export const selectSolution = createSelector(selectDispatcherState, fromDispatcher.selectSolution);

export const selectBatchTime = createSelector(
  selectDispatcherState,
  fromDispatcher.selectBatchTime
);

export const selectTimeOfResponse = createSelector(
  selectDispatcherState,
  fromDispatcher.selectTimeOfResponse
);

export const selectSolutionTime = createSelector(
  selectDispatcherState,
  fromDispatcher.selectSolutionTime
);

export const selectNumberOfRoutes = createSelector(
  selectSolution,
  (solution) => solution?.routes?.length || 0
);

export const selectTotalCost = createSelector(
  selectSolution,
  (solution) => solution?.metrics.totalCost || 0
);

export const selectRoutes = createSelector(selectSolution, (solution) => solution?.routes || []);

export const selectScenarioName = createSelector(
  selectDispatcherState,
  fromDispatcher.selectScenarioName
);
