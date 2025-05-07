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
import { useCalculateRuneDex } from "@hooks/swap/useCalculateRuneDex";
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

const ReviewTransactions = ({ route }) => {
  const { selectedAccount: { ordinalsAddress, btcAddress, ordinalsPublicKey, btcPublicKey } = {}, network, accountList } = useSelector(
    (state: { appReducer: appReducerType }) => state.appReducer
  );
  const { selectedProvider, exchangeToken, exchangeAmount, selectedReceiveAsset, receiveAmount } = route.params;
  const { sllipage, liquidiumFee } = useSelector((state: { swapReducer: SwapReducerType }) => state.swapReducer);
  const { calculateRuneDex, data, isPending, isError } = useCalculateRuneDex();
  const { getReceiveAmount } = useCalculateDotSwap();
  const [receiveFiateValue, setReceiveFiateValue] = useState(0);
  const [sendFiateValue, setSendFiateValue] = useState(0);

  const { getDotSwapPsbt, loading, error, response } = useDotSwapPsbt();
  const { sendSignedSwapPsbt, loading: signed, error: signederror, response: dotSwapSignedPsbt } = useDotSwapSignedPsbt();
  const {  mutateAsync: getRuneDexPsbt,  isPending: RuneDexLoading, error: runeDexError, data: rundeDexResponce,} = useGetRuneDexPsbt();
  const handleConfirmTransaction = async () => {



    if (selectedProvider.name === 'DotSwap') {


      const result = await getReceiveAmount({
        exchangeToken: exchangeToken?.ticker,
        receiveToken: selectedReceiveAsset?.name,
        exchangeAmount: exchangeAmount,
        address: ordinalsAddress,
      });

      
      const swapRequest = {
        send_amount: btcToSats(new BigNumber(exchangeAmount)),
        send_coin_type: "btc",
        send_tick: exchangeToken?.ticker,
        receive_amount: receiveAmount,
        receive_coin_type: "runes",
        receive_tick: selectedReceiveAsset?.name,
        slipper: sllipage,
        fee_rate: liquidiumFee,
        token:result?.token,
        public_key: accountList[0].masterPubKey,
        address: ordinalsAddress,
        btc_address: ordinalsAddress
      };
      console.log('handleConfirmTransaction', swapRequest)
      await getDotSwapPsbt(swapRequest)
      console.log('handleConfirmTransaction', response)
      if(!response?.data?.data){
         Toast.show({ type: 'error', text1: response?.data?.msg });
      }
      sendSignedSwapPsbt({
        order_id:response?.data?.data?.order_id,
        psbt: response?.data?.data?.psbt 
      });
      if(dotSwapSignedPsbt?.tx_id){
          push(RouteType.CONFIRMSWAPTRANSACTION)
      }
    }
    if (selectedProvider.name === 'Runes DEX') {
      const swapOrder: SwapRequestBody = {
        ask_address: ordinalsAddress,
        ask_amount: String(receiveAmount),
        bid_address: btcAddress,
        bid_address_pubkey: btcPublicKey,
        bid_amount: String(btcToSats(new BigNumber(exchangeAmount))),
        bid_asset: exchangeToken?.ticker,
        fee_address: btcAddress,
        fee_address_pubkey: btcPublicKey,
        rate: liquidiumFee,
        slippage: String(sllipage),
        slippage_tolerance: true
      };
      console.log('handleConfirmTransaction', swapOrder)
      const pair = `${exchangeToken.ticker}-${selectedReceiveAsset.name.replace(/•/g, "")}`;
      try {
        const response = await getRuneDexPsbt({ pair, body: swapOrder });
        console.log('Swap PSBT response:', response);
      } catch (err) {
        console.error('Swap failed:', err);
      }
    }

  }
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            <View style={styles.reviewTransactionContainer}>
              <View style={styles.reviewTransactionValueContainer}>
                <Text style={styles.reviewValue}>{`${exchangeAmount} ${exchangeToken?.ticker}`}</Text>
                <Text style={styles.reviewFiat}>{`$${sendFiateValue} USD`}</Text>
              </View>

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
            <View style={styles.reviewTransactionContainer}>
              <View style={styles.reviewTransactionValueContainer}>
                <Text style={styles.reviewValue} >{`${Number(Math.floor(receiveAmount))} ${selectedReceiveAsset?.ticker}`}</Text>
                <Text style={styles.reviewFiat}>{`$${receiveFiateValue} USD`}</Text>
              </View>

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