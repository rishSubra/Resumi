import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

type ImageData = {
  uri: string;
};

const MemoriesScreen: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.assets) {
      // @ts-ignore
      setImages(prevImages => [...prevImages, {uri: result.assets[0].uri}]);
    }
  };

  const deleteImage = () => {
    setImages(prevImages =>
      prevImages.filter((_, i) => i !== selectedImageIndex),
    );
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedImageIndex(index);
              setIsModalVisible(true);
            }}>
            <Image source={{uri: item.uri}} style={styles.image} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3} // Set the number of columns for the grid
      />
      <TouchableOpacity style={styles.addButton} onPress={pickImage}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}>
        <ScrollView
          ref={scrollRef}
          pagingEnabled
          onLayout={() =>
            scrollRef.current?.scrollTo({
              y: selectedImageIndex! * Dimensions.get('window').height,
            })
          }>
          {images.map((image, index) => (
            <View
              key={index}
              style={{
                width: '100%',
                height: Dimensions.get('window').height,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: image.uri}}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setIsModalVisible(false)}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={deleteImage}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  image: {
    width: 130, // Divide the width by the number of columns
    aspectRatio: 1, // To make the image square
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  deleteButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default MemoriesScreen;
