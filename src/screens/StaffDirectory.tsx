import { Staff } from '@api/model/staff/Staff';
import { staffService } from '@api/staffService';
import Back from '@components/Back';
import { MdLogActivityIndicator } from '@components/MdLogActivityIndicator';
import { AuthContext } from '@context/AuthContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { COLORS } from '@utils/colors';
import { getAvatarName } from '@utils/utils';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ListRenderItem } from 'react-native';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Avatar } from 'react-native-paper';



const StaffDirectoryScreen = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const {loggedInUserContext} = useContext(AuthContext);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [backUp, setBackupStaff] = useState<Staff[]>([]);
  const [loading,setLoading] = useState(false)

  const fetchStaffLst = async () => {
    setLoading(true)
    try{
      const resp = await staffService.getClinicStaff(loggedInUserContext?.clinicDetails.id.toString());
      setStaff(resp)
      setBackupStaff(resp);
    }catch(error){
     
    }
    setLoading(false)
    
  }

  useFocusEffect(
    useCallback(() => {
      fetchStaffLst()
      setSearchText("")
    }, [loggedInUserContext?.clinicDetails.id])
  );


  useEffect(()=>{
      fetchStaffLst();
  },[])

  const filterStaff = (searchText) => {
    console.log(searchText);
    const filteredStaff = backUp.filter((staff) =>
      staff.firstName.toLowerCase().includes(searchText.toLowerCase()) || 
      staff.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      staff.phone.toLowerCase().includes(searchText.toLowerCase())   ||
      staff.email.toLowerCase().includes(searchText.toLowerCase())
   );
   const filteredNewStaff = filteredStaff.map(staff => ({ ...staff }));
   console.log(filteredNewStaff)
   setStaff(filteredNewStaff);
   setSearchText(searchText);
  }

  

  const renderStaffCard: ListRenderItem<Staff>  = ({item}) => (
    <TouchableOpacity style={styles.card}>
      <Avatar.Text size={60} label={getAvatarName(item?.firstName, item?.lastName)} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.firstName}</Text>
        <Text style={styles.role}>{item.roleName}</Text>
        <Text style={styles.role}>{item.phone}</Text>
      </View>
        <Text style={[styles.status, item.isActive ? styles.active : styles.onLeave]}>
          {item.isActive?"Active":"InActive"}
        </Text>
    </TouchableOpacity>
  );

  return (
      <View style={styles.container}>
        <View>
          <Back></Back>
          <TextInput
            placeholder="Search staff..."
            value={searchText}
            onChangeText={filterStaff}
            style={styles.searchInput}
          />
          <View style={styles.filters}>
            {['All Staff', 'Department ▼', 'Role ▼', 'Status ▼'].map((filter, index) => (
              <TouchableOpacity key={index} style={styles.filterButton}>
                <Text style={styles.filterText}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <FlatList<Staff>
            data={staff}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderStaffCard}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={()=>navigation.navigate("StaffRegistrationScreen")}>
          <Text style={styles.addButtonText}>+ Add New Staff</Text>
        </TouchableOpacity>
        <MdLogActivityIndicator loading={loading} />
      </View>
  );
};

export default StaffDirectoryScreen;

const { height, width } = Dimensions.get("window")


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
    width: width > 720 ? "40%" : "100%"
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
    paddingLeft:30
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
