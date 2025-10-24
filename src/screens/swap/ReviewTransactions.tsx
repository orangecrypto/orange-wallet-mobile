import CommonButton from "@components/CommonButton";
import { goBack, push } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { localAssets } from "@assets/assets";
import { appReducerType } from "@redux/slice/appReducer";
import { useSelector } from "react-redux";
import { useCalculateDotSwap } from "@hooks/swap/useCalculateDotSwap";
import { getFiateValue } from "./SwapUtils";
import TokenImage from "@components/TokenImage";
import { SwapReducerType } from "@redux/slice/SwapReducer";
import { btcToSats } from "@orangecryptohq/orangeseed";
import { BigNumber } from "@orangecryptohq/orangeseed/dist/utils/bignumber";
import { useDotSwapPsbt } from "@hooks/swap/useDotSwapPsbt";
import Toast from "react-native-toast-message";
import { useDotSwapSignedPsbt } from "@hooks/swap/useDotSwapSignedPsbt";
import { SwapRequestBody, useGetRuneDexPsbt } from "@hooks/swap/useGetRuneDexPsbt";
import { RouteType } from "@routes/RouteType";
import { usePublishRuneDexTx } from "@hooks/swap/usePublishRuneDexTx";
import Loader from "@components/Loader";

const ReviewTransactions = ({ route }) => {
  const {
    selectedAccount: {
      ordinalsAddress,
      btcAddress,
      ordinalsPublicKey,
      btcPublicKey,
      masterPubKey
    } = {},
    network,
    accountList,
  } = useSelector((state: { appReducer: appReducerType }) => state.appReducer);
  console.log('ReviewTransactions', `btcAddress ${btcAddress}`)
console.log('ReviewTransactions', `btcPublicKey ${btcPublicKey}`)
console.log('ReviewTransactions', `ordinalsPublicKey ${ordinalsPublicKey}`)
console.log('ReviewTransactions', `masterPubKey ${masterPubKey}`)
  const { sllipage, liquidiumFee } = useSelector((state: { swapReducer: SwapReducerType }) => state.swapReducer);

  const {
    selectedProvider,
    exchangeToken,
    exchangeAmount,
    selectedReceiveAsset,
    receiveAmount,
    receiveRequestAmount,
    priorityFeeRate
  } = route.params;

  const [receiveFiateValue, setReceiveFiateValue] = useState(0);
  const [sendFiateValue, setSendFiateValue] = useState(0);

  const { getReceiveAmount } = useCalculateDotSwap();
  const { getDotSwapPsbt, loading: dotSwapLoading } = useDotSwapPsbt();
  const { sendSignedSwapPsbt, loading: signedLoading, error: signedError, response: dotSwapSignedPsbt } = useDotSwapSignedPsbt();

  const { mutateAsync: getRuneDexPsbt, isPending: runeDexLoading, error: runeDexError } = useGetRuneDexPsbt();
  const { mutateAsync: publishRuneDexTx, data: publishRuneDexTxData, isPending: publishLoading, error: publishError } = usePublishRuneDexTx();

  const handleConfirmTransaction = async () => {
    if (!selectedProvider?.name || !exchangeToken || !selectedReceiveAsset) return;

    try {
      if (selectedProvider.name === 'DotSwap') {
        await handleDotSwapTransaction();
      } else if (selectedProvider.name === 'Runes DEX') {
        await handleRuneDexTransaction();
      }
    } catch (err) {
      console.error('Transaction Error:', err);
    }
  };

  const handleDotSwapTransaction = async () => {
    try {
      const result = await getReceiveAmount({
        exchangeToken: exchangeToken?.ticker,
        receiveToken: selectedReceiveAsset?.name,
        exchangeAmount,
        address: ordinalsAddress,
      });

      const swapRequest = {
        send_amount: btcToSats(new BigNumber(exchangeAmount)),
        send_coin_type: 'btc',
        send_tick: exchangeToken?.ticker,
        receive_amount: receiveRequestAmount,
        receive_coin_type: 'runes',
        receive_tick: selectedReceiveAsset?.name,
        slipper: sllipage,
        fee_rate: priorityFeeRate,
        token: result?.token,
        //public_key: accountList[0]?.masterPubKey,
        user_public_key: `${btcPublicKey}:${ordinalsPublicKey}`,
       // public_key: masterPubKey,
        address: ordinalsAddress,
        btc_address: btcAddress,
      };

      console.log('DotSwap Swap Request:', swapRequest);

      const dotSwapResponce = await getDotSwapPsbt(swapRequest); // result is immediate
 console.log(`getDotSwapPsbt`,`${JSON.stringify(dotSwapResponce)}`)
  if (!dotSwapResponce?.data?.data) {
    return Toast.show({ type: 'error', text1: dotSwapResponce?.data?.msg || 'Failed to get PSBT' });
  }

      console.log(`getDotSwapPsbt`,`${JSON.stringify(dotSwapResponce?.data?.data)}`)
      await sendSignedSwapPsbt({
        order_id: response.data.data.order_id,
        psbt: response.data.data.psbt,
      });

      if (dotSwapSignedPsbt?.tx_id) {
        push(RouteType.CONFIRMSWAPTRANSACTION);
      }
    } catch (err) {
      console.error('DotSwap Error:', err);
      Toast.show({ type: 'error', text1: 'DotSwap transaction failed' });
    }
  };

  const handleRuneDexTransaction = async () => {
    const pair = `${exchangeToken.ticker}-${selectedReceiveAsset.name.replace(/•/g, '')}`;

    const swapOrder: SwapRequestBody = {
      ask_address: ordinalsAddress,
      ask_amount: String(receiveAmount),
      bid_address: btcAddress,
      bid_address_pubkey: btcPublicKey,
      bid_amount: String(btcToSats(new BigNumber(exchangeAmount))),
      bid_asset: exchangeToken?.ticker,
      fee_address: btcAddress,
      fee_address_pubkey: btcPublicKey,
      rate: priorityFeeRate,
      slippage: String(sllipage),
      slippage_tolerance: true,
    };

    try {
      const response = await getRuneDexPsbt({ pair, body: swapOrder });

      if (!response?.psbt || !response?.request_id) {
        throw new Error('Invalid RuneDex PSBT response');
      }
      const publishPayload = {
        psbt: response.psbt,
        request_id: response.request_id,
      };

      console.log('Publishing RuneDex Tx with payload:', publishPayload);
      const publishResponse = await publishRuneDexTx(publishPayload);
      if (publishResponse?.tx_id) {
        push(RouteType.CONFIRMSWAPTRANSACTION);
      }
    } catch (err) {
      console.error('RuneDEX Transaction Error:', err);
      Toast.show({ type: 'error', text1: 'Runes DEX transaction failed' });
    }
  };

  useEffect(() => {
    const fetchValue = async () => {
      console.log('setReceiveFiateValue', exchangeToken?.name);
      if (exchangeToken?.name && exchangeAmount) {
        const value = await getFiateValue(exchangeToken?.ticker)
        if (value && !isNaN(exchangeAmount)) {
          const fiatAmount = (value * parseFloat(exchangeAmount)).toFixed(2);
          console.log('setSendFiateValue', fiatAmount);
          setSendFiateValue(fiatAmount);
        }
      }
      if (selectedReceiveAsset.name && receiveAmount) {
        const value = await getFiateValue(selectedReceiveAsset?.name)
        if (value && !isNaN(selectedProvider?.value)) {
          const fiatAmount = (value * parseFloat(receiveAmount)).toFixed(2);
          console.log('setReceiveFiateValue', fiatAmount);
          setReceiveFiateValue(fiatAmount);
        }
      }
    }
    fetchValue()
  }, [exchangeToken?.name, exchangeAmount, selectedReceiveAsset.name, receiveAmount])

  return (
    <View style={styles.container}>

      {dotSwapLoading && <Loader loading={dotSwapLoading} />}
      {signedLoading && <Loader loading={signedLoading} />}
      {runeDexLoading && <Loader loading={runeDexLoading} />}
      {publishLoading && <Loader loading={publishLoading} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.button} onPress={() => goBack()}>
            <Text style={styles.buttonText}>{strings.back}</Text>
          </TouchableOpacity>
          <View style={styles.topContainer}>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.title}>
              {`${strings.reviewTransaction} `}
            </Text>
          </View>

          <View style={[styles.card, styles.sendCard]}>
            <View style={styles.reviewTransactionContainer}>
              <Text style={styles.sendText}>{strings.youSend}</Text>
              <View style={[styles.sendCardConatiner, { marginTop: Responsive.size10 }]}>
                {selectedProvider.sendIcon ? <Image source={selectedProvider.sendIcon} style={styles.swapProviderIcon} /> :
                  <TokenImage
                    fungibleToken={{
                      ticker: exchangeToken?.ticker
                    }}
                    size={40}
                    round
                    variant="dark" />
                }
                <Text style={styles.providerName}>{`${exchangeToken?.name}`}</Text>
              </View>
            </View>

            <View style={styles.reviewTransactionValueContainer}>
              <Text style={styles.reviewValue}>{`${exchangeAmount} ${exchangeToken?.ticker}`}</Text>
              <Text style={styles.reviewFiat}>{`$${sendFiateValue} USD`}</Text>
            </View>
          </View>

          <View style={styles.swapIconBakcground}>
            <Image style={styles.swapIcon} source={localAssets.swaparrows} />
          </View>

          <View style={[styles.card, styles.sendCard]}>
            <View style={styles.reviewTransactionContainer}>
              <Text style={styles.sendText}>{strings.youReceive}</Text>
              <View style={[styles.sendCardConatiner, { marginTop: Responsive.size10 }]}>
                {selectedProvider.receiveIcon ? <Image source={selectedProvider.receiveIcon} style={styles.swapProviderIcon} /> :
                  <TokenImage
                    fungibleToken={{
                      ticker: selectedProvider?.ticker
                    }}
                    size={40}
                    round
                    variant="dark" />
                }

                <Text style={styles.providerName} >{` ${selectedReceiveAsset?.name}`}</Text>
              </View>
            </View>

            <View style={styles.reviewTransactionValueContainer}>
              <Text style={styles.reviewValue} >{`${Number(Math.floor(receiveAmount))} ${selectedReceiveAsset?.ticker}`}</Text>
              <Text style={styles.reviewFiat}>{`$${receiveFiateValue} USD`}</Text>
            </View>

          </View>
        </View>
      </ScrollView>
      <Text style={styles.warningText}>
        {strings.warning}: <Text style={styles.warningMessage}>{strings.warningMessageSwapTransaction}</Text>
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
export default ReviewTransactions;