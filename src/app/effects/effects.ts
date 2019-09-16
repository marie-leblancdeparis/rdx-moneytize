import { CurrenciesUpdatedAction } from './../actions/currency';
import { CurrencyService } from './../services/currency.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

import * as currency from '../actions/currency';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';


@Injectable()
export class CurrencyEffects {
  @Effect()
  update$: Observable<Action> = this.action$.pipe(
    ofType(currency.CURRENCIESUPDATE),
    switchMap(() =>
      this.currenyService.getRates()
      .pipe(map(data => new CurrenciesUpdatedAction(data)))
    )
  );

  constructor(
    private currencyService: CurrencyService,
    private actions$: Actions
  ) {}

}
