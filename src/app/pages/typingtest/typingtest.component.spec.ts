import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingtestComponent } from './typingtest.component';

describe('TypingtestComponent', () => {
  let component: TypingtestComponent;
  let fixture: ComponentFixture<TypingtestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypingtestComponent]
    });
    fixture = TestBed.createComponent(TypingtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
