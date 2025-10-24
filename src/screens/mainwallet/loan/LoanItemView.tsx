import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { localAssets } from '@assets/assets';
import { push } from '@routes/Navigator';
import { RouteType } from '@routes/RouteType';
import { Offer } from '@services/network/ApiResponce';
import { Color } from '@values/color';
import { styles } from './styles';
import { strings } from '@strings/i18n';
import { fetchRuneCollateral, getFiateValue, getRemainingTime, getTimeProgressPercentage } from './LoanUtils';
import { useGetTokenName } from '@hooks/borrow/useGetTokenName';
import axios from 'axios';
import { Config } from '@config/Config';
import { useSelector } from 'react-redux';

const statusColors = {
    OFFERED: Color.viewbutton,
    ACCEPTED: Color.viewbutton,
    ACTIVE: Color.selectedCategory,
    REPAID: Color.repaycolorbutton,
};

const statusTextColors = {
    OFFERED: Color.selectedCategory,
    ACCEPTED: Color.selectedCategory,
    ACTIVE: Color.white,
    REPAID: Color.successgreen,
};

const LoanItemView = ({ token }: { token: Offer }) => {
    const [fiatValue, setFiatValue] = useState<string>('');
    const [remainingTime, setremainingTime] = useState<string>('');
    const [progressWidth, setProgressWidth] = useState<number>(0);
    const [runeName, setRuneName] = useState<string>('');
     const { liquidiumToken } = useSelector((state: any) => state.appReducer);
    useEffect(() => {
        const fetchValue = async () => {
            const value = await getFiateValue(token?.collateral_details?.rune_amount);
            setFiatValue(value);
            const remainingTime = await getRemainingTime(token?.loan_details?.loan_term_end_date)
            setremainingTime(remainingTime)
            const progresspecent = await getTimeProgressPercentage(token?.loan_details?.loan_term_end_date, token?.loan_details?.loan_term_days)
            console.log('LoanItemView', `progresspecent ${progresspecent}`)
            setProgressWidth(progresspecent)
            const runeDetails =await fetchRuneCollateral(token?.collateral_details?.rune_id,liquidiumToken )
           setRuneName(runeDetails?.slug)
        };
        fetchValue();
    }, [token]);

    return (
        <View style={styles.itemcontainer}>
            <View style={styles.header}>
                <View style={styles.headerTitel}>
                    <Image source={localAssets.btcliquidium} />
                    <Text style={styles.itemTitle}>
                        {runeName}
                    </Text>
                </View>
                <TouchableOpacity
                    style={[
                        styles.statusBadge,
                        { backgroundColor: statusColors[token?.loan_details?.state] },
                    ]}
                    onPress={() => {
                        push(RouteType.REPAY, { loanDetails: token });
                    }}>
                    <Text
                        style={[
                            styles.statusText,
                            { color: statusTextColors[token?.loan_details?.state] },
                        ]}>
                        {token?.loan_details?.state === 'ACTIVE'
                            ? 'Repay'
                            : token?.loan_details?.state}
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.subtext}>
                {`${token?.collateral_details?.rune_amount} • $${fiatValue} USD`}
            </Text>

            <View style={styles.timerConatiner}>
                <View style={styles.timerRow}>
                    <Text style={styles.timeLabel}>{strings.loanRepay}</Text>
                    <Text style={styles.timeValue}>
                        {remainingTime}
                    </Text>
                </View>
                <View style={styles.progressBarContainer}>
                    <View
                        style={[
                            styles.progressBar,
                            {
                                width: `${progressWidth}%`,
                                backgroundColor:
                                    token?.loan_details?.state === 'ACTIVE'
                                        ? Color.successgreen
                                        : Color.progressRepay,
                            },
                        ]} />
                </View>
            </View>
            <View style={styles.itemSaperator} />
        </View>
    );
};
export default LoanItemView;