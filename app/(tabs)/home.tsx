import { useFocusEffect, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getListings, Listing } from '../../storage';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [userListings, setUserListings] = useState<Listing[]>([]);
  const router = useRouter();

  const defaultListings: Listing[] = [
    // ELECTRONICS (16 items)
    { id: 'e1', title: 'iPhone 15 Pro', price: '$999', category: 'Electronics', image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=200', seller: 'TechStore', description: '' },
    { id: 'e2', title: 'MacBook Pro', price: '$1999', category: 'Electronics', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200', seller: 'AppleReseller', description: '' },
    { id: 'e3', title: 'Sony Headphones', price: '$349', category: 'Electronics', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200', seller: 'AudioGuru', description: '' },
    { id: 'e4', title: 'iPad Pro', price: '$1099', category: 'Electronics', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200', seller: 'TabletWorld', description: '' },
    { id: 'e5', title: 'Samsung Galaxy', price: '$899', category: 'Electronics', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200', seller: 'PhoneHub', description: '' },
    { id: 'e6', title: 'Apple Watch', price: '$399', category: 'Electronics', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200', seller: 'WearablesCo', description: '' },
    { id: 'e7', title: 'Canon Camera', price: '$999', category: 'Electronics', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200', seller: 'CameraWorld', description: '' },
    { id: 'e8', title: 'JBL Speaker', price: '$129', category: 'Electronics', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200', seller: 'AudioHub', description: '' },
    { id: 'e9', title: 'Dell XPS', price: '$1499', category: 'Electronics', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200', seller: 'PCGurus', description: '' },
    { id: 'e10', title: 'Nintendo Switch', price: '$299', category: 'Electronics', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=200', seller: 'GameStop', description: '' },
    { id: 'e11', title: 'AirPods Pro', price: '$249', category: 'Electronics', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=200', seller: 'AudioGuru', description: '' },
    { id: 'e12', title: 'PlayStation 5', price: '$499', category: 'Electronics', image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=200', seller: 'GameStop', description: '' },
    { id: 'e13', title: 'GoPro Hero', price: '$399', category: 'Electronics', image: 'https://images.unsplash.com/photo-1524143986875-3b098d78b363?w=200', seller: 'ActionCams', description: '' },
    { id: 'e14', title: 'LG OLED TV', price: '$1599', category: 'Electronics', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200', seller: 'TVWorld', description: '' },
    { id: 'e15', title: 'Logitech Mouse', price: '$99', category: 'Electronics', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200', seller: 'PCGear', description: '' },
    { id: 'e16', title: 'Xbox Series X', price: '$499', category: 'Electronics', image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=200', seller: 'GameStop', description: '' },

    // CLOTHING (18 items)
    { id: 'c1', title: 'Nike Air Max', price: '$120', category: 'Clothing', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200', seller: 'SneakerHead', description: '' },
    { id: 'c2', title: "Levi's Jeans", price: '$89', category: 'Clothing', image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=200', seller: 'DenimShop', description: '' },
    { id: 'c3', title: 'Red Evening Dress', price: '$199', category: 'Clothing', image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=200', seller: 'Glamour', description: '' },
    { id: 'c4', title: 'Red Silk Dress', price: '$149', category: 'Clothing', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=200', seller: 'LuxeFashion', description: '' },
    { id: 'c5', title: 'Adidas Ultraboost', price: '$180', category: 'Clothing', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=200', seller: 'RunShop', description: '' },
    { id: 'c6', title: 'Leather Jacket', price: '$200', category: 'Clothing', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200', seller: 'LeatherGoods', description: '' },
    { id: 'c7', title: 'Michael Kors Bag', price: '$250', category: 'Clothing', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200', seller: 'LuxuryBags', description: '' },
    { id: 'c8', title: 'Ray-Ban', price: '$150', category: 'Clothing', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200', seller: 'EyeWear', description: '' },
    { id: 'c9', title: 'Nike Tech Fleece', price: '$130', category: 'Clothing', image: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=200', seller: 'StreetWear', description: '' },
    { id: 'c10', title: 'Converse', price: '$65', category: 'Clothing', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=200', seller: 'ShoeShop', description: '' },
    { id: 'c11', title: 'Red Winter Coat', price: '$179', category: 'Clothing', image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=200', seller: 'WinterWear', description: '' },
    { id: 'c12', title: 'The North Face', price: '$199', category: 'Clothing', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200', seller: 'OutdoorGear', description: '' },
    { id: 'c13', title: 'Zara Trench', price: '$89', category: 'Clothing', image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=200', seller: 'FashionHub', description: '' },
    { id: 'c14', title: 'Gucci Belt', price: '$350', category: 'Clothing', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=200', seller: 'DesignerGoods', description: '' },
    { id: 'c15', title: 'Red Floral Dress', price: '$65', category: 'Clothing', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200', seller: 'SummerVibes', description: '' },
    { id: 'c16', title: 'Puma Sneakers', price: '$90', category: 'Clothing', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200', seller: 'SneakerHead', description: '' },
    { id: 'c17', title: 'Red Hoodie', price: '$55', category: 'Clothing', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200', seller: 'StreetStyle', description: '' },
    { id: 'c18', title: 'H&M Blazer', price: '$59', category: 'Clothing', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200', seller: 'OfficeWear', description: '' },

    // FURNITURE (14 items)
    { id: 'f1', title: 'L-Shaped Desk', price: '$250', category: 'Furniture', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200', seller: 'HomeOffice', description: '' },
    { id: 'f2', title: 'Grey Sofa', price: '$450', category: 'Furniture', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200', seller: 'LivingSpaces', description: '' },
    { id: 'f3', title: 'Queen Bed', price: '$320', category: 'Furniture', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200', seller: 'BedroomPro', description: '' },
    { id: 'f4', title: 'Dining Table', price: '$380', category: 'Furniture', image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=200', seller: 'DiningCo', description: '' },
    { id: 'f5', title: 'Office Chair', price: '$180', category: 'Furniture', image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=200', seller: 'ComfortSeat', description: '' },
    { id: 'f6', title: 'Bookshelf', price: '$120', category: 'Furniture', image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=200', seller: 'OrganizeMe', description: '' },
    { id: 'f7', title: 'Leather Recliner', price: '$399', category: 'Furniture', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=200', seller: 'RelaxZone', description: '' },
    { id: 'f8', title: 'Nightstand', price: '$89', category: 'Furniture', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200', seller: 'BedroomSet', description: '' },
    { id: 'f9', title: 'Coffee Table', price: '$149', category: 'Furniture', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=200', seller: 'LivingRoom', description: '' },
    { id: 'f10', title: 'TV Stand', price: '$99', category: 'Furniture', image: 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=200', seller: 'Entertainment', description: '' },
    { id: 'f11', title: 'Bar Stools', price: '$149', category: 'Furniture', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200', seller: 'KitchenGear', description: '' },
    { id: 'f12', title: 'Accent Chair', price: '$199', category: 'Furniture', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200', seller: 'LuxuryLiving', description: '' },
    { id: 'f13', title: 'Bean Bag', price: '$59', category: 'Furniture', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200', seller: 'RelaxZone', description: '' },
    { id: 'f14', title: 'Wardrobe', price: '$349', category: 'Furniture', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200', seller: 'ClosetOrg', description: '' },

    // BOOKS (12 items)
    { id: 'b1', title: 'Atomic Habits', price: '$18', category: 'Books', image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=200', seller: 'BookNook', description: '' },
    { id: 'b2', title: 'Psychology of Money', price: '$15', category: 'Books', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200', seller: 'FinanceReads', description: '' },
    { id: 'b3', title: 'The Hobbit', price: '$14', category: 'Books', image: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=200', seller: 'FantasyWorld', description: '' },
    { id: 'b4', title: 'Deep Work', price: '$14', category: 'Books', image: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=200', seller: 'Productivity', description: '' },
    { id: 'b5', title: 'The Alchemist', price: '$12', category: 'Books', image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200', seller: 'ClassicReads', description: '' },
    { id: 'b6', title: 'Rich Dad Poor Dad', price: '$10', category: 'Books', image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=200', seller: 'MoneyMatters', description: '' },
    { id: 'b7', title: 'Dune', price: '$17', category: 'Books', image: 'https://images.unsplash.com/photo-1614544048536-0d28caf77f41?w=200', seller: 'SciFiHub', description: '' },
    { id: 'b8', title: '1984', price: '$11', category: 'Books', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200', seller: 'ClassicLit', description: '' },
    { id: 'b9', title: 'The Subtle Art', price: '$16', category: 'Books', image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=200', seller: 'SelfHelp', description: '' },
    { id: 'b10', title: 'Educated', price: '$13', category: 'Books', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200', seller: 'MemoirBooks', description: '' },
    { id: 'b11', title: 'Harry Potter', price: '$65', category: 'Books', image: 'https://images.unsplash.com/photo-1600189261867-30e5ffe7ac8a?w=200', seller: 'FantasyBooks', description: '' },
    { id: 'b12', title: 'Sapiens', price: '$19', category: 'Books', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200', seller: 'HistoryBooks', description: '' },

    // SPORTS (12 items)
    { id: 's1', title: 'Basketball', price: '$30', category: 'Sports', image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=200', seller: 'HoopsShop', description: '' },
    { id: 's2', title: 'Yoga Mat', price: '$25', category: 'Sports', image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=200', seller: 'ZenFitness', description: '' },
    { id: 's3', title: 'Dumbbell Set', price: '$75', category: 'Sports', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=200', seller: 'GymGear', description: '' },
    { id: 's4', title: 'Soccer Ball', price: '$28', category: 'Sports', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200', seller: 'KickIt', description: '' },
    { id: 's5', title: 'Golf Clubs', price: '$299', category: 'Sports', image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=200', seller: 'GolfPro', description: '' },
    { id: 's6', title: 'Camping Tent', price: '$99', category: 'Sports', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=200', seller: 'OutdoorGear', description: '' },
    { id: 's7', title: 'Fitness Tracker', price: '$49', category: 'Sports', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=200', seller: 'WearableTech', description: '' },
    { id: 's8', title: 'Boxing Gloves', price: '$59', category: 'Sports', image: 'https://images.unsplash.com/photo-1552074284-5e88ef1b3cda?w=200', seller: 'CombatSports', description: '' },
    { id: 's9', title: 'Weight Bench', price: '$149', category: 'Sports', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=200', seller: 'GymGear', description: '' },
    { id: 's10', title: 'Tennis Racket', price: '$65', category: 'Sports', image: 'https://images.unsplash.com/photo-1622279457486-62dcc4c4cfb4?w=200', seller: 'CourtSports', description: '' },
    { id: 's11', title: 'Running Shoes', price: '$110', category: 'Sports', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200', seller: 'RunFast', description: '' },
    { id: 's12', title: 'Skateboard', price: '$85', category: 'Sports', image: 'https://images.unsplash.com/photo-1572776685606-6cd89daa2f2b?w=200', seller: 'SkateShop', description: '' },
  ];

  const loadUserListings = async () => {
    const saved = await getListings();
    setUserListings(saved);
  };

  useEffect(() => {
    loadUserListings();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadUserListings();
    }, [])
  );

  const allItems = [...defaultListings, ...userListings];
  const filteredListings = selectedCategory === 'All' 
    ? allItems 
    : allItems.filter(item => item.category === selectedCategory);

  const categories = ['All', 'Electronics', 'Clothing', 'Furniture', 'Books', 'Sports'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>LINK Marketplace</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/add')}>
          <Text style={styles.addButtonText}>+ Sell</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((cat, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.categoryChip, 
              selectedCategory === cat && styles.categoryChipActive
            ]} 
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[
              styles.categoryText, 
              selectedCategory === cat && styles.categoryTextActive
            ]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.resultCount}>{filteredListings.length} items found</Text>

      <FlatList
        data={filteredListings}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: '/detail', params: { id: item.id, title: item.title, price: item.price, image: item.image, seller: item.seller, category: item.category } })}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.seller}>{item.seller}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e9ecef' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50' },
  addButton: { backgroundColor: '#3498db', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  addButtonText: { color: '#fff', fontWeight: '600' },
  categoriesContainer: { backgroundColor: '#fff', paddingVertical: 12 },
  categoriesContent: { paddingHorizontal: 16 },
  categoryChip: { backgroundColor: '#e9ecef', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 30, marginRight: 12 },
  categoryChipActive: { backgroundColor: '#3498db' },
  categoryText: { fontSize: 15, color: '#495057', fontWeight: '600' },
  categoryTextActive: { color: '#fff' },
  resultCount: { paddingHorizontal: 16, paddingVertical: 8, fontSize: 12, color: '#7f8c8d' },
  row: { justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, width: '48%', overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  image: { width: '100%', height: 150, backgroundColor: '#ddd' },
  cardContent: { padding: 12 },
  itemTitle: { fontSize: 14, fontWeight: '600', color: '#2c3e50', marginBottom: 4 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#27ae60', marginBottom: 4 },
  seller: { fontSize: 11, color: '#7f8c8d' },
});
