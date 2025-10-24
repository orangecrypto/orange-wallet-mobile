import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import Switch from "@components/Switch";
import { goBack, push } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import SendSummaryCard from "./SendSummaryCard";
import SwapProvider from "./SwapProvider";
import { btcToSats } from "@orangecryptohq/orangeseed";
import { useSelector } from "react-redux";
import { appReducerType } from "@redux/slice/appReducer";
import { setLiquidiumFee, SwapReducerType } from "@redux/slice/SwapReducer";
import { useCalculateRuneDex } from "@hooks/swap/useCalculateRuneDex";
import { BigNumber } from "@orangecryptohq/orangeseed/dist/utils/bignumber";
import { useCalculateDotSwap } from "@hooks/swap/useCalculateDotSwap";
import { Dispatch } from "@reduxjs/toolkit";
import { useAppDispatch } from "@redux/store";
import Loader from "@components/Loader";
import { getRecommendedFees } from "../SwapUtils";

const SwapDetails = ({ route }) => {

  const { selectedProvider, exchangeToken, exchangeAmount, selectedReceiveAsset } = route.params;
  const { selectedAccount: { ordinalsAddress } = {}, network } = useSelector(
    (state: { appReducer: appReducerType }) => state.appReducer
  );
  const [isEnable, setIsEnable] = useState(false)
  const toggleSwitch = () => {
    setIsEnable(!isEnable)
  }
  const { sllipage, liquidiumFee } = useSelector((state: { swapReducer: SwapReducerType }) => state.swapReducer);
  const [priorityFeeRate, setPriorityFeeRate] = useState<number | null>(null);
  const [minimumReceive, setMinimumReceive] = useState<number | null>(null);
  const { calculateRuneDex, data, isPending: loadingRunedex, isError } = useCalculateRuneDex();
  const { getReceiveAmount } = useCalculateDotSwap();
  const dispatch: Dispatch = useAppDispatch();
  if (priorityFeeRate === null) {
    getRecommendedFees()
      .then(res => {setPriorityFeeRate(res?.fastestFee)
    console.error("getRecommendedFees", res)})
      .catch(err => console.error("Fee rate error:", err));
  }

  const handleConfirmTransaction = () => {
    setIsEnable(!isEnable)

    const safeMinimum = Number(minimumReceive) || 0;
    const safeFee = Number(liquidiumFee) || 0;
    const finalReceiveAmount = safeMinimum - safeFee;
    push(RouteType.REVIEWSWAPTRANSACTION, {
      selectedProvider: selectedProvider,
      exchangeToken: exchangeToken,
      selectedReceiveAsset: selectedReceiveAsset,
      exchangeAmount: exchangeAmount,
      receiveAmount: finalReceiveAmount,
      receiveRequestAmount: selectedProvider?.value,
      priorityFeeRate:priorityFeeRate
    })

    console.log('handleConfirmTransaction', selectedProvider?.value)
  }

  useEffect(() => {
    const fetchRuneDexQuote = async () => {
      if (selectedProvider?.value && sllipage !== null) {
        if (selectedProvider.name === 'Runes DEX') {
          const pair = `${exchangeToken.ticker}-${selectedReceiveAsset.name.replace(/•/g, "")}`;
          const bidAmount = btcToSats(new BigNumber(exchangeAmount));
          const slippage = sllipage;
          try {
            const result = await calculateRuneDex({ pair, bidAmount, slippage });
            console.log(result.data);
            setMinimumReceive(result?.data?.min_received_amount)
            const feePercentage = result?.data?.dex_fee_percent / 100;  // Convert percentage to decimal
            const feeValue = Math.ceil(selectedProvider?.value * feePercentage);

            dispatch(setLiquidiumFee(feeValue))
          } catch (err) {
            console.error('RuneDex error:', err);
          }
        }

        if (selectedProvider.name === 'DotSwap') {
          if (selectedProvider.name === 'DotSwap') {
            const dotSwapEffectiveValue = Math.floor(selectedProvider?.value * (1 - sllipage / 100));
            setMinimumReceive(dotSwapEffectiveValue);
            const result = await getReceiveAmount({
              exchangeToken: exchangeToken?.ticker,
              receiveToken: selectedReceiveAsset?.name,
              exchangeAmount: exchangeAmount,
              address: ordinalsAddress,
            });
            const feePercentage = result?.liquider_service_fee_percent / 100;
            const feeValue = Math.ceil(selectedProvider?.value * feePercentage);
            dispatch(setLiquidiumFee(feeValue))

          }
        }
      }
    };

    fetchRuneDexQuote();
  }, [selectedProvider, sllipage]);

  return (
    <View style={styles.container}>
      {loadingRunedex && <Loader loading={loadingRunedex} />}
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
              {`${strings.swapDetails} `}
            </Text>
          </View>
          {selectedProvider && <SwapProvider item={selectedProvider} />}
          {exchangeToken?.ticker && selectedProvider?.ticker && (
            <SendSummaryCard
              exchangeAmount={exchangeAmount}
              exchangeToken={exchangeToken}
              selectedProvider={selectedProvider}
              receiveIcon={selectedProvider.receiveIcon}
            />
          )}

          <View style={styles.borrowDetails}>
            <View style={styles.itemDetailRow}>
              <Text style={styles.detailsLabel}>{strings.slippage}</Text>
              <View
                style={styles.editContainerView}>
                <Text style={styles.detailsValue}>{`${sllipage} %`}</Text>
                <TouchableOpacity style={styles.editContainer} onPress={() => push(RouteType.EDITSLIPPAGE, { type: selectedProvider.name })}>
                  <Image style={styles.editIcon} source={localAssets.blueedit} />
                  <Text style={styles.editText}>{strings.edit}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.itemDetailRow}>
              <Text style={styles.detailsLabel}>{strings.minimumReceived}</Text>
              <View style={styles.itemRow}>
                <Text style={styles.value}>{`${minimumReceive}`} <Text style={styles.tick}>{selectedProvider?.ticker}</Text></Text>
              </View>
            </View>
            <View style={styles.itemDetailRow}>
              <Text style={styles.detailsLabel}>{strings.liquidityFees}</Text>
              <View style={styles.itemRow}>
                <Text style={styles.value}>{`${liquidiumFee}`} <Text style={styles.tick}>{selectedProvider?.ticker}</Text></Text>
              </View>
            </View>
            <View style={styles.itemDetailRow}>
              <Text style={styles.detailsLabel}>{strings.feeRate}</Text>
              <View style={styles.itemRow}>
                <Text style={styles.value}>{`${priorityFeeRate}`} <Text style={styles.tick}>{'sats/vb'}</Text></Text>
              </View>
            </View>

            <View style={styles.itemDetailRow}>
              <Text style={styles.detailsLabel}>{strings.sponseredTx}</Text>
              <Switch
                isEnable={isEnable}
                height={20}
                width={36}
                onToggle={() => toggleSwitch()} />
            </View>
          </View>
        </View>
      </ScrollView>

      <Text style={styles.warningText}>
        {strings.warning}: <Text style={styles.warningMessage}>{strings.warningMessageSwapDetails}</Text>
      </Text>
      <View style={styles.buttonContainer}>
        <CommonButton
          title={strings.confirm}
          onPress={() => handleConfirmTransaction()}
          backgroundColor={Color.orangeButton}
          textColor={Color.white}
          width={'100%'}
          height={Responsive.size50} />
      </View>
    </View>
  );
};
export default SwapDetails;