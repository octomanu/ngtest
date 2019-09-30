import { Action } from '@ngrx/store';

export enum PaymentFormActionsTypes {
  PaymentRequest = '[Gastos Payment] Payment Request',
  PaymentSaveRequest = '[Gastos Payment] Save Request',
  PaymentSaveRequestSuccess = '[Gastos Payment] Payment Save Success',
  PaymentSaveRequestFail = '[Gastos Payment] Payment Save Fail',
  ClosePaymentForm = '[Gastos Payment] Close Payment Form',
}

export class PaymentRequest implements Action {
  readonly type = PaymentFormActionsTypes.PaymentRequest;
  constructor(public payload: { id: number; amount: string }) {}
}

export class PaymentSaveRequest implements Action {
  readonly type = PaymentFormActionsTypes.PaymentSaveRequest;
  constructor(public payload: { data: any }) {}
}
export class PaymentSaveRequestSuccess implements Action {
  readonly type = PaymentFormActionsTypes.PaymentSaveRequestSuccess;
}
export class PaymentSaveRequestFail implements Action {
  readonly type = PaymentFormActionsTypes.PaymentSaveRequestFail;
  constructor(public payload: { error: any }) {}
}
export class ClosePaymentForm implements Action {
  readonly type = PaymentFormActionsTypes.ClosePaymentForm;
}

export type PaymentFormActions =
  | PaymentSaveRequest
  | PaymentSaveRequestSuccess
  | PaymentSaveRequestFail
  | PaymentRequest
  | ClosePaymentForm;
