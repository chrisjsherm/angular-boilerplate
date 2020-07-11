import { TestBed } from '@angular/core/testing';

import { HeroesHttpService } from './heroes-http.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RuntimeConfigurationService } from '../runtime-configuration/runtime-configuration.service';
import { MockRuntimeConfigurationService } from '../runtime-configuration/testing/mock-runtime-configuration.service';

describe('HeroesHttpService', (): void => {
  let service: HeroesHttpService;
  let httpTestingController: HttpTestingController;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: RuntimeConfigurationService,
          useClass: MockRuntimeConfigurationService,
        },
      ],
    });

    service = TestBed.inject(HeroesHttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach((): void => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', (): void => {
    expect(service).toBeTruthy();
  });

  it('should read Heroes', (): void => {
    // Act
    service.read().subscribe();

    // Assert
    const testRequest = httpTestingController.expectOne(
      'http://192.1.1.1:8282/api/v1/heroes',
    );
    expect(testRequest.request.method).toBe('GET');
  });
});
