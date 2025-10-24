import Loader from "@components/Loader";
import { useBorrowerPortfolio } from "@hooks/borrow/useBorrowerPortfolio";
import { useFocusEffect } from "@react-navigation/native";
import { strings } from "@strings/i18n";
import { useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import LoanItemView from "./LoanItemView";
import { styles } from './styles';

const Loan = () => {

    const {
        fetchPortfolio,
        data: loanStatusList,
        isLoading,
        isError,
        error,
    } = useBorrowerPortfolio();

    useFocusEffect(
        useCallback(() => {
            fetchPortfolio();
        }, [fetchPortfolio])
    );

    console.log('Loan', loanStatusList?.borrower?.runes?.loans)

    const sampleList = [

        {
            id: '123e4567-e89b-12d3-a456-426614174000',
            loan_details: {
                state: 'ACTIVE',
                principal_amount_sats: 1000000,
                loan_term_days: 30,
                loan_term_end_date: '2025-06-01T14:30:00Z',
                start_date: '2025-05-01T14:30:00Z',
                escrow_address: 'bc1qdummyaddressxxxxxxxxxxxxxxxxxxxxxxx',
                discount: {
                    discount_rate: 0.1,
                    discount_sats: 1000,
                },
            },
            collateral_details: {
                rune_id: '840010:907',
                collateral_type: 'Rune',
                rune_divisibility: 8,
                rune_amount: 50000,
            },
        }
    ]
    return (
        <View style={styles.container}>
            {isLoading && <Loader loading={isLoading} />}
            <View style={styles.contentContainer}>
                <FlatList
                    data={loanStatusList?.borrower?.runes?.loans}
                    //data={sampleList}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ flexGrow: 1 }}
                    ListEmptyComponent={<View style={styles.loanEmptyContainer}>
                        <Text style={styles.loanEmptyText}>{strings.noLoanAvailble}</Text>
                    </View>}
                    renderItem={({ item }) => <LoanItemView token={item}
                    />}
                />
            </View>
        </View>
    );
};
export default Loan;