import { StyleSheet } from 'react-native';
import colors from './colors';

export const global = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: colors.lightGrey,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 16,
  },
});
