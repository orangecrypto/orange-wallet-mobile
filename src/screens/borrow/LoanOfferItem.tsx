import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import BigNumber from 'bignumber.js';
import { satsToBtc } from '@orangecryptohq/orangeseed';
import { getFiateValue } from './BorrowUtils';
import { styles } from './styles';
import { localAssets } from '@assets/assets';
import { Color } from '@values/color';

const LoanOfferItem = ({ item, index, selected, onSelect }) => {
  const [fiatValue, setFiatValue] = useState(null);

  useEffect(() => {
    const fetchFiatValue = async () => {
      const btcAmount = satsToBtc(new BigNumber(item?.loan_breakdown?.interest_sats));
      console.log('LoanOfferItem',item?.loan_breakdown?.interest_sats)
      const value = await getFiateValue(btcAmount);
      setFiatValue(value.toFixed(2));
    };
    fetchFiatValue();
  }, [item]);

  const btcAmount = satsToBtc(new BigNumber(item?.loan_breakdown?.interest_sats));

  return (
    <TouchableOpacity
      onPress={() => onSelect(index)}
      style={[
        styles.card,
        selected ? styles.selectedCard : null
      ]}
    >
      <View style={styles.itemRow}>
        <Image style={styles.btcIcon} source={localAssets.borrowbtc} />
        <Text style={styles.value}>{`${btcAmount} `}</Text>
        <Text style={styles.fiat}>
          {fiatValue ? `$${fiatValue}` : '...'}
        </Text>
      </View>
      <View style={styles.itemDetailRow}>
        <Text style={styles.detailsLabel}>
          {item.loan_term_days} Days • {parseFloat(((item.loan_breakdown.interest_sats / item.loan_breakdown.principal_sats) * 100).toFixed(2))}% Interest
        </Text>
        <Text style={styles.ltv}>
          LTV: <Text style={[styles.ltv, { color: Color.white }]}>{parseFloat(item?.ltv_rate).toFixed(2)}%</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LoanOfferItem;
