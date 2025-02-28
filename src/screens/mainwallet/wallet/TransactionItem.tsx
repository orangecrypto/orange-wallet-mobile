import { localAssets } from "@assets/assets";
import { timeStampToDate, truncateAddress } from "@utils/cryptoUtils";
import { Fonts } from "@values/fonts";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

const TransactionItem = ({ item, handleTransactionClick }) => {
    return (
        <TouchableOpacity onPress={() => {handleTransactionClick(item)}} style={styles.listItem}>
            <View style={styles.assetContainer}>
           <Image source={ item.incoming ? localAssets.receive: localAssets.send} style={styles.letIcon}/>
            <View style={styles.assetDetails}>
                <Text style={[styles.assetName,{fontFamily: Fonts.regular}]}>{truncateAddress(item?.recipientAddress)}</Text>
                <Text style={styles.assetCategory}>{ timeStampToDate(item?.seenTime)}</Text>
            </View>
            </View>
            <View style={styles.assetValues}>
                <Text style={[styles.assetQuantity, {fontFamily: Fonts.regular}]}>{`${item.incoming ?'+':''}${item.amount} ${item.protocol} `}</Text>
                <Text style={styles.assetCategory}>{`$${item?.usdValue} USD`}</Text>
            </View>
        </TouchableOpacity>
    );
};
export default TransactionItem;
