import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListElementComponent } from './list-element.component';

describe('ListElement', () => {
  let component: ListElementComponent;
  let fixture: ComponentFixture<ListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListElementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
