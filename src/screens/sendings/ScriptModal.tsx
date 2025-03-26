import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { styles } from "./styles";

const ScriptModal = ({ visible, scripts, onClose }) => {
    return (
        <Modal 
            isVisible={visible} 
            onBackdropPress={onClose} 
            style={styles.modal}
            swipeDirection="down"
            onSwipeComplete={onClose}>
            <View style={styles.modalContent}>
                <View style={styles.dragIndicator} />
                <Text style={styles.modalTitle}>Script output #1</Text>
                <FlatList
                    data={scripts}
                    keyExtractor={(script, index) => index.toString()}
                    renderItem={({ item }) => <Text style={styles.scriptText}>{item}</Text>}
                />
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default ScriptModal;
