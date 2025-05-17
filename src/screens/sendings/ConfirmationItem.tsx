import React, { useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { styles } from "./styles";
import { localAssets } from "@assets/assets";
import { push } from "@routes/Navigator";
import { getTicker, truncateAddress } from "@utils/cryptoUtils";
import { satsToBtc, validateBtcAddressIsTaproot } from "@orangecryptohq/orangeseed";
import { BigNumber } from "@orangecryptohq/orangeseed/dist/utils/bignumber";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { useSelector } from "react-redux";
import { appReducerType } from "@redux/slice/appReducer";
import Clipboard from "@react-native-clipboard/clipboard";
import ScriptModal from "./ScriptModal";

const ConfirmationItem = ({ item, availableRoutes, type }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isDropdownForFees, setisDropdownForFees] = useState(false);
    const [isDropdownForAmount, setisDropdownForAmount] = useState(false);
    const { selectedAccount } = useSelector((state: { seedPhraseReducer: appReducerType }) => state.appReducer);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedScripts, setSelectedScripts] = useState([]);
    const openBottomSheet = (scripts) => {
        setSelectedScripts(scripts);
        setModalVisible(true);
    };
    const handlePress = () => {
        if (type === "runes" && item?.name === "Inputs & Outputs") {
            setDropdownOpen(!isDropdownOpen);
        } else if (type === "runes" && item?.name === "Fees") {
            setisDropdownForFees(!isDropdownForFees)
        }
        else if (type === "runes" && item?.name === "Amount") {
            setisDropdownForAmount(!isDropdownForAmount)
        }
        else if (availableRoutes.includes(item?.name)) {
            push(item?.name);
        }
    };

    return (
        <View style={styles.itemContiner}>
            <TouchableOpacity style={styles.item} onPress={handlePress}>
                <Text style={styles.text}>{isDropdownOpen ? '' : item?.name}</Text>
                <View>
                    {type === "runes" && (item?.name === "Inputs & Outputs" || item?.name === "Fees" || item?.name === "Amount") ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={(isDropdownOpen || isDropdownForFees || isDropdownForAmount) ? localAssets.dropupArrow : localAssets.dropdownarrow}
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
                <View style={styles.dropdown}>
                    <Text style={[styles.inputText, { marginTop: -Responsive.size30 }]}>{strings.input}</Text>
                    {item.value.inputs.map((item, index) => (
                        <View key={index} style={styles.inputConfirmContainer}>
                            <Text style={styles.inputTextTitle}>
                                {`${satsToBtc(new BigNumber(item.extendedUtxo._utxo.value))} BTC`}
                            </Text>
                            <Text style={styles.inputTextTitle}>{strings.yourAddress}
                                <Text style={styles.inputTextDescription}>
                                    {' ' + truncateAddress(item.extendedUtxo._utxo.address)}
                                </Text>
                            </Text>
                        </View>
                    ))}
                    <Text style={styles.inputText}>{strings.Output}</Text>
                    {item.value.outputs.map((item, index) => (
                        <View key={index} style={styles.inputConfirmContainer}>
                            {index === 0 ? (

                                <View style={styles.inputRowContainer}>
                                    <View>
                                        <Text style={styles.inputTextTitle}>
                                            {`${satsToBtc(new BigNumber(item.amount))} BTC`}
                                        </Text>
                                        <Text style={styles.inputTextDescription}>
                                            {strings.Script + `# ${1}`}
                                        </Text>
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        console.log('OpenBottom view and pass data')
                                        openBottomSheet(item.script)
                                    }}>
                                        <Image style={styles.inputDownIcon} source={localAssets.eye} />
                                    </TouchableOpacity>
                                </View>
                            ) : (

                                <View style={styles.inputRowContainer}>
                                    <View>
                                        <Text style={styles.inputTextTitle}>
                                            {`${satsToBtc(new BigNumber(item.amount))} BTC`}
                                        </Text>
                                        <Text style={styles.inputTextTitle}>
                                            {strings.yourAddress}
                                            <Text style={styles.inputTextDescription}>
                                                {' ' + truncateAddress(item.address)}
                                            </Text>
                                        </Text>
                                    </View>

                                    {validateBtcAddressIsTaproot(item.address) && selectedAccount?.ordinalsAddress !== item.address && <TouchableOpacity onPress={() => Clipboard.setString(item.address)}>
                                        <Image style={styles.inputDownIcon} source={localAssets.copy} />
                                    </TouchableOpacity>}
                                </View>
                            )}
                        </View>
                    ))}

                </View>
            )}

            {isDropdownForFees && (
                <View style={styles.feesItem}>
                    <Text style={styles.networkFeeText}>{strings.networkFee}</Text>
                    <View>
                        <Text style={styles.networkFeeText}>{`${item.value?.fee} sats`}</Text>
                        <Text style={styles.networkFeeDescription}>{`${item.value?.feeRate} sats/vB`}</Text>
                        <Text style={styles.networkFeeDescription}>{`${item.value?.feeFiateValue}`}</Text>

                    </View>
                </View>
            )}
            {isDropdownForAmount && (
                <View style={styles.feesItem}>
                        <Image style={styles.tokeIcon} source={item.image?item.image: localAssets.Orange}/>
                    <View>
                        <Text style={styles.networkFeeText}>{`${item.runes[0][1].amount.toString()} ${getTicker(item.runes[0][0])}`}</Text>
                        <Text style={[styles.networkFeeDescription,{alignSelf:'flex-end'}]}>
                            {item.FiateRate != null ? item.FiateRate : "0"} USD 
                        </Text>

                    </View>
                </View>
            )}
            <ScriptModal visible={isModalVisible} scripts={selectedScripts} onClose={() => setModalVisible(false)} />
        </View>
    );
};

export default ConfirmationItem;