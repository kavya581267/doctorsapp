import Back from '@components/Back';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '@utils/colors';
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';

const staffData = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Doctor',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Font Desk',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Mike Wilson',
    role: 'Nurse',
    status: 'On Leave',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

const StaffDirectoryScreen = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const filteredStaff = staffData.filter((staff) =>
    staff.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderStaffCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
        <Text style={[styles.status, item.status === 'Active' ? styles.active : styles.onLeave]}>
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
      <View style={styles.container}>
        <View>
          <Back></Back>
          <TextInput
            placeholder="Search staff..."
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
          />
          <View style={styles.filters}>
            {['All Staff', 'Department ▼', 'Role ▼', 'Status ▼'].map((filter, index) => (
              <TouchableOpacity key={index} style={styles.filterButton}>
                <Text style={styles.filterText}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <FlatList
            data={filteredStaff}
            keyExtractor={(item) => item.id}
            renderItem={renderStaffCard}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={()=>navigation.navigate("StaffRegistrationScreen")}>
          <Text style={styles.addButtonText}>+ Add New Staff</Text>
        </TouchableOpacity>
      </View>
  );
};

export default StaffDirectoryScreen;

const { height } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent:"space-between"

  },
  searchInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 15,
    marginBottom: 12,
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: '#F2F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 6,
  },
  role: {
    color: '#7D7D7D',
    fontSize: 14,
  },
  status: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '500',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  active: {
    backgroundColor: '#E3FCE6',
    color: '#3BB54A',
  },
  onLeave: {
    backgroundColor: '#FFEFD4',
    color: '#D99100',
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
