import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { styles } from "../styles";
import { getCardItems } from "../walletutils/TokenUtils";

const WalletSlider = ({ cryptoArray, flatListRef, handleScroll, renderItem }) => {

    const coinSettings = useSelector((state) => state.coinSettingsSlice.coinSettings);
    const namesToAlwaysShow = ["Bitcoin", "Orange", "Stacks"];

    // FIX #4: Memoize visibleItems calculation
    const visibleItems = useMemo(() => {
        const items = [];
        const seenNames = new Set();

        cryptoArray.forEach(item => {
            if (seenNames.has(item.name)) return;

            const coinSetting = coinSettings.find(setting => setting.name === item.name);

            if (namesToAlwaysShow.includes(item.name) || (coinSetting ? coinSetting.visible : true)) {
                items.push(item);
                seenNames.add(item.name);
            }
        });

        return items;
    }, [cryptoArray, coinSettings]);

    // FIX #5: Memoize cardItems to prevent FlatList re-renders
    const cardItems = useMemo(() => getCardItems(visibleItems), [visibleItems]);

    return (
        <FlatList
            ref={flatListRef}
            data={cardItems}
            horizontal
            style={styles.flatList}
            pagingEnabled={true} 
            nestedScrollEnabled={true}
            keyExtractor={(item) => item.id?.toString() || item.name} // FIX #3: Use stable ID instead of index
            onMomentumScrollEnd={handleScroll}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 0, paddingRight: 0 }}
            renderItem={renderItem}
        />
    );
};

export default WalletSlider;
