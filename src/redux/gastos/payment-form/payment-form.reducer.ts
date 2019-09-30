import {
  PaymentFormActions,
  PaymentFormActionsTypes,
} from './payment-form.actions';
export interface PaymentFormState {
  id: number;
  amount: string;
  data: any;
  loading: boolean;
  error: any;
  open: boolean;
}

export const PaymentForminitialState: PaymentFormState = {
  id: null,
  amount: null,
  data: null,
  loading: false,
  error: null,
  open: false,
};

export function paymentFormReducer(
  state = PaymentForminitialState,
  action: PaymentFormActions,
): PaymentFormState {
  switch (action.type) {
    case PaymentFormActionsTypes.PaymentSaveRequest:
      return {
        ...state,
        loading: true,
      };

    case PaymentFormActionsTypes.PaymentSaveRequestSuccess:
      return {
        ...state,
        loading: false,
      };
    case PaymentFormActionsTypes.PaymentSaveRequestFail:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case PaymentFormActionsTypes.PaymentRequest:
      return {
        ...state,
        loading: true,
        id: action.payload.id,
        amount: action.payload.amount,
        open: true,
      };

    case PaymentFormActionsTypes.ClosePaymentForm:
      return {
        ...state,
        open: false,
        data: null,
        id: null,
      };

    default: {
      return state;
    }
  }
}
