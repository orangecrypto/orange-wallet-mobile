import { FlatList, View , Text} from "react-native";
import { styles } from "../styles";
import { strings } from "@strings/i18n";
import TransactionItem from "./TransactionItem";

const TransactionList = ({ transaction, isLoading, selectedToken, limit, fetchTransactions, walletContext, handleTransactionClick }) => {
    return (
        <FlatList
            data={transaction}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <TransactionItem item={item} handleTransactionClick={handleTransactionClick} />}
            ListEmptyComponent={
                <View style={styles.emptyListContainer}>
                    {!isLoading && <Text style={styles.emptyListText}>{strings.noTransactions}</Text>}
                </View>
            }
            contentContainerStyle={styles.listContainer}
            onEndReached={() => {
                if ((selectedToken.protocol === 'runes' || selectedToken.protocol === 'stacks') && transaction.length >= limit) {
                    fetchTransactions(selectedToken, walletContext);
                    console.log('TransactionList ','fetchTransactions')
                }
            }}
        />
    );
};

export default TransactionList