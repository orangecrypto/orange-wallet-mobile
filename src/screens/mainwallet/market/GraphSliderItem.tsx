import React from 'react';
import { View, Text, Image } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { localAssets } from '@assets/assets';
import { strings } from '@strings/i18n';
import { Responsive } from '@utils/Responsive';
import { Color } from '@values/color';
import { styles } from './styles';

const GraphSliderItem = ({ data }) => {
  return (
    <View style={styles.Graphcontainer}>
      <View style={styles.infoSection}>
        <Text style={styles.title}>{data.name}</Text>
        <View style={styles.infoBadge}>
          <Text style={styles.infoText}>{strings.info}</Text>
        </View>
      </View>
      <View style={styles.chartWrapper}>
        <LineChart
          data={data.data}
          height={200}
          initialSpacing={0}
          endSpacing={0}
          color={Color.orangeButton}
          thickness={Responsive.size5}
          hideDataPoints
          isAnimated
          animateOnDataChange
          hideYAxisText
          hideRules
          adjustToWidth={true}
          backgroundColor="#000000"
          yAxisColor="transparent"
          xAxisColor="transparent"
          areaChart
          startFillColor={Color.graphfill}
          endFillColor={Color.graphfill}
          disableScroll
        />
        {/* Custom X-axis Labels */}
        <View style={styles.xAxisLabelsWrapper}>
          {data.xAxisLabels.map((label, index) => (
            <Text key={index} style={styles.xAxisLabel}>
              {label}
            </Text>
          ))}
        </View>
        <View style={styles.overlayBalanceSection}>
          <Text style={styles.balanceText}>{data.value}</Text>
          <View style={styles.changeSection}>
            <Image source={localAssets.downarrow} style={styles.icon} />
            <Text style={styles.changeText}>{'2.43%'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GraphSliderItem;
