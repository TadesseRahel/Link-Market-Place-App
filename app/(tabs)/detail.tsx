import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deleteListing } from '../../storage';

export default function DetailScreen() {
  const router = useRouter();
  const { id, title, price, image, seller, category } = useLocalSearchParams();

  const handleContactSeller = () => {
    Alert.alert('Contact Seller', `Send message to ${seller} about ${title} for ${price}`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Send', onPress: () => Alert.alert('Message sent!', 'The seller will contact you soon.') }
    ]);
  };

  const handleBuyNow = () => {
    Alert.alert('Confirm Purchase', `Buy ${title} for ${price}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Confirm', onPress: () => Alert.alert('Purchase initiated!', 'Check your email for payment instructions.') }
    ]);
  };

  const handleDelete = async () => {
    Alert.alert('Delete Item', `Are you sure you want to delete "${title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Delete', 
        style: 'destructive',
        onPress: async () => {
          await deleteListing(id as string);
          Alert.alert('Deleted', 'Item has been removed', [
            { text: 'OK', onPress: () => router.replace('/home') }
          ]);
        }
      }
    ]);
  };

  const isUserItem = seller === 'You';

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: image as string }} style={styles.largeImage} />

      <View style={styles.content}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
        
        <View style={styles.divider} />

        <View style={styles.sellerSection}>
          <Text style={styles.sectionTitle}>Seller</Text>
          <View style={styles.sellerCard}>
            <View style={styles.sellerAvatar}>
              <Text style={styles.avatarText}>{(seller as string)?.charAt(0) || 'S'}</Text>
            </View>
            <View>
              <Text style={styles.sellerName}>{seller}</Text>
              <Text style={styles.memberSince}>Member since 2024</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            Excellent condition! {title} is available for immediate purchase. 
            Original packaging included. Free local pickup or shipping available.
            Message seller for more details or to schedule a viewing.
          </Text>
        </View>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.messageButton} onPress={handleContactSeller}>
          <Text style={styles.messageButtonText}>💬 Message Seller</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
          <Text style={styles.buyButtonText}>🛒 Buy Now - {price}</Text>
        </TouchableOpacity>

        {isUserItem && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>🗑️ Delete Listing</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  largeImage: {
    width: '100%',
    height: 400,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  category: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '600',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginVertical: 20,
  },
  sellerSection: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  sellerCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  memberSince: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 2,
  },
  descriptionSection: {
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  messageButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  messageButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buyButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
