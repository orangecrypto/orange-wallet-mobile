import { localAssets } from "@assets/assets";
import { timeStampToDate, truncateAddress } from "@utils/cryptoUtils";
import { Fonts } from "@values/fonts";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { Responsive } from "@utils/Responsive";

const TransactionItem = ({ item, handleTransactionClick }) => {
    return (
        <TouchableOpacity onPress={() => {handleTransactionClick(item)}} style={styles.listItem}>
            <View style={styles.assetContainer}>
          {item.protocol === "STX" || 'runes' || 'brc-20' || 'BTC' ?
           <Image source={ item.icon} style={styles.letIcon}/>:
           <Image source={ item.incoming ? localAssets.receive: localAssets.send} style={styles.letIcon}/>
           }
            <View style={styles.assetDetails}>
                <Text style={[styles.assetName,{fontFamily: Fonts.regular}]}>{truncateAddress(item?.recipientAddress)}</Text>
                <Text style={styles.assetCategory}>{ timeStampToDate(item?.seenTime) === 'Invalid Date'? item?.seenTime:timeStampToDate(item?.seenTime)}</Text>
            </View>
            </View>
            <View style={styles.assetValues}>
                <Text numberOfLines={1} style={[styles.assetQuantity, {fontFamily: Fonts.regular, width: Responsive.size120, textAlign:'right'}]}>{`${ item.protocol !== "runes"  && item.incoming ?'+':''}${item.amount} ${item?.ticker}`}</Text>
                <Text style={styles.assetCategory}>{`$${item?.usdValue} USD`}</Text>
            </View>
        </TouchableOpacity>
    );
};
export default TransactionItem;
