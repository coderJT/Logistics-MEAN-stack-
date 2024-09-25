import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDriversByDepartmentComponent } from './list-drivers-by-department.component';

describe('ListDriversByDepartmentComponent', () => {
  let component: ListDriversByDepartmentComponent;
  let fixture: ComponentFixture<ListDriversByDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDriversByDepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDriversByDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
