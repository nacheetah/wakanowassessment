import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });
    service = TestBed.inject(LocalStorageService);
  });

  it('stores and retrieves value correctly', () => {
    service.set('key', 'value');
    expect(service.get('key')).toBe('value');
  });

  it("you can't store with a falsy key", () => {
    expect(service.set('', 'test value')).toBe(undefined);
  });

  it('deletes value correctly', () => {
    service.delete('key');
    expect(service.get('key')).toBeFalsy();
  });
});
