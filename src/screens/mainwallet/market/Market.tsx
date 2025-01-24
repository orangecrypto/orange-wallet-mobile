import { strings } from '@strings/i18n';
import { Responsive } from '@utils/Responsive';
import React, { useState } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import GraphSliderItem from './GraphSliderItem';
import RenderAssets from './RenderAssets';
import { styles } from './styles';
import useMarketData from './GetMarketData';

const Market = () => {

  const id = '1'; 
  const convert = 'USD'; 

  const { data, error, loading } = useMarketData({ id, convert });
  console.log('API call', data)
  console.log('ERROR', error)
  console.log('loading', loading)

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedGraphData, setSelectedGraphData] = useState([
    { value: 400, label: '9am' },
    { value: 420, label: '10am' },
    { value: 410, label: '11am' },
    { value: 430, label: '12pm' },
    { value: 450, label: '1pm' },
    { value: 440, label: '2pm' },
    { value: 470, label: '3pm' },
    { value: 460, label: '4pm' },
    { value: 490, label: '5pm' },
    { value: 480, label: '6pm' },
    { value: 500, label: '7pm' },
    { value: 530, label: '8pm' },
    { value: 520, label: '9pm' },
    { value: 550, label: '10pm' },
    { value: 540, label: '11pm' }
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "BRC20", "Runes", "Stacks"];

  const cryptoArray = [
    { id: 1, category: "BTC", name: "Bitcoin", quantity: "2.9841", value: "$140,298.12" },
    { id: 2, category: "BRC20", name: "Wrapped BTC", quantity: ".932", value: "$26,452.07" },
    { id: 3, category: "Stacks", name: "Stacks", quantity: "10", value: "$100.00" },
    { id: 4, category: "Runes", name: "Stacks", quantity: "10", value: "$100.00" },
  ];

  const xAxisLabels = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'];
  const screenWidth = Dimensions.get('window').width - 10;
  const graphDataList = [
    {
      id: Math.random(),
      name: 'Market Cap',
      value: '$132,143,546',
      data: selectedGraphData
      ,
      xAxisLabels,
    },
    {
      id: Math.random(),
      name: 'Trading Volume',
      value: '$22,109,654,314',
      data: selectedGraphData,
      xAxisLabels,
    },
  ];

  const progressPercentage = (currentStep / graphDataList.length) * 100;

  const handleScroll = (event) => {
    const screenWidth = Dimensions.get("window").width;
    const currentIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentStep(currentIndex + 1);
  };

  const filteredCryptoArray = selectedCategory === "All"
    ? cryptoArray
    : cryptoArray.filter((item) => item.category === selectedCategory);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    const generatedGraphData = Array.from({ length: 15 }, (_, index) => ({
      value: Math.floor(Math.random() * 200) + 400,
      label: `${9 + index > 12 ? (9 + index - 12) : 9 + index}${index >= 3 ? 'pm' : 'am'}`,
    }));
    setSelectedGraphData(generatedGraphData)
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
        {category}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={graphDataList}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <View style={{ width: screenWidth }}>
            <GraphSliderItem data={item} />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
      />
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
      </View>

      <View style={styles.contentArea}>
        <View style={styles.categoryContainer}>
          {categories.map((category) => renderCategory(category))}
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
          contentContainerStyle={styles.listContainer} />
      </View>
    </View>
  );
};

export default Market;
