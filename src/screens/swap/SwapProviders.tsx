import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import Loader from "@components/Loader";
import { useCalculateRuneDex } from "@hooks/swap/useCalculateRuneDex";
import { btcToSats } from "@orangecryptohq/orangeseed";
import { BigNumber } from "@orangecryptohq/orangeseed/dist/utils/bignumber";
import { setSlippage } from "@redux/slice/SwapReducer";
import { useAppDispatch } from "@redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import { goBack, push } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { getImageSource } from "@utils/cryptoUtils";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import SwapProviderItem from "./SwapProviderItem";
import { getFiateValue } from "./SwapUtils";

const SwapProviders = ({ route }) => {

  const { exchangeAmount, exchangeToken, selectedReceiveAsset, receiveAmount } = route.params;
  const { calculateRuneDex, data, isPending: loadRuneDex, isError } = useCalculateRuneDex();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dotSwapFiatValue, setDotSwapFiatValue] = useState(null);
  const [runeDexFiatValue, setRuneDexFiatValue] = useState(null);
  const [runeDexValue, setRuneDexValue] = useState(null);
  const [swapProvidersArray, setSwapProvidersArray] = useState([]);

  const dispatch: Dispatch = useAppDispatch();

  useEffect(() => {
    const fetchValue = async () => {
      if (selectedReceiveAsset?.name && receiveAmount) {
        const value = await getFiateValue(selectedReceiveAsset.name);
        if (value && !isNaN(receiveAmount)) {
          const fiatAmount = (value * parseFloat(receiveAmount)).toFixed(2);
          console.log('setDotSwapFiatValue', fiatAmount);
          setDotSwapFiatValue(fiatAmount);
        }
      }

      if (exchangeAmount && selectedReceiveAsset?.ticker && selectedReceiveAsset?.name) {
        const pair = `${exchangeToken.ticker}-${selectedReceiveAsset.name.replace(/•/g, "")}`;
        const bidAmount = btcToSats(new BigNumber(exchangeAmount));
        const slippage = 0.02;
        console.log('calculateRuneDex', `pair ${pair}`);
        try {
          const result = await calculateRuneDex({ pair, bidAmount, slippage });
          console.log(result.data);
          setRuneDexValue(result?.data?.effective_amount)
          const value = await getFiateValue(selectedReceiveAsset.name);
          const fiatAmount = (value * parseFloat(result?.data?.effective_amount)).toFixed(2);
          console.log('setRuneDexFiatValue', fiatAmount);
          setRuneDexFiatValue(fiatAmount);
        } catch (err) {
          console.error('RuneDex error', err);
        }
      }
    };
    if (selectedReceiveAsset?.name && receiveAmount) {
      fetchValue();
    }

  }, [selectedReceiveAsset?.name, receiveAmount, exchangeAmount, selectedReceiveAsset?.ticker]);

  useEffect(() => {
    const prepareSwapProviders = async () => {
      if (!selectedReceiveAsset?.name) return;

      const receiveIcon = await getImageSource(selectedReceiveAsset.name);
      const sendIcon = await getImageSource(exchangeToken.name);
      const array = [];

      if (dotSwapFiatValue && receiveAmount && parseFloat(receiveAmount) > 0) {
        array.push({
          name: 'DotSwap',
          fiatRate: dotSwapFiatValue,
          ticker: selectedReceiveAsset?.ticker,
          value: Math.ceil(receiveAmount),
          icon: localAssets.dotswap,
          receiveIcon,
          sendIcon
        });
      }

      if (runeDexFiatValue && runeDexValue && parseFloat(runeDexValue) > 0) {
        array.push({
          name: 'Runes DEX',
          fiatRate: runeDexFiatValue,
          ticker: selectedReceiveAsset?.ticker,
          value: Math.ceil(runeDexValue),
          icon: localAssets.runedex,
          receiveIcon,

          sendIcon
        });
      }
      array.sort((a, b) => parseFloat(b.fiatRate) - parseFloat(a.fiatRate));
      if (array[0]) array[0].label = 'Recommended';
      if (array[1]) array[1].label = 'Best';
      if (array[0]) {
        const slippageValue = array[0].name === 'Runes DEX' ? 0.02 : 4;
        dispatch(setSlippage(slippageValue));
      }
      setSwapProvidersArray(array);
    };

    prepareSwapProviders();
  }, [
    dotSwapFiatValue,
    selectedReceiveAsset?.ticker,
    selectedReceiveAsset?.name,
    receiveAmount,
    runeDexFiatValue,
    runeDexValue,
  ]);


  return (
    <View style={styles.container}>
      {loadRuneDex && <Loader loading={loadRuneDex} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.button} onPress={() => goBack()}>
            <Text style={styles.buttonText}>{strings.back}</Text>
          </TouchableOpacity>
          <View style={styles.topContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {`${strings.swapProvider} `}
            </Text>
          </View>
          <FlatList
            data={swapProvidersArray}
            keyExtractor={(_, index) => index.toString()}
            style={styles.swapProviderList}
            renderItem={({ item, index }) => (
              <SwapProviderItem
                item={item}
                index={index}
                selectedIndex={selectedIndex}
                onPress={setSelectedIndex}
              />
            )}
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <CommonButton
          title={strings.continue}
          onPress={() => push(RouteType.SWAPDETAILS,
            {
              selectedProvider: swapProvidersArray[selectedIndex],
              exchangeToken: exchangeToken,
              exchangeAmount: exchangeAmount,
              selectedReceiveAsset: selectedReceiveAsset
            })}
          backgroundColor={Color.orangeButton}
          textColor={Color.white}
          width={'100%'}
          height={Responsive.size50} />
      </View>
    </View>
  );
};
export default SwapProviders;