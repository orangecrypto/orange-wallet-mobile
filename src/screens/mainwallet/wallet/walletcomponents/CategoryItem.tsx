import { Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";


const categoryItem = (category, selectedCategory, setSelectedCategory) => (
    <TouchableOpacity
        key={category}
        onPress={() => setSelectedCategory(category)}
        style={[
            styles.categoryButton,
            selectedCategory === category && styles.selectedCategory
        ]}>
        <Text
            style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText
            ]}>
            {category}
        </Text>
    </TouchableOpacity>
);

export default categoryItem;