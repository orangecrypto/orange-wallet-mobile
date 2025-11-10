import CommonButton from "@components/CommonButton";
import Loader from "@components/Loader";
import useOrdinalsByAddress from "@hooks/useOrdinalsByAddress";
import { goBack, push } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import AssetItem from "./AssetItem";
import useBrc20Inscriptions from "@hooks/useBrc20Inscriptions";
import useGenerateSignedOrdinalTransaction from "@hooks/useGenerateSignedOrdinalTransaction";
import { RouteType } from "@routes/RouteType";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { appReducerType } from "@redux/slice/appReducer";
import { getInscription } from "@orangecryptohq/orangeseed";
import AppConfig from 'react-native-config';

const RestoreDetails = () => {
    const { selectedAccount, network } = useSelector(
        (state: { seedPhraseReducer: appReducerType }) => state.appReducer
    );
    const { ordinals, isError, isLoading, } = useOrdinalsByAddress();
    const [isFetching, setIsFetching]   = useState(false);
    console.log("RestoreDetails", `useOrdinalsByAddress ${JSON.stringify(ordinals)}`);
    const [selectedAssetId, setSelectedAssetId] = useState(null);
    const { fetchByIds } = useBrc20Inscriptions();
    const [assetList, setAssetList] = useState([])
    const [selectedAsset, setSelectedAsset] = useState({})
    const {
        isPending,
        generateSignedOrdinalTransaction,
    } = useGenerateSignedOrdinalTransaction();

    const handleSelection = (selectedItem) => {
        setSelectedAsset(selectedItem)
        setSelectedAssetId(selectedItem.id === selectedAssetId ? null : selectedItem.id);
    };

    const setOrdinalsData = async (filteredData) => {
        const newArray = [];
        setIsFetching(true)
        for (const item of filteredData) {
            const result = await getInscription(AppConfig.ORANGESEED_API_KEY, network.type, selectedAccount.ordinalsAddress, item.id);
            newArray.push(result);
        }
        setIsFetching(false)
        console.log('setOrdinalsData', newArray);
        setAssetList(newArray)
    }

    const getAssetList = async (ids) => {
        try {
          const brc20Data = await fetchByIds(ids);
            console.log('getAssetList', `ids: ${JSON.stringify(ids)}`);
            console.log('getAssetList', `brc20Data: ${JSON.stringify(brc20Data.data)}`);
            if (!brc20Data || !Array.isArray(brc20Data.data)) {
                return;
            }
            const toRemoveIds = new Set(brc20Data.data.map(item => item.id));
            const filteredData = ordinals.filter(item => !toRemoveIds.has(item.id));
            //console.log('Filtered Data:', JSON.stringify(filteredData));
           // setAssetList(filteredData)
            await setOrdinalsData(filteredData)
            return filteredData;
        } catch (error) {
            console.error('Error fetching asset list:', error);
        }
    };

    useEffect(() => {
        if (ordinals.length > 0) {
            const ids = ordinals.map(tx => tx.id);
            getAssetList(ids)
        }

    }, [ordinals])

    const getSignedTransaction = async () => {
        try {
            const signedOrdinals = await generateSignedOrdinalTransaction(selectedAccount.ordinalsAddress, selectedAsset);
            if (!signedOrdinals) {
                throw new Error('Signed ordinals transaction is undefined.');
            }
            push(RouteType.SENDORDINALSCONFIRMATION, {
                transactionData: signedOrdinals,
                confirmData: {
                    transactionType: strings.ordinals,
                    recipientAddress: selectedAccount.ordinalsAddress,
                },
            });
            console.log('generateSignedSendOrdinals', `signedOrdinals: ${JSON.stringify(signedOrdinals)}`);
        } catch (error) {
            console.error('Error in generateSignedSendOrdinals:', error);
            Toast.show({
                type: 'error',
                text1: strings.unableToGenrateTransaction,
            });
        }
    }

    return (
        <View style={styles.container}>
            {isLoading && <Loader loading={isLoading} />}
            {isPending && <Loader loading={isPending} />}
            {isFetching && <Loader loading={isFetching} />}
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.restoreAssets}</Text>
                {/* <Text style={styles.description}>{strings.noAssetFound}</Text> */}
                <FlatList
                    data={assetList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <AssetItem
                            item={item}
                            onSelect={handleSelection}
                            isSelected={selectedAssetId === item.id} />
                    )}

                    ListEmptyComponent={
                        <View style={styles.emptyListContainer}>
                            {!isFetching && <Text style={styles.emptyListText}>{strings.noAssetFound}</Text>}
                        </View>
                    }
                />
            </View>

            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.transfer}
                    onPress={() => getSignedTransaction()}
                    textColor={Color.white}
                    disabled={!selectedAssetId}
                    width={"100%"}
                    height={Responsive.size50}
                />
            </View>
        </View>
    );
};
export default RestoreDetails;