import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponents } from 'ng-mocks';
import { AppComponent } from './app.component';

describe('AppComponent', (): void => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponents(
          MatToolbar,
          MatToolbarRow,
          MatSidenavContainer,
          MatSidenav,
          MatSidenavContent,
          MatNavList,
          MatIcon,
        ),
      ],
      imports: [RouterTestingModule],
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
});
