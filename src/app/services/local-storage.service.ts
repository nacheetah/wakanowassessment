import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor() {}

  /**
   * Set the value of `key` to `value` (which gets stringified under the hood) in local storage
   *
   * @param key     The key against which to store a provided value.
   * @param value   The value to be stored.
   *
   */
  set(key: string, val: any) {
    if (!key) return undefined;
    window.localStorage.setItem(key, JSON.stringify(val));
  }

  /**
   * Get the value of `key` to `value` (which gets stringified under the hood) in local storage
   *
   * @param key   The key against which to store a provided value.
   *
   * @returns   The parsed value stored against `key`, null if it is empty, and undefined if key doesn't exist  in local storage.
   */
  get(key: string) {
    if (!key) return undefined;
    const val = window.localStorage.getItem(key);
    return !!val ? JSON.parse(window.localStorage.getItem(key) || '') : null;
  }

  /**
   * Get the value of `key` from local storage
   *
   * @param key   The key whose value is to be deleted/removed from local storage.
   *
   */
  delete(key: string) {
    window.localStorage.removeItem(key);
  }
}
