import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  Platform,
  Alert,
  Image,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { API_CONFIG } from '../../constants/api';

// Declaração de tipo para global
declare const global: any;

// Paleta de cores baseada na imagem
const COLORS = {
  background: '#000000',
  gold: '#D4AF37',
  inputBg: '#967A3A', // Um dourado mais escuro/amarronzado para a caixa de texto
  white: '#FFFFFF',
  textPlaceholder: '#E0E0E0'
};

export default function CreatePostScreen() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [location, setLocation] = useState<{ address: string; latitude: number; longitude: number } | null>(null);

  const handleGetLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão', 'Você precisa permitir acesso à localização');
        return;
      }

      Alert.alert('Obtendo localização', 'Por favor aguarde...');
      const currentLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      
      // Tenta obter endereço a partir de coordenadas
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      const address = reverseGeocode[0]
        ? `${reverseGeocode[0].name || ''}, ${reverseGeocode[0].city || ''}`
        : 'Localização obtida';

      setLocation({
        address: address.trim(),
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      Alert.alert('Sucesso', `Localização: ${address}`);
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      Alert.alert('Erro', 'Não foi possível obter a localização');
    }
  };

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert('Permissão', 'Você precisa permitir acesso à galeria');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const convertImageToBase64 = async (uri: string): Promise<string> => {
    try {
      console.log('URI da imagem:', uri);
      
      // Verificar se a URI é válida
      if (!uri || typeof uri !== 'string') {
        throw new Error('URI da imagem inválida');
      }
      
      // Para React Native, usar uma abordagem diferente
      const response = await fetch(uri);
      
      if (!response.ok) {
        throw new Error(`Falha ao buscar imagem: ${response.status}`);
      }
      
      const blob = await response.blob();
      console.log('Blob criado, tamanho:', blob.size);
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            console.log('Conversão para base64 concluída');
            resolve(reader.result);
          } else {
            reject(new Error('Falha ao converter imagem para base64'));
          }
        };
        reader.onerror = () => reject(new Error('Erro no FileReader'));
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Erro na conversão da imagem:', error);
      throw error;
    }
  };

  const handlePost = async () => {
    if (!text.trim()) {
      Alert.alert('Erro', 'Digite algo para postar');
      return;
    }
    if (!global.token) {
      Alert.alert('Erro', 'Você precisa estar logado');
      return;
    }
    setLoading(true);
    
    try {
      let imageBase64 = null;
      if (selectedImage) {
        console.log('Convertendo imagem para base64...');
        imageBase64 = await convertImageToBase64(selectedImage);
        console.log('Imagem convertida com sucesso, tamanho:', imageBase64.length);
      }

      console.log('Enviando postagem para API...');
      const response = await fetch(`${API_CONFIG.BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${global.token}`,
        },
        body: JSON.stringify({
          description: text,
          image: imageBase64,
          location: location,
        }),
      });
      
      console.log('Status da resposta:', response.status);
      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = { error: responseText };
      }
      console.log('Dados da resposta:', data);
      
      if (response.ok) {
        Alert.alert('Sucesso', 'Postagem criada!');
        setText('');
        setSelectedImage(null);
        setLocation(null);
        router.back();
      } else {
        Alert.alert('Erro', data.error || `Erro ao criar postagem (status ${response.status})`);
      }
    } catch (error: any) {
      console.error('Erro completo:', error);
      Alert.alert('Erro', 'Erro ao criar postagem: ' + (error?.message || 'Erro desconhecido'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* --- CABEÇALHO PERSONALIZADO --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={COLORS.gold} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>POSTAGEM</Text>
        
        {/* View vazia para equilibrar o layout e deixar o título centralizado */}
        <View style={{ width: 28 }} />
      </View>

      {/* Linha Dourada abaixo do cabeçalho */}
      <View style={styles.separator} />

      {/* --- ÁREA DE CONTEÚDO COM ROLAGEM --- */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Caixa de Texto Grande */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="What do you want to tell to everyone?"
            placeholderTextColor={COLORS.textPlaceholder}
            multiline
            textAlignVertical="top" // Importante para o texto começar em cima no Android
            value={text}
            onChangeText={setText}
          />
        </View>

        {/* Preview da Imagem */}
        {selectedImage && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
            <TouchableOpacity 
              style={styles.removeImageButton}
              onPress={() => setSelectedImage(null)}
            >
              <Ionicons name="close-circle" size={32} color={COLORS.gold} />
            </TouchableOpacity>
          </View>
        )}

        {/* Exibir localização selecionada */}
        {location && (
          <View style={styles.locationDisplay}>
            <View style={styles.locationContent}>
              <Ionicons name="location" size={20} color={COLORS.gold} />
              <Text style={styles.locationText}>{location.address}</Text>
            </View>
            <TouchableOpacity onPress={() => setLocation(null)}>
              <Ionicons name="close" size={20} color={COLORS.gold} />
            </TouchableOpacity>
          </View>
        )}

        {/* --- BARRA DE AÇÕES --- */}
        <View style={styles.actionRow}>
          {/* Ícones (Câmera e Localização) */}
          <View style={styles.iconGroup}>
            <TouchableOpacity style={styles.iconButton} onPress={handlePickImage}>
              <Ionicons name="image-outline" size={28} color={COLORS.white} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.iconButton} onPress={handleGetLocation}>
              <Ionicons name="location-outline" size={28} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* Botões (Post e Rascunho) */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.actionButton} onPress={handlePost} disabled={loading}>
              <Text style={styles.actionButtonText}>{loading ? 'POSTANDO...' : 'Post'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Rascunho</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? 30 : 0, // Ajuste para barra de status no Android
  },
  // Estilos do Cabeçalho
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: COLORS.gold,
    fontSize: 20,
    fontWeight: 'bold', // Tentei simular a fonte serifada da imagem
    letterSpacing: 1,
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif', // Tenta usar uma fonte serifada se disponível
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.gold,
    marginHorizontal: 0,
    opacity: 0.5,
  },
  // ScrollView e Conteúdo
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40, // Espaço extra no final para garantir que os botões sejam acessíveis
  },
  inputContainer: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 15,
    height: 300, // Altura fixa para parecer o "quadrado" da imagem
    padding: 15,
    marginBottom: 30,
  },
  textInput: {
    color: COLORS.white,
    fontSize: 16,
    flex: 1, // Ocupa todo o espaço do container
  },
  // Barra de botões
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 15, // Espaço entre os ícones
  },
  iconButton: {
    padding: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  imagePreviewContainer: {
    position: 'relative',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.inputBg,
  },
  imagePreview: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 2,
  },
  locationDisplay: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  locationText: {
    color: COLORS.white,
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
});