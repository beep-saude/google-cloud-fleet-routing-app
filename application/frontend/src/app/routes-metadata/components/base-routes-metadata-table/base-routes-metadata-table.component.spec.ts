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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material';
import { DataSource } from 'src/app/shared/models';
import { SharedModule } from 'src/app/shared/shared.module';
import { FakeMatIconRegistry } from 'src/test/material-fakes';
import { RouteMetadata } from '../../models';
import { BaseRoutesMetadataTableComponent } from './base-routes-metadata-table.component';
import { provideMockStore } from '@ngrx/store/testing';
import { selectAllowExperimentalFeatures } from '../../../core/selectors/config.selectors';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-table',
  template: '',
})
class MockTableComponent<T = any> {
  @Input() mouseOverActive: boolean;
  @Input() dataSource: DataSource<T>;
  @Input() itemsSelected: { [id: number]: boolean } = {};
  @Input() columnsToDisplay: string[];
  @Input() totalSelectableItems = 0;
  @Input() itemSize = 49;
  @Input() selectDisabled = false;
  @Output() selectAll = new EventEmitter<void>();
  @Output() deselectAll = new EventEmitter<void>();
  @Output() selectedChange = new EventEmitter<{ id: number; selected: boolean }>();
  @Output() mouseEnterRow = new EventEmitter<any>();
  @Output() mouseExitRow = new EventEmitter<any>();
  @Input() itemsDisabled: { [id: number]: boolean } = {};
}

describe('BaseRoutesMetadataTableComponent', () => {
  let component: BaseRoutesMetadataTableComponent;
  let fixture: ComponentFixture<BaseRoutesMetadataTableComponent>;
  let dataSource: jasmine.SpyObj<DataSource<RouteMetadata>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, SharedModule],
      declarations: [BaseRoutesMetadataTableComponent],
      providers: [
        provideMockStore({
          selectors: [{ selector: selectAllowExperimentalFeatures, value: false }],
        }),
      ],
    })
      .overrideProvider(MatIconRegistry, { useFactory: () => new FakeMatIconRegistry() })
      .overrideProvider(TableComponent, { useValue: new MockTableComponent() })
      .compileComponents();

    dataSource = jasmine.createSpyObj('dataSource', ['attach', 'connect', 'disconnect']);
    dataSource.connect.and.callFake(() => of([]));

    fixture = TestBed.createComponent(BaseRoutesMetadataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format traveled time', () => {
    expect(component.formattedTravelTime(0)).toBe('00:00');
    expect(component.formattedTravelTime(61)).toBe('00:01');
    expect(component.formattedTravelTime(1910)).toBe('00:31');
    expect(component.formattedTravelTime(3600)).toBe('01:00');
    expect(component.formattedTravelTime(7260)).toBe('02:01');
    expect(component.formattedTravelTime(7300)).toBe('02:01');
    expect(component.formattedTravelTime(86400)).toBe('24:00');
    expect(component.formattedTravelTime(90120)).toBe('25:02');
  });
});
