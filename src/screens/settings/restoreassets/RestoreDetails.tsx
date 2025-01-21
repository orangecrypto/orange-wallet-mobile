import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { goBack, push } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { orangeButton, white } from "@values/color";
import { styles } from "../styles";
import CommonButton from "@components/CommonButton";
import { Responsive } from "@utils/Responsive";
import { localAssets } from "@assets/assets";
import { useRoute } from "@react-navigation/native";
import { WALLETBALANCE } from "@routes/RouteType";

const RestoreDetails = () => {
    const route = useRoute();
    const { assetName } = route.params;
    const [assetsArray, setAssetsArray] = useState([
        { id: 1, name: "Bitcoin", isSelected: false, quantity: "0.0005 BTC", value: "~ $ 18.87 USD" }
    ]);

    const handleSelection = (id) => {
        const updatedArray = assetsArray.map((currency) =>
            currency.id === id
                ? { ...currency, isSelected: true }
                : { ...currency, isSelected: false }
        );
        setAssetsArray(updatedArray);
    };

    const isAnySelected = assetsArray.some((asset) => asset.isSelected);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.assetItem,
                item.isSelected && { borderColor: orangeButton, borderWidth: 2 },
            ]}
            onPress={() => handleSelection(item.id)}>
            <View style={styles.assetContainer}>
                <Image source={localAssets.assetbitcoin} style={styles.letIcon} />
                <View style={styles.assetDetails}>
                    <Text style={styles.assetName}>{item.name}</Text>
                </View>
            </View>
            <View style={styles.assetValues}>
                <Text style={styles.assetQuantity}>{item.quantity}</Text>
                <Text style={styles.assetValue}>{item.value}</Text>
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{assetName === 'Bitcoin' ? 'Restore Bitcoin' : strings.restoreAssets}</Text>
                <Text style={styles.description}>{assetName === 'Bitcoin' ? strings.selectAsset : strings.noAssetFound}</Text>
                {assetName === 'Bitcoin' ? <FlatList
                    data={assetsArray}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                /> : null}
            </View>

            {assetName === 'Bitcoin' ? <View style={styles.buttonContainer}>

                <CommonButton
                    title={strings.transfer}
                    onPress={() => console.log('Ok')}
                    textColor={white}
                    disabled={!isAnySelected}
                    width={"100%"}
                    height={Responsive.size50}
                />
            </View> :
                <View style={styles.buttonContainer}>
                    <CommonButton
                        title={strings.close}
                        onPress={() => push(WALLETBALANCE)}
                        textColor={white}
                        width={"100%"}
                        height={Responsive.size50}
                    />
                </View>}

        </View>
    );
};

export default RestoreDetails;
