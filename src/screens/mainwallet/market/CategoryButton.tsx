/**
 * @deprecated This component has been deprecated as the Market tab is no longer used.
 * The component is kept for reference purposes only. Do not use this component in new code.
 * @since Deprecated in 2025
 */

import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

/**
 * @deprecated This component has been deprecated. Do not use in new code.
 */
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
