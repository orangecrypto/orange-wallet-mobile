import Loader from '@components/Loader';
import { strings } from '@strings/i18n';
import { Responsive } from '@utils/Responsive';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';
import useGraphData from '@hooks/useGraphData';
import useMarketData from '@hooks/useMarketData';
import CategoryButton from './CategoryButton';
import { categories, categoryMap } from './CategoryData';
import GraphSliderItem from './GraphSliderItem';
import RenderAssets from './RenderAssets';
import { styles } from './styles';

const Market = () => {
  const currency = 'USD';
  const count = '108';
  const interval = '5m';
  const id = '1';

  const [graphParams, setGraphParams] = useState({
    currency: currency,
    count: count,
    interval: interval,
    id: id
  });

  const { data: assetList, error, isLoading } = useMarketData({ currency });
  const { data: graphData, isLoading: loadingMarketData } = useGraphData(graphParams);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  console.log('Market', error)
  useEffect(() => {
    if (!isLoading && assetList) {
      setSelectedItem(assetList[0]);
      setGraphParams({
        currency: currency,
        count: count,
        interval: interval,
        id: assetList[0].id
      });

    }
  }, [isLoading, assetList]);

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

  const filteredCoinsArray =
    selectedCategory === 'All'
      ? assetList
      : assetList.filter((coin) => {
        const categoriesForCoin = Object.keys(categoryMap).filter((category) =>
          categoryMap[category].includes(coin.name) || categoryMap[category].includes(coin.symbol)
        );
        return categoriesForCoin.includes(selectedCategory);
      });

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setGraphParams({
      currency: currency,
      count: count,
      interval: interval,
      id: item.id
    });
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingBackground}>
          <Loader loading={isLoading} />
        </View>
      )}

      <FlatList
        data={graphDataList}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        horizontal
        pagingEnabled
        snapToInterval={screenWidth + 20}
        decelerationRate="fast"
        snapToAlignment="center"
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <View style={{ width: screenWidth }}>
            <GraphSliderItem data={item} loading = {loadingMarketData}/>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }} />
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
      </View>

      <View style={styles.contentArea}>
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory} />
          ))}
        </View>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{strings.name}</Text>
          <View style={styles.headerPriceContainer}>
            <Text style={styles.headerTitle}>{strings.price}</Text>
            <Text style={[styles.headerTitle, { marginLeft: Responsive.size10 }]}>{strings.onehr}</Text>
          </View>
        </View>

        <FlatList
          data={filteredCoinsArray}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <RenderAssets item={item} selectedItem={selectedItem} handleItemClick={handleItemClick} />}
          contentContainerStyle={styles.listContainer} />
      </View>
    </View>
  );
};

export default Market;
