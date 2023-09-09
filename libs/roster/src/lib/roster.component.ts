import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  articleListInitialState,
  articleListQuery,
  articleListActions,
  ListType,
} from '@realworld/articles/data-access';
import { selectLoggedIn } from '@realworld/auth/data-access';
import { CommonModule } from '@angular/common';
import { TagsListComponent } from './tags-list/tags-list.component';
import { ArticleListComponent } from '@realworld/articles/feature-articles-list/src';
import { RosterStoreService } from './roster.store';
import { provideComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';

@UntilDestroy()
@Component({
  selector: 'cdt-roster',
  standalone: true,
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css'],
  imports: [CommonModule, TagsListComponent, ArticleListComponent],
  providers: [provideComponentStore(RosterStoreService)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RosterComponent implements OnInit {
  listConfig$ = this.store.select(articleListQuery.selectListConfig);
  tags$ = this.rosterStore.tags$;
  isAuthenticated = false;

  constructor(private readonly store: Store, private readonly rosterStore: RosterStoreService) {}

  ngOnInit() {
    this.store
      .select(selectLoggedIn)
      .pipe(untilDestroyed(this))
      .subscribe((isLoggedIn) => {
        this.isAuthenticated = isLoggedIn;
        this.getRoster();
      });
  }

  setListTo(type: ListType = 'ALL') {
    this.store.dispatch(articleListActions.setListConfig({ config: { ...articleListInitialState.listConfig, type } }));
  }

  getArticles() {
    if (this.isAuthenticated) {
      this.setListTo('FEED');
    } else {
      this.setListTo('ALL');
    }
  }
  getRoster() {
    this.rosterStore.getRoster();
  }

  setListTag(tag: string) {
    this.store.dispatch(
      articleListActions.setListConfig({
        config: {
          ...articleListInitialState.listConfig,
          filters: {
            ...articleListInitialState.listConfig.filters,
            tag,
          },
        },
      }),
    );
  }
}
