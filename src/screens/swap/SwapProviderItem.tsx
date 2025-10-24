import React from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { styles } from "./styles";
import { localAssets } from "@assets/assets";
import { Responsive } from "@utils/Responsive";
import TokenImage from "@components/TokenImage";
import { Color } from "@values/color";
import { Dispatch } from "@reduxjs/toolkit";
import { useAppDispatch } from "@redux/store";
import { setSlippage } from "@redux/slice/SwapReducer";

const SwapProviderItem = ({ item, index, selectedIndex, onPress }) => {
    const isSelected = selectedIndex === index;
    const dispatch: Dispatch = useAppDispatch();
    return (
        <TouchableOpacity
            onPress={() => {
                onPress(index)
                const slippageValue = item.name === 'Runes DEX' ? 0.02 : 4;
                dispatch(setSlippage(slippageValue));
            }}
            style={[styles.card, isSelected && styles.selectedCard]}>

            <View style={styles.itemContainerRow}>
                <View style={styles.itemRow}>
                    <Image style={styles.swapProviderIcon} source={item.icon} />
                    <Text style={styles.providerName}>{item.name}</Text>
                </View>
               
                {item.label ==='Recommended'? 
                <View style={styles.itemRowRecomendation}>
                    <Image style={styles.recomendIcon} source={localAssets.recomended} />
                    <Text style={styles.recomendtext}>{item.label}</Text>
                </View>:
                <View style={[styles.itemRowRecomendation,{backgroundColor: Color.bestImagebg}]}>
                <Image style={styles.bestIcon} source={localAssets.best} />
                <Text style={[styles.recomendtext,{color: Color.erroryellow}]}>{item.label}</Text>
            </View>}
            </View>

            <View style={styles.lineSaperator} />
            <View style={styles.itemContainerRow}>
                <View style={styles.itemRow}>
                     {item?.receiveIcon ? <Image source={item.receiveIcon} style={styles.btcIcon} /> :
                        <TokenImage
                            fungibleToken={item}
                            size={40}
                            round
                            variant="dark" />
                    }
                    <Text style={styles.providerName}>{item.value} <Text style={styles.tick}>{item.ticker}</Text></Text>
                </View>
                <View style={styles.itemRow}>
                    <Image style={styles.swapIcon} source={localAssets.swap} />
                    <Text style={styles.fiat}>{` ~${item.fiatRate}`}<Text style={[styles.fiat, { fontSize: Responsive.size12 }]}>{` USD`}</Text></Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default SwapProviderItem;