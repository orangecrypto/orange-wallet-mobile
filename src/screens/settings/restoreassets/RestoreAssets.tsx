import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { goBack, push } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { orangeButton, white, gray } from "@values/color";
import { styles } from "../styles";
import CommonButton from "@components/CommonButton";
import { Responsive } from "@utils/Responsive";
import { ASSETDETAILS } from "@routes/RouteType";

const RestoreAssets = () => {
    const [assetsArray, setAssetsArray] = useState([
        { id: 1, name: "Bitcoin", isSelected: false },
        { id: 2, name: "Ordinals", isSelected: false }
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
            style={styles.item}
            onPress={() => handleSelection(item.id)}
        >
            <Text
                style={[
                    styles.text,
                    { color: item.isSelected ? orangeButton : white },
                ]}
            >
                {item.name}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.restoreAssets}</Text>
                <Text style={styles.description}>{strings.restoreAssetsMessage}</Text>
                <FlatList
                    data={assetsArray}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            </View>

            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.restoreAssets}
                    onPress={() => {
                        const selectedAsset = assetsArray.find((asset) => asset.isSelected);
                        if (selectedAsset) {
                            push(ASSETDETAILS, { assetName: selectedAsset.name });
                        }
                    }}
                    textColor={white}
                    disabled={!isAnySelected} 
                    width={"100%"}
                    height={Responsive.size45}
                />
            </View>
        </View>
    );
};

export default RestoreAssets;
