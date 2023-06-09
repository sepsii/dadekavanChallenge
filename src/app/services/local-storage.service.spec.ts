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

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set an item in local storage', () => {
    const key = 'testKey';
    const value = { foo: 'bar' };

    service.setItem(key, value);

    const item = localStorage.getItem(key);
    expect(item).toBeTruthy();
    expect(JSON.parse(item!)).toEqual(value);
  });

  it('should get an item from local storage', () => {
    const key = 'testKey';
    const value = { foo: 'bar' };

    localStorage.setItem(key, JSON.stringify(value));

    const item = service.getItem(key);
    expect(item).toEqual(value);
  });

  it('should return null for non-existing item', () => {
    const key = 'nonExistingKey';

    const item = service.getItem(key);
    expect(item).toBeNull();
  });

  it('should remove an item from local storage', () => {
    const key = 'testKey';
    const value = { foo: 'bar' };

    localStorage.setItem(key, JSON.stringify(value));

    service.removeItem(key);

    const item = localStorage.getItem(key);
    expect(item).toBeNull();
  });

  it('should clear all items from local storage', () => {
    const key1 = 'key1';
    const key2 = 'key2';

    localStorage.setItem(key1, 'value1');
    localStorage.setItem(key2, 'value2');

    service.clear();

    const item1 = localStorage.getItem(key1);
    const item2 = localStorage.getItem(key2);

    expect(item1).toBeNull();
    expect(item2).toBeNull();
  });
});
