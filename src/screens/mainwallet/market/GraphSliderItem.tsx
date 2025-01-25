import { strings } from '@strings/i18n';
import { Responsive } from '@utils/Responsive';
import { Color } from '@values/color';
import moment from 'moment';
import React from 'react';
import { Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { styles } from './styles';

const GraphSliderItem = ({ data }) => {
  const processedData = data.data.map((item) => ({
    value: item.y,
    label: moment(item.x).format('h:mm A'), 
  }));

  const maxValue = Math.max(...processedData.map((item) => item.value));
  const minValue = Math.min(...processedData.map((item) => item.value));

  console.log(`minValue ${minValue} maxValue ${maxValue}`)
  const filterTimeData = (data) => {
    const timeSet = new Set();
    
    data.forEach((entry) => {
      const date = new Date(entry.x); 
      let hour = date.getUTCHours();
      const period = hour >= 12 ? 'pm' : 'am';
      hour = hour % 12 || 12; 
       const formattedTime = `${hour}${period}`; 
      timeSet.add(formattedTime);
    });
    const timeArray = [...timeSet];
    return timeArray.slice(-9);  
  };
  
  const filteredTimeList = filterTimeData(data.data);
 
  return (
    <View style={styles.Graphcontainer}>
      <View style={styles.chartWrapper}>
        <LineChart
          data={processedData}
       
          initialSpacing={0}
          endSpacing={0}
          xAxisLabelsHeight={0}
          yAxisLabelWidth={0}
          color={Color.orangeButton}
          thickness={Responsive.size4}
          hideDataPoints
          isAnimated
          animateOnDataChange
          hideYAxisText
          hideRules
          adjustToWidth={true}
          backgroundColor={Color.black}
          yAxisOffset={minValue}
         
          yAxisColor="transparent"
          xAxisColor="transparent"
          areaChart
          startFillColor={Color.graphfill}
          endFillColor={Color.graphfill}
          disableScroll
        />
        
        <View style={styles.xAxisLabelsWrapper}>
          {filteredTimeList.map((label, index) => (
            <Text key={index} style={styles.xAxisLabel}>
              {label}
            </Text>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.title}>{data.name}</Text>
          <View style={styles.infoBadge}>
            <Text style={styles.infoText}>{strings.info}</Text>
          </View>
        </View>
        <View style={styles.overlayBalanceSection}>
          <Text style={styles.balanceText}>{data.value}</Text>
          <View style={styles.changeSection}>
            <Text style={styles.changeText}>{data.percent + '%'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GraphSliderItem;
