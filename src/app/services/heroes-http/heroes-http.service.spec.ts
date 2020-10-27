import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RuntimeConfigurationService } from '../runtime-configuration/runtime-configuration.service';
import { MockRuntimeConfigurationService } from '../runtime-configuration/testing/mock-runtime-configuration.service';
import { HeroesHttpService } from './heroes-http.service';

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

  it('should create a hero', (): void => {
    // Act
    service
      .create({
        firstName: 'Thomas',
        lastName: 'Jefferson',
        phoneNumber: '(703) 555-5555',
        avatarUrl: 'https://avatar.com/t-jefferson/profile.jpg',
      })
      .subscribe();

    // Assert
    const testRequest = httpTestingController.expectOne(
      'http://192.1.1.1:8282/api/v1/heroes',
    );
    expect(testRequest.request.method).toBe('POST');
    expect(testRequest.request.body).toEqual({
      firstName: 'Thomas',
      lastName: 'Jefferson',
      phoneNumber: '(703) 555-5555',
      avatarUrl: 'https://avatar.com/t-jefferson/profile.jpg',
    });
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

  it('should update the hero', (): void => {
    // Act
    service
      .update('db3ee04b-05be-4403-9d48-807fb29717ec', {
        firstName: 'G.',
        lastName: 'Washington',
        phoneNumber: '(703) 111-1111',
        avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
      })
      .subscribe();

    // Assert
    const testRequest = httpTestingController.expectOne(
      'http://192.1.1.1:8282/api/v1/heroes/db3ee04b-05be-4403-9d48-807fb29717ec',
    );
    expect(testRequest.request.method).toBe('PATCH');
    expect(testRequest.request.body).toEqual({
      firstName: 'G.',
      lastName: 'Washington',
      phoneNumber: '(703) 111-1111',
      avatarUrl: 'https://avatar.com/george-washington/profile.jpg',
    });
  });

  it('should delete the hero', (): void => {
    // Act
    service.delete('9879ccc1-e75f-48ba-b2e5-f92d501719fb').subscribe();

    // Assert
    const testRequest = httpTestingController.expectOne(
      'http://192.1.1.1:8282/api/v1/heroes/9879ccc1-e75f-48ba-b2e5-f92d501719fb',
    );
    expect(testRequest.request.method).toBe('DELETE');
  });
});
