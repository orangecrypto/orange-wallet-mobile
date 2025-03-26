import { Dimensions, FlatList } from "react-native";
import { getCardItems } from "../walletutils/TokenUtils";
import { styles } from "../styles";
import { Responsive } from "@utils/Responsive";

const WalletSlider = ({ cryptoArray, flatListRef, handleScroll, renderItem }) => {


    const ITEM_WIDTH = Dimensions.get("window").width - Responsive.size20;
    const ITEM_OFFSET = ITEM_WIDTH + Responsive.size20;
    return (
        <FlatList
            ref={flatListRef}
            data={getCardItems(cryptoArray)}
            horizontal
            style={styles.flatList}
            pagingEnabled
            keyExtractor={(item, index) => index.toString()}
            onMomentumScrollEnd={handleScroll}
            showsHorizontalScrollIndicator={false}
            getItemLayout={(data, index) => ({
                length: ITEM_WIDTH,
                offset: ITEM_OFFSET * index,
                index,
            })}
            contentContainerStyle={{ paddingLeft: 0, paddingRight: 0 }}
            snapToInterval={ITEM_OFFSET}
            snapToAlignment='start'
            decelerationRate='normal'
            renderItem={renderItem}
        />
    );
};

export default WalletSlider;