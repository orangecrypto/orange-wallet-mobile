import Loader from '@components/Loader';
import { strings } from '@strings/i18n';
import { Responsive } from '@utils/Responsive';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import useMarketData from '../../../hooks/useMarketData';
import GraphSliderItem from './GraphSliderItem';
import RenderAssets from './RenderAssets';
import { styles } from './styles';
import useGraphData from '../../../hooks/useGraphData';

const Market = () => {
  const currency = 'USD';
  const count = '108'
  const interval = '5m'
  const id = '1'
  const [graphParams, setGraphParams] = useState({
    currency: currency,
    count: count,
    interval: interval,
    id: id
  });
  const { data: assetList, error, isLoading } = useMarketData({ currency });
  const { data: graphData } = useGraphData(graphParams);

  console.log(graphData?.chart)

  const [symbols, setSymbols] = useState(['All', 'BRC20', 'RUNES', 'Stacks']);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");


  useEffect(() => {
    if (!isLoading && assetList) {
      setSelectedItem(assetList[0]);
      setGraphParams({
        currency: currency,
        count: count,
        interval: interval,
        id: assetList[0].id
      })
    }
  }, [isLoading, assetList]);
  const xAxisLabels = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'];

  const [graphDataList, setGraphDataList] = useState([]);

  useEffect(() => {
    if (selectedItem && graphData) {
      const newGraphDataList = [
        {
          id: 1,
          name: 'Market Cap',
          value: selectedItem?.market_cap
            ? `$ ${selectedItem.market_cap.toFixed(2)}`
            : '$ 0',
          data: graphData.chart || [],
          percent: selectedItem?.percent_change_1h
            ? `${selectedItem.percent_change_1h.toFixed(2)}%`
            : '0%',
          xAxisLabels,
        },
        {
          id: 2,
          name: 'Trading Volume',
          value: selectedItem?.volume_24h
            ? `$ ${selectedItem.volume_24h.toFixed(2)}`
            : '$ 0',
          data: graphData.chart || [],
          percent: selectedItem?.volume_change_24h
            ? `${selectedItem.volume_change_24h.toFixed(2)}%`
            : '0%',
          xAxisLabels,
        },
      ];
      setGraphDataList(newGraphDataList);
    }
  }, [selectedItem, graphData]);


  const progressPercentage = (currentStep / graphDataList.length) * 100;
  const screenWidth = Dimensions.get('window').width - 10;
  const handleScroll = (event) => {
    const currentIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentStep(currentIndex + 1);
  };

  const filteredCryptoArray = selectedCategory === "All"
    ? assetList
    : assetList.filter((item) => item.symbol === selectedCategory);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setGraphParams({
      currency: currency,
      count: count,
      interval: interval,
      id: item.id
    })

    // setSelectedGraphData(generatedGraphData)
  };

  const renderCategory = (category) => (
    <TouchableOpacity
      key={category}
      onPress={() => setSelectedCategory(category)}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.selectedCategory]}>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === category && styles.selectedCategoryText]}>
        {category} {/* Fixed to render actual category */}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading && <Loader loading={isLoading} />} {/* Loader only shown when isLoading is true */}

      <FlatList
        data={graphDataList}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        horizontal
        pagingEnabled
        snapToInterval={screenWidth + 20} // Adjust interval to include spacing
        decelerationRate="fast" // Smooth scrolling experience
        snapToAlignment="center" // Align items to the center of the screen
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <View style={{ width: screenWidth }}>
            <GraphSliderItem data={item} />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
      </View>

      <View style={styles.contentArea}>
        <View style={styles.categoryContainer}>
          {symbols.map((category) => renderCategory(category))}
        </View>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{strings.name}</Text>
          <View style={styles.headerPriceContainer}>
            <Text style={styles.headerTitle}>{strings.price}</Text>
            <Text style={[styles.headerTitle, { marginLeft: Responsive.size10 }]}>{strings.onehr}</Text>
          </View>
        </View>

        <FlatList
          data={filteredCryptoArray}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <RenderAssets item={item} selectedItem={selectedItem} handleItemClick={handleItemClick} />}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

export default Market;
