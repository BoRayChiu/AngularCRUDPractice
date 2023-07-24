import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticalComponent } from './article.component';

describe('ArticalComponent', () => {
  let component: ArticalComponent;
  let fixture: ComponentFixture<ArticalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ArticalComponent]
    });
    fixture = TestBed.createComponent(ArticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
