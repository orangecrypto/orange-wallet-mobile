

import { localAssets } from '@assets/assets';
import Loader from '@components/Loader';
import useBrc20Inscriptions from '@hooks/useBrc20Inscriptions';
import useGetCollectionsData from '@hooks/useGetCollectionsData';
import { store } from '@redux/store';
import { push } from '@routes/Navigator';
import { RouteType } from '@routes/RouteType';
import { strings } from '@strings/i18n';
import { useEffect, useState, useMemo, useRef } from 'react';
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import NftItem from './NftItem';
import { filterIncriptionItems, getCollectionKey } from './NftUtils';
import { styles } from './styels';

const Nft = () => {
  const account = store.getState().appReducer.selectedAccount
  const item = { name: "Ordinals, RUNES and BRC20", address: account?.ordinalsAddress }
  const [totalAssets, setTotalAssets] = useState(0);
  const [brc20Transfer, setbrc20Transfer] = useState([]);
  const [incriptionList, setincriptionList] = useState([]);
  const { isPending, isLoading: brc20Loading, error: brc20Error, fetchByIds } = useBrc20Inscriptions();
  const { data: collectionsData, isLoading, isError, loadNextPage } = useGetCollectionsData();
  console.log('Nft useGetCollectionsData', isError)

  const setIncriptionData = async (bbrc20TransferData) => {
    console.log('setIncriptionData', await filterIncriptionItems(collectionsData?.results, bbrc20TransferData))
    const newItems = await filterIncriptionItems(collectionsData?.results, bbrc20TransferData);
    setincriptionList([...incriptionList, ...newItems]);
  }

  // FIX: Memoize collection IDs to prevent re-runs when collectionsData object reference changes
  const collectionIds = useMemo(() => {
    if (!collectionsData?.results) return [];
    return collectionsData.results.map((item) => String(getCollectionKey(item)));
  }, [collectionsData?.results?.length, collectionsData?.total_inscriptions]);

  // CRITICAL FIX: Prevent duplicate processing of same NFT data
  const nftDataProcessed = useRef(false);
  const lastProcessedCount = useRef(0);

  useEffect(() => {
    console.log('⏱️ [NFT TIMING] useEffect triggered at:', new Date().toLocaleTimeString());
    console.log('⏱️ [NFT TIMING] collectionsData:', !!collectionsData, 'collectionIds.length:', collectionIds.length);

    // OPTIMIZATION: If no NFTs, set state immediately and return
    if (collectionsData && collectionsData.total_inscriptions === 0) {
      console.log('⏱️ [NFT TIMING] No NFTs found, setting empty state at:', new Date().toLocaleTimeString());
      setbrc20Transfer([]);
      setincriptionList([]);
      setTotalAssets(0);
      return;
    }

    if (!collectionsData || collectionIds.length === 0) {
      console.log('⏱️ [NFT TIMING] Waiting for collections data...');
      return;
    }

    // CRITICAL FIX: Skip if already processed this exact data
    if (nftDataProcessed.current && lastProcessedCount.current === collectionIds.length) {
      console.log('⏱️ [NFT TIMING] SKIPPING - Already processed', collectionIds.length, 'collections');
      return;
    }

    const fetchData = async () => {
      console.log('⏱️ [NFT TIMING] Processing NFT data for', collectionIds.length, 'collections at:', new Date().toLocaleTimeString());
      const results = collectionsData?.results || [];
      console.log('NFT', `collectionsData ${JSON.stringify(results)}`);
      console.log('NFT', `collectionIds ${collectionIds}`);

      console.log('⏱️ [NFT TIMING] Calling fetchByIds at:', new Date().toLocaleTimeString());
      const brc20Data = await fetchByIds(collectionIds)
      console.log('⏱️ [NFT TIMING] fetchByIds DONE at:', new Date().toLocaleTimeString());
      console.log('NFT', `fetchByIds `, brc20Data);

      const totalInscriptions = collectionsData?.total_inscriptions || 0;
      const totalInscriptionsBrc20 = brc20Data?.total_inscriptions_brc_20 || 0; // FIXED: Don't add brc20Transfer.length
      const totalInscriptionsNonBrc20 = totalInscriptions - totalInscriptionsBrc20;

      console.log('NFT', `totalInscriptions ${totalInscriptions}`);
      console.log('NFT', `totalInscriptionsBrc20 ${totalInscriptionsBrc20}`);
      console.log('NFT', `totalInscriptionsNonBrc20 ${totalInscriptionsNonBrc20}`);
      console.log('NFT', `brc20InscriptionData ${JSON.stringify(brc20Data?.data)}`);

      // CRITICAL FIX: REPLACE arrays instead of APPENDING
      setbrc20Transfer(brc20Data.data || []); // Don't append - replace!

      if (totalInscriptionsNonBrc20 > 0) {
        console.log('setIncriptionData', 'call');
        const newItems = await filterIncriptionItems(collectionsData?.results, brc20Data.data);
        setincriptionList(newItems); // Don't append - replace!
      }
      else {
        setincriptionList([])
      }

      setTotalAssets(
        totalInscriptionsBrc20 === 0 && totalInscriptionsNonBrc20 === totalInscriptions
          ? 0
          : totalInscriptionsNonBrc20
      );

      // Mark as processed
      nftDataProcessed.current = true;
      lastProcessedCount.current = collectionIds.length;
    };

    fetchData();

  }, [collectionIds.length]) // Only re-run when collection count changes

  console.log("brc20Error", brc20Error);
  console.log("brc20Loading", brc20Loading);
  console.log("isPending", isPending);
  const showLoader = (!isError && isLoading) && (!brc20Error && isPending);
  console.log("")
  return (
    <View style={styles.container}>
      {showLoader && <Loader loading={true} />}

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
              onPress={() => push(RouteType.VIEWQR, { item: item })}
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
        ListEmptyComponent={
          <View style={styles.emprtyViewStyle}>
            <Text style={styles.emprtyViewText}>{strings.nonfts}</Text>
          </View>
        }
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default Nft;
