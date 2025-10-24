export interface Discount {
  discount_rate: number;
  discount_sats: number;
}

export interface LoanDetails {
  state: string;
  principal_amount_sats: number;
  loan_term_days: number;
  loan_term_end_date: string;
  start_date: string;
  escrow_address: string;
  discount: Discount;
}

export interface CollateralDetails {
  rune_id: string;
  collateral_type: string;
  rune_divisibility: number;
  rune_amount: number;
}

export interface Offer {
  id: string;
  loan_details: LoanDetails;
  collateral_details: CollateralDetails;
}

export interface PortfolioResponse {
  offers: Offer[];
}

export interface ApiError {
  error: string;
  errorMessage: string;
  status: number;
}
