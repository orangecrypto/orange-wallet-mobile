import { initialNetworksList } from "@orangecryptohq/orangeseed";
import { setSelectedAccount, setNetwork, setWallet } from "@redux/slice/appReducer";
import { store, useAppDispatch } from "@redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import { goBack, resetNavigation } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { Color } from "@values/color";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { changeNetwork } from "./SettingsUtils";
import useSeedVault from "@hooks/useSeedVault";
import CommonButton from "@components/CommonButton";
import { Responsive } from "@utils/Responsive";
import Loader from "@components/Loader";
import Toast from "react-native-toast-message";
import { RouteType } from "@routes/RouteType";

const Network = () => {
    const { getSeed } = useSeedVault();
    const networkType = store.getState().appReducer.network?.type;
    const [networkArray, setNetworkArray] = useState(
        initialNetworksList.map((network, index) => ({
            id: index + 1,
            isSelected: network.type === networkType,
            ...network,
        }))
    );
    const [selecteNetwork, setSelectedNewtwork] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    const dispatch: Dispatch = useAppDispatch();

    const changeNetworkSetting = async (item) => {
        const updatedArray = networkArray.map((network) =>
            network.id === item?.id
                ? { ...network, isSelected: true }
                : { ...network, isSelected: false }
        );
        setNetworkArray(updatedArray);
        setSelectedNewtwork(item)
    };


    const updateNetworkState = async () => {

        setIsLoading(true)
        dispatch(setNetwork({
            type: selecteNetwork?.type,
            address: selecteNetwork?.address
        }))
        try {
            const seed = await getSeed()
            const { account } = await changeNetwork(seed, selecteNetwork?.type);
            dispatch(setSelectedAccount(account))
            setIsLoading(false)
            setSelectedNewtwork(null)
            resetNavigation(RouteType.WALLETBALANCE)
        }
        catch (error) {
            setIsLoading(false)
            setSelectedNewtwork(null)
            Toast.show({ type: 'error', text1: error.message });
        }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => changeNetworkSetting(item)}>
            <Text
                style={[
                    styles.text,
                    { color: item.isSelected ? Color.orangeButton : Color.white },
                ]}>
                {item.type}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {isLoading && <Loader loading={isLoading} />}
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.network}</Text>
                <Text style={styles.description}>{strings.networkMessage}</Text>
                <FlatList
                    data={networkArray}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            </View>
            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.save}
                    onPress={() => updateNetworkState()}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    disabled={!selecteNetwork}
                    width={'100%'}
                    height={Responsive.size50}
                />
            </View>
        </View>
    );
};
export default Network;
