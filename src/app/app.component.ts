import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Currency } from './models/currency';
import { AmountChangeAction } from './actions/amount';

import * as fromRoot from './reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'currency-conversion';
  public amount$: Observable<number>;
  public currencyRates$: Observable<Currency[]>;

  constructor(public store: Store<fromRoot.State>) {
    this.amount$ = store.select(fromRoot.getAmountState);
    this.currencyRate$ = store.select(fromRoot.getCurrencyRates);
  }

  onAMountChange(amount: string) {
    const number = parseFloat(amount);
    if (!isNaN(number)) this.store.dispatch(new AmountChangeAction(number));
  }

  // Dispatch the Action
  ngOnInit() {
    this.store.dispatch(new CurrenciesUpdatedAction());
  }
}
