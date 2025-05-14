import React, { useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { goBack, push } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import { styles } from "./styles";
import { RouteType } from "@routes/RouteType";
import CommonButton from "@components/CommonButton";
import LoanOfferItem from "./LoanOfferItem";

const BorrowOffers = ({ route }) => {

  console.log('BorrowOffers', route?.params?.offers)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loanOfferArray, setLoanOfferArray] = useState(route?.params?.offers ?? []);
  

  return (
    <View style={styles.container}>
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
              {`${strings.borrow} `}
            </Text>
          </View>

          <Text style={styles.description}>{strings.availableOffers}</Text>

          <FlatList
            data={loanOfferArray}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <LoanOfferItem
                item={item}
                index={index}
                selected={index === selectedIndex}
                onSelect={setSelectedIndex}
              />
            )}
          />
        </View>
      </ScrollView>

      <View style={styles.horizontalButtonContainer}>
        <CommonButton
          title={strings.cancel}
          onPress={() => goBack()}
          backgroundColor={Color.black}
          textColor={Color.white}
          borderColor={Color.blackBorder}
          width={"45%"}
          height={Responsive.size50}
        />
        <CommonButton
          title={strings.continue}
          onPress={() => {
            push(RouteType.BORROWCONFIRMATION, { selectedOffer: loanOfferArray[selectedIndex] });
          }}
          backgroundColor={Color.orangeButton}
          textColor={Color.white}
          width={"45%"}
          height={Responsive.size50}
          disabled={false}
        />
      </View>
    </View>
  );
};

export default BorrowOffers;
