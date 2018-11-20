import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElaborationComponent } from './elaboration.component';

describe('ElaborationComponent', () => {
  let component: ElaborationComponent;
  let fixture: ComponentFixture<ElaborationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElaborationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElaborationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
