import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridViewComponent } from './grid-view.component';

type TestType = { id: number };
describe('GridViewComponent', () => {
  let component: GridViewComponent<TestType>;
  let fixture: ComponentFixture<GridViewComponent<TestType>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridViewComponent<TestType>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
