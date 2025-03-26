

import { localAssets } from '@assets/assets';
import Loader from '@components/Loader';
import useBrc20Inscriptions from '@hooks/useBrc20Inscriptions';
import useGetCollectionsData from '@hooks/useGetCollectionsData';
import { push } from '@routes/Navigator';
import { RouteType } from '@routes/RouteType';
import { strings } from '@strings/i18n';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import NftItem from './NftItem';
import { filterIncriptionItems, getCollectionKey } from './NftUtils';
import { styles } from './styels';

const Nft = () => {

    const [totalAssets, setTotalAssets] = useState(0);
    const [brc20Transfer, setbrc20Transfer] = useState([]);
    const [incriptionList, setincriptionList] = useState([]);
    const {isPending, fetchByIds } = useBrc20Inscriptions();
    const { data: collectionsData, isLoading, isError, loadNextPage } = useGetCollectionsData();
    console.log('Nft useGetCollectionsData', isError)
   
    const setIncriptionData = async (bbrc20TransferData) => {

        console.log('setIncriptionData', await filterIncriptionItems(collectionsData?.results, bbrc20TransferData))
        const newItems = await filterIncriptionItems(collectionsData?.results, bbrc20TransferData);
        setincriptionList([...incriptionList, ...newItems]);
    }

    

    useEffect(() => {
        console.log('NFT tab First call')
        if (!collectionsData) return;
        const fetchData = async () => {
            console.log('Reloading')
            const results = collectionsData?.results || [];
            const ids = results.map((item) => String(getCollectionKey(item)));

            console.log('NFT', `collectionsData ${JSON.stringify(results)}`);
            console.log('NFT', `collectionIds ${ids}`);
            const brc20Data = await fetchByIds(ids)
            console.log('NFT', `fetchByIds `, brc20Data);
           
            const totalInscriptions = collectionsData?.total_inscriptions || 0;
            const totalInscriptionsBrc20 = brc20Data?.total_inscriptions_brc_20 + brc20Transfer.length || 0;
            const totalInscriptionsNonBrc20 = totalInscriptions - totalInscriptionsBrc20;

            console.log('NFT', `totalInscriptions ${totalInscriptions}`);
            console.log('NFT', `totalInscriptionsBrc20 ${totalInscriptionsBrc20}`);
            console.log('NFT', `totalInscriptionsNonBrc20 ${totalInscriptionsNonBrc20}`);
            console.log('NFT', `brc20InscriptionData ${JSON.stringify(brc20Data?.data)}`);


            setbrc20Transfer([...brc20Transfer,...brc20Data.data]);

            if (totalInscriptionsNonBrc20 > 0) {
                console.log('setIncriptionData', 'call');
                await setIncriptionData(brc20Data.data);
            }
            else {
                setincriptionList([])
            }
            setTotalAssets(
                totalInscriptionsBrc20 === 0 && totalInscriptionsNonBrc20 === totalInscriptions
                    ? 0
                    : totalInscriptionsNonBrc20
            );
        };
        fetchData();

    }, [collectionsData])

    return (
        <View style={styles.container}>
          {(isPending || isLoading) && !isError && <Loader loading={true} />}

            <View style={styles.contentContainer}>
                <ImageBackground source={localAssets.walletbg} style={styles.walletBackground} borderRadius={12}>
                    <View style={styles.balanceView}>
                        <Image source={localAssets.nftwallet} style={styles.balanceIcon} />
                        <View>
                            <Text style={styles.walletText}>{`${'$ 0'}`}</Text>
                            <View style={styles.walletTextView}>
                                <Text style={styles.walletTextCurrencyView}>{`${totalAssets} ` + strings.nfts}</Text>
                                <Text style={styles.walletTextCurrencyView}>USD</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.horizontalButtons}>
                        <TouchableOpacity style={styles.addCoinView} onPress={() => push(RouteType.TRANSFER, { transafers: brc20Transfer })}>
                            <Image style={styles.addCoinIcon} source={localAssets.transferarrow} />
                            <Text style={styles.addCoinText}>{strings.transfer}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addCoinView} 
                        onPress={() => push(RouteType.VIEWQR)}
                        //onPress={() => push(RouteType.INCRIPTIONDETAILS)}
                        >
                            <Image style={styles.addCoinIcon} source={localAssets.transactionarrow} />
                            <Text style={styles.addCoinText}>{strings.receive}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>

            <FlatList
                data={incriptionList}
                renderItem={({ item }) => <NftItem item={item} />}
                numColumns={2}
                style={styles.listConatiner}
                columnWrapperStyle={styles.columnWrapper}
                onEndReached={loadNextPage}
                onEndReachedThreshold={0.5}
            />
        </View>
    );

};

export default Nft;
