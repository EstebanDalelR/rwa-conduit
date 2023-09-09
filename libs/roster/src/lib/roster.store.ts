import { Injectable } from '@angular/core';
import { ComponentStore, OnStateInit, tapResponse } from '@ngrx/component-store';
import { pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RosterService } from './roster.service';

export interface RosterState {
  tags: string[];
  roster: string[];
}

@Injectable()
export class RosterStoreService extends ComponentStore<RosterState> implements OnStateInit {
  constructor(private readonly homeService: RosterService) {
    super({ tags: [], roster: [] });
  }

  ngrxOnStateInit() {
    this.getTags();
    this.getRoster();
  }

  // SELECTORS
  tags$ = this.select((store) => store.tags);

  // EFFECTS
  readonly getTags = this.effect<void>(
    pipe(
      switchMap(() =>
        this.homeService.getTags().pipe(
          tapResponse(
            (response) => {
              this.patchState({ tags: response.tags });
            },
            (error) => {
              console.error('error getting tags: ', error);
            },
          ),
        ),
      ),
    ),
  );
  readonly getRoster = this.effect<void>(
    pipe(
      switchMap(() =>
        this.homeService.getRoster().pipe(
          tapResponse(
            (response) => {
              this.patchState({ roster: response.roster });
            },
            (error) => {
              console.error('error getting roster: ', error);
            },
          ),
        ),
      ),
    ),
  );
}
