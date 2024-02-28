import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaniaTsComponent } from './campania.ts.component';

describe('CampaniaTsComponent', () => {
  let component: CampaniaTsComponent;
  let fixture: ComponentFixture<CampaniaTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaniaTsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaniaTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
