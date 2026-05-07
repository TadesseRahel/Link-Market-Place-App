import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { saveListing } from '../../storage';

export default function AddListingScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [image, setImage] = useState<string | null>(null);

  const categories = ['Electronics', 'Clothing', 'Furniture', 'Books', 'Sports'];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!title || !price || !description) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newListing = {
      id: Date.now().toString(),
      title,
      price,
      category,
      image: image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200',
      seller: 'You',
      description,
    };

    await saveListing(newListing);

    Alert.alert('Success!', `"${title}" has been listed for ${price}`, [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sell an Item</Text>
        <Text style={styles.headerSubtitle}>What are you selling today?</Text>
      </View>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>📷 Tap to add photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Title *</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., iPhone 14 Pro"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Price *</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., $499"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Category *</Text>
      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryChip, category === cat && styles.categoryChipActive]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[styles.categoryText, category === cat && styles.categoryTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Description *</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe your item (condition, size, color, etc.)"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>List Item for Sale →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#e9ecef' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#2c3e50' },
  headerSubtitle: { fontSize: 14, color: '#7f8c8d', marginTop: 4 },
  imagePicker: { margin: 20, borderRadius: 12, backgroundColor: '#f8f9fa', borderWidth: 1, borderColor: '#e9ecef', borderStyle: 'dashed' },
  imagePlaceholder: { height: 200, justifyContent: 'center', alignItems: 'center' },
  imagePlaceholderText: { fontSize: 16, color: '#adb5bd' },
  previewImage: { width: '100%', height: 200 },
  label: { fontSize: 16, fontWeight: '600', color: '#2c3e50', marginHorizontal: 20, marginBottom: 8 },
  input: { backgroundColor: '#f8f9fa', borderRadius: 12, padding: 14, marginHorizontal: 20, marginBottom: 20, fontSize: 16, borderWidth: 1, borderColor: '#e9ecef' },
  textArea: { height: 100, textAlignVertical: 'top' },
  categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 20, marginBottom: 20 },
  categoryChip: { backgroundColor: '#f8f9fa', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 10, marginBottom: 10, borderWidth: 1, borderColor: '#e9ecef' },
  categoryChipActive: { backgroundColor: '#3498db', borderColor: '#3498db' },
  categoryText: { fontSize: 14, color: '#495057' },
  categoryTextActive: { color: '#fff' },
  submitButton: { backgroundColor: '#27ae60', marginHorizontal: 20, marginVertical: 30, paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
