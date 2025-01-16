import { localAssets } from '@assets/assets';
import { Responsive } from '@utils/Responsive';
import { black, gray, orangeButton, orangeOpacityBg, white } from "@values/color";
import { Fonts } from '@values/fonts';
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { LineChart } from 'react-native-chart-kit';

const Market = () => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      {/* Graph Card */}
      <View style={styles.graphContainer}>
        {/* Top Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.title}>Market Cap</Text>
          <View style={styles.infoBadge}>
            <Text style={styles.infoText}>Info</Text>
          </View>
        </View>

        {/* Line Chart with Overlay Balance Section */}
        <View style={styles.chartWrapper}>
          <LineChart
            data={{
              labels: ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm'],
              datasets: [
                {
                  data: [450, 470, 460, 480, 520, 510, 530],
                },
              ],
            }}
            width={screenWidth - 60}
            height={Responsive.size150}
            withInnerLines={false}
            withDots={false}
            
            
            chartConfig={{
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(244, 81, 30, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              strokeWidth: 3,
              propsForBackgroundLines: {
                strokeWidth: 0,
              },
              propsForLabels: {
                fontSize: Responsive.size10,
              },
              formatYLabel: () => '', // Completely hide Y-axis labels
              propsForHorizontalLabels: {
                display: 'none', // Ensure no vertical labels are displayed
              },
              yLabelsOffset: -50,
            }}
            bezier
            style={styles.chart} />

          {/* Balance Section (Overlay) */}
          <View style={styles.overlayBalanceSection}>
            <Text style={styles.balanceText}>$524,478,026,925</Text>
            <View style={styles.changeSection}>
              <Image
                source={localAssets.downarrow} // Replace with your icon path
                style={styles.icon}
              />
              <Text style={styles.changeText}>2.43%</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black,
    alignItems: 'center',
  },
  graphContainer: {
    borderWidth: Responsive.size2,
    borderColor: gray,
    borderRadius: Responsive.size10,
    padding: Responsive.size12,
    width: Dimensions.get('window').width - 40,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: orangeButton,
    fontSize: Responsive.size16,
    fontFamily: Fonts.bold,
  },
  infoBadge: {
    backgroundColor: orangeOpacityBg,
    paddingHorizontal: Responsive.size8,
    paddingVertical: Responsive.size2,
    borderRadius: Responsive.size8,
  },
  infoText: {
    color: white,
    fontSize: Responsive.size10,
  },
  chartWrapper: {
    position: 'relative',
  },
  overlayBalanceSection: {
    position: 'absolute',
    top: Responsive.size20,
    left: Responsive.size16,
    zIndex: 1,
  },
  balanceText: {
    color: white,
    fontSize: Responsive.size18,
    fontFamily: Fonts.semibold,
  },
  changeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Responsive.size4,
  },
  icon: {
    width: Responsive.size16,
    height: Responsive.size16,
    marginRight: Responsive.size4,
    resizeMode: 'contain',
  },
  changeText: {
    color: white,
    fontSize: Responsive.size14,
  },
  chart: {
    marginTop: Responsive.size16,
    borderRadius: Responsive.size16,
  },
});

export default Market;
