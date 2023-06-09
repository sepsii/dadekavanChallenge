import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor() {}
  error(error: string) {
    console.error(error);
  }
}
