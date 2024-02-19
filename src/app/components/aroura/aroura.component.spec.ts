import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArouraComponent } from './aroura.component';

describe('ArouraComponent', () => {
  let component: ArouraComponent;
  let fixture: ComponentFixture<ArouraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArouraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArouraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
