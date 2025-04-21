import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Keyboard } from "react-native";
import styles from "../styles/presentingComplaintsStyle";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-paper";
import { COLORS } from "@utils/colors";

export default function PresentingComplaints({ title, itemList = [] }) {
  const [searchText, setSearchText] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemListState, setItemListState] = useState(itemList);

  const addItem = (item) => {

    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }

    setSearchText("")
  };

  const addNewItem = () => {
    if (searchText && !itemListState.includes(searchText)) {
      setItemListState([...itemListState, searchText]); 
      addItem(searchText); 
    }
    setSearchText(""); 
  };

  const clearSearch = () =>{
    setSearchText("");
  }

  const removeComplaint = (item) => {
    setSelectedItems(selectedItems.filter((selected) => selected !== item));
  };
  const filteredItems = itemListState.filter((item) =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  return (

    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View style={styles.inputContainer}>
        <Icon name="search" size={18} color="gray" style={styles.icon} />
        <TextInput
          placeholder="Search Complaints"
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
        />
        <Button onPress={clearSearch}>X</Button>
      </View>


      {searchText.length > 0 && filteredItems.length > 0 && (
        <View style={styles.dropdown}>
          {filteredItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => addItem(item)}
            >
              <Text style={styles.dropdownText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {searchText.length > 0 && filteredItems.length === 0 && (
        <View style={[styles.dropdown, styles.flexrow]}>
          <Text style={styles.dropdownItem}>No results found</Text>
          <View> 
            <Button onPress={addNewItem}>Add</Button>
          </View>

        </View>
      )}

      <ScrollView contentContainerStyle={styles.complaintsBox}>
        {selectedItems.map((item, index) => (
          <View key={index} style={styles.selectedChip}>
            <Text style={styles.selectedText}>{item}</Text>
            <TouchableOpacity onPress={() => removeComplaint(item)}>
              <Icon name="close-circle" size={18} color="white" style={styles.removeIcon} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>

  );
}
