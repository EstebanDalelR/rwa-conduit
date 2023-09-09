import { ApiService } from '@realworld/core/http-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RosterService {
  constructor(private apiService: ApiService) {}

  getTags(): Observable<{ tags: string[] }> {
    return this.apiService.get('/tags');
  }

  getRoster(): Observable<{
    tags: string[] | undefined;
    roster: string[];
  }> {
    return this.apiService.get('/roster');
  }
}
