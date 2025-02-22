
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

const CategoryButton = ({ category, selectedCategory, onSelectCategory }) => (
  <TouchableOpacity
    key={category}
    onPress={() => onSelectCategory(category)}
    style={[
      styles.categoryButton,
      selectedCategory === category && styles.selectedCategory,
    ]}
  >
    <Text
      style={[
        styles.categoryText,
        selectedCategory === category && styles.selectedCategoryText,
      ]}
    >
      {category}
    </Text>
  </TouchableOpacity>
);

export default CategoryButton;
