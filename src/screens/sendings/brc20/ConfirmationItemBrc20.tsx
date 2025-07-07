import { localAssets } from "@assets/assets";
import { satsToBtc, validateBtcAddressIsTaproot } from "@orangecryptohq/orangeseed";
import { BigNumber } from "@orangecryptohq/orangeseed/dist/utils/bignumber";
import Clipboard from "@react-native-clipboard/clipboard";
import { strings } from "@strings/i18n";
import { truncateAddress } from "@utils/cryptoUtils";
import { Responsive } from "@utils/Responsive";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import TokenImage from "@components/TokenImage";

const ConfirmationItemBrc20 = ({ item, availableRoutes, type }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handlePress = () => {

        setDropdownOpen(!isDropdownOpen);

    };

    return (
        <View style={styles.itemContiner}>
            <TouchableOpacity style={styles.item} onPress={handlePress}>

                <Text style={styles.text}>{item?.name}</Text>
                <View>
                    {item?.name === "Inscribing and Sending" ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={(isDropdownOpen) ? localAssets.dropupArrow : localAssets.dropdownarrow}
                                style={styles.dropDownIcon}
                            />
                            {item?.name === "Amount" && <Text style={styles.value}>{' ' + item?.value}</Text>}
                        </View>
                    ) : (
                        <Text style={styles.value}>{item?.value}</Text>
                    )}

                    {item?.subvalue && <Text style={styles.subValue}>{item?.subvalue}</Text>}
                </View>

            </TouchableOpacity>
            {isDropdownOpen && (
                <View style={styles.feesItem}>
                    {item?.token?.image ? <Image source={item?.token?.image} style={styles.tokeIcon} /> :
                        <TokenImage
                            fungibleToken={item?.token}
                            size={40}
                            round
                            variant="send" />
                    }
                    <View>
                        <Text style={styles.networkFeeText}>{`${item?.token?.balance} ${item?.token?.ticker}`}</Text>
                        <Text style={[styles.networkFeeDescription, { alignSelf: 'flex-end' }]}>
                            {item.feeFiateValue != null ? item.feeFiateValue : "0"}
                        </Text>

                    </View>
                </View>
            )}

        </View>
    );
};

export default ConfirmationItemBrc20;
