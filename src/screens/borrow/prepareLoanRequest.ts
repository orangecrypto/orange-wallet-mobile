import { Config } from '@config/Config';
import axios from 'axios';

import AppConfig from 'react-native-config';

interface PrepareLoanParams {
    instantOfferId: string;
    feeRate: number;
    tokenAmount: string;
    btcAddress: string;
    btcPublicKey: string;
    ordinalsAddress: string;
    ordinalsPublicKey: string;
    liquidiumToken: string;
}

export async function prepareLoanRequest({
    instantOfferId,
    feeRate,
    tokenAmount,
    btcAddress,
    btcPublicKey,
    ordinalsAddress,
    ordinalsPublicKey,
    liquidiumToken,
}: PrepareLoanParams) {
    const url = `${Config.LIQUIDIUM_BASE_URL}/api/v1/borrower/loans/start/prepare`;

    const body = {
        instant_offer_id: instantOfferId,
        fee_rate: feeRate,
        token_amount: tokenAmount,
        borrower_payment_address: btcAddress,
        borrower_payment_pubkey: btcPublicKey,
        borrower_ordinal_address: ordinalsAddress,
        borrower_ordinal_pubkey: ordinalsPublicKey,
        borrower_wallet:'orange'
    };

    const headers = {
        Authorization: `Bearer ${AppConfig.LIQUIDIUM_API_KEY}`,
        'Content-Type': 'application/json',
        'x-user-token': liquidiumToken,
    };
    console.log('prepareLoanRequest', headers)
    try {
        const response = await axios.post(url, body, {
            headers: {
                Authorization: `Bearer ${AppConfig.LIQUIDIUM_API_KEY}`,
                'Content-Type': 'application/json',
                'x-user-token': liquidiumToken,
            }
        });
        return response.data;
    } catch (error: any) {
        // Extracting the error message from the response
        const errorMessage =
            error?.response?.data?.errorMessage ||
            error?.response?.data?.error ||
            error?.message ||
            'An unknown error occurred';

        console.error('❌ Loan Prepare Failed:', error);

        // Throwing the error with a custom message
        throw new Error(errorMessage);
    }
}
