import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', (): void => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', (): void => {
    expect(component).toBeTruthy();
  });

  it('should set isHandset$ property', async (): Promise<void> => {
    // Arrange
    const isHandset$ = component.isHandset$;

    // Act
    fixture.detectChanges();
    await fixture.whenRenderingDone();

    // Assert
    isHandset$.subscribe((isHandset: boolean): void => {
      expect(isHandset).toBeDefined();
    });

    return Promise.resolve();
  });
});
