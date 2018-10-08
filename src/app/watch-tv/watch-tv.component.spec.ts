import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchTvComponent } from './watch-tv.component';

describe('WatchTvComponent', () => {
  let component: WatchTvComponent;
  let fixture: ComponentFixture<WatchTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
