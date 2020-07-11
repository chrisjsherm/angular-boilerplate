import { TestBed } from '@angular/core/testing';

import { RuntimeConfigurationService } from './runtime-configuration.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

describe('RuntimeConfigurationService', (): void => {
  let service: RuntimeConfigurationService;
  let httpTestingController: HttpTestingController;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(RuntimeConfigurationService);
  });

  afterEach((): void => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', (): void => {
    expect(service).toBeTruthy();
    httpTestingController.expectOne('/runtime-configuration');
  });

  it(
    'should fire the HTTP request to get runtime configuration when the ' +
      'service initializes',
    (): void => {
      // Assert.
      const httpGet = httpTestingController.expectOne('/runtime-configuration');
      expect(httpGet.request.method).toEqual('GET');
    },
  );

  it(
    'should return the heroes API once the HTTP request for configuration ' +
      'completes',
    (): void => {
      // Act
      const serviceUrlObservable = service.getHeroesApiUrl();
      const httpGet = httpTestingController.expectOne('/runtime-configuration');

      // Flush the HTTP request, returning the following response
      httpGet.flush({
        heroesApiUrl: 'http://localhost:8282/api/v1/heroes',
      });

      // Assert
      serviceUrlObservable.subscribe((apiUrl: string): void => {
        expect(apiUrl).toBe('http://localhost:8282/api/v1/heroes');
      });
    },
  );
});
