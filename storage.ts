import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Listing {
  id: string;
  title: string;
  price: string;
  category: string;
  image: string;
  seller: string;
  description: string;
}

const LISTINGS_KEY = '@link_listings';

export const getListings = async (): Promise<Listing[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(LISTINGS_KEY);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }
    return [];
  } catch (error) {
    console.error('Error loading listings:', error);
    return [];
  }
};

export const saveListing = async (listing: Listing): Promise<void> => {
  try {
    const existingListings = await getListings();
    const updatedListings = [listing, ...existingListings];
    const jsonValue = JSON.stringify(updatedListings);
    await AsyncStorage.setItem(LISTINGS_KEY, jsonValue);
    console.log('Saved successfully! Total items:', updatedListings.length);
  } catch (error) {
    console.error('Error saving listing:', error);
  }
};

export const deleteListing = async (id: string): Promise<void> => {
  try {
    const existingListings = await getListings();
    const updatedListings = existingListings.filter(item => item.id !== id);
    const jsonValue = JSON.stringify(updatedListings);
    await AsyncStorage.setItem(LISTINGS_KEY, jsonValue);
    console.log('Deleted successfully!');
  } catch (error) {
    console.error('Error deleting listing:', error);
  }
};