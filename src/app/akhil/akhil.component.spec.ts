import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkhilComponent } from './akhil.component';

describe('AkhilComponent', () => {
  let component: AkhilComponent;
  let fixture: ComponentFixture<AkhilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkhilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkhilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
