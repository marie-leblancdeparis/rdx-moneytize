import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Currency } from './models/currency';
import { AmountChangeAction } from './actions/amount';

import * as fromRoot from './reducers';
import { Observable } from 'rxjs';
import {CurrenciesUpdatedAction} from './actions/currency';

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
    this.currencyRates$ = store.select(fromRoot.getCurrencyRates);
  }

  onAMountChange(amount: string) {
    const amountValue = parseFloat(amount);
    if (!isNaN(amountValue)) {
        this.store.dispatch(new AmountChangeAction(amountValue));
    }
  }

  // Dispatch the Action
  ngOnInit() {
    const defaultCurency: Currency = {
      code: 'EUR', value: 10
    }
    this.store.dispatch(new CurrenciesUpdatedAction([defaultCurency]));
  }
}
