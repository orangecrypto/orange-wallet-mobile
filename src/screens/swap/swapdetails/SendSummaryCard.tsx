import TokenImage from "@components/TokenImage";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "../styles";

const SendSummaryCard = ({
    exchangeAmount,
    exchangeToken,
    selectedProvider,
    receiveIcon,
}) => {
    return (
        <View style={[styles.card, styles.sendCard]}>
            <View style={styles.sendCardConatiner}>
           {selectedProvider.sendIcon ? <Image source={selectedProvider.sendIcon} style={styles.sendbtcIcon} /> :
                    <TokenImage
                        fungibleToken={{
                            ticker: exchangeToken?.ticker
                        }}
                        size={40}
                        round
                        variant="dark" />
                }
                <View>
                    <Text style={styles.sendText}>{strings.youSend}</Text>
                    <Text style={[styles.providerName, { marginTop: Responsive.size5 }]}>
                        {`${exchangeAmount}`}
                        <Text style={styles.tick}>{` ${exchangeToken?.ticker}`}</Text>
                    </Text>
                </View>
            </View>

            <View style={styles.sendCardConatiner}>
                <View style={styles.sendSummaryCardConatiner}>
                    <Text style={[styles.sendText, { textAlign: "right" }]}>{strings.youReceive}</Text>
                    <Text style={[styles.providerName, { marginTop: Responsive.size5, textAlign: "right" }]}>
                        {`${Number(selectedProvider?.value || 0)}`}
                        <Text style={styles.tick}>{` ${selectedProvider?.ticker}`}</Text>
                    </Text>
                </View>
                {receiveIcon ? <Image source={receiveIcon} style={styles.btcIcon} /> :
                    <TokenImage
                        fungibleToken={{
                            ticker: selectedProvider?.ticker
                        }}
                        size={40}
                        round
                        variant="dark" />
                }
            </View>
        </View>
    );
};

export default SendSummaryCard;
