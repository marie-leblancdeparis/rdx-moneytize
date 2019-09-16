import { Action } from '@ngrx/store';

export const AMOUNT_CHANGE = '[Amount] Change';

export class AmountChangeAction implements Action {
	type = AMOUNT_CHANGE;

	constructor(public payload: number) {}
}