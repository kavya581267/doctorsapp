import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#EEF3FD',
    borderRadius: 12,
    padding: 16,
    marginRight: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '30%',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  actionLabel: {
    marginTop: 8,
    fontSize: 13,
    textAlign: 'center',
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  viewAll: {
    color: '#2F80ED',
    fontSize: 14,
    fontWeight: '500',
  },
  apptCard: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  apptAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  apptName: {
    fontWeight: '600',
    fontSize: 16,
  },
  apptDesc: {
    color: '#777',
    fontSize: 13,
    marginTop: 2,
  },
  apptTime: {
    fontWeight: '500',
    fontSize: 14,
  },
  statusBadge: {
    marginTop: 4,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
  confirmed: {
    backgroundColor: '#E6F8ED',
    color: '#27AE60',
  },
  pending: {
    backgroundColor: '#FFF4E5',
    color: '#F2994A',
  },
  searchInput: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 15,
    marginBottom: 16,
  },
});