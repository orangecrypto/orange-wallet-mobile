import { Dimensions, FlatList } from "react-native";
import { getCardItems } from "../walletutils/TokenUtils";
import { styles } from "../styles";
import { Responsive } from "@utils/Responsive";
import { useSelector } from "react-redux";
import { walletReducerType } from "@redux/slice/WalletReducer";

const WalletSlider = ({ cryptoArray, flatListRef, handleScroll, renderItem }) => {

    
    const coinSettings = useSelector((state) => state.coinSettingsSlice.coinSettings);
    const namesToAlwaysShow = ["Bitcoin", "Orange", "Stacks"];
    const visibleItems = [];
    const seenNames = new Set();
    
    cryptoArray.forEach(item => {
        if (seenNames.has(item.name)) return;

        const coinSetting = coinSettings.find(setting => setting.name === item.name);
        
        if (namesToAlwaysShow.includes(item.name) || (coinSetting ? coinSetting.visible : true)) {
            visibleItems.push(item);
            seenNames.add(item.name);
        }
    });

    return (
        <FlatList
            ref={flatListRef}
            data={getCardItems(visibleItems)}
            horizontal
            style={styles.flatList}
            pagingEnabled={true} 
            nestedScrollEnabled={true}
            keyExtractor={(item, index) => index.toString()}
            onMomentumScrollEnd={handleScroll}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 0, paddingRight: 0 }}
            renderItem={renderItem}
        />
    );
};

export default WalletSlider;
