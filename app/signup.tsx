import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { API_CONFIG } from '../constants/api';

// --- Definição das Cores (copiado do seu LoginScreen) ---
const GOLD_COLOR = '#D4AF37';
const LIGHT_TEXT = '#EAEAEA';
const SECONDARY_TEXT = '#AAA';
const DARK_BG = '#000000';
const INPUT_BG = '#1A1A1A';
const INPUT_PLACEHOLDER = '#888';
const BUTTON_BG = '#FFFFFF';
const BUTTON_TEXT = '#000000';

const SignUpScreen = () => {
  const router = useRouter();
  // States para os novos campos
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // States para visibilidade da senha
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Sucesso', 'Usuário registrado com sucesso');
        router.push('/login');
      } else {
        Alert.alert('Erro', data.error || 'Erro ao registrar');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao registrar');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* ScrollView permite que a tela role se o conteúdo for muito grande */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          {/* --- Logo --- */}
          <Image
            // IMPORTANTE: Adicione sua imagem do logo na pasta 'assets'
            // e descomente a linha abaixo.
            // source={require('../../assets/logo-horus.png')}
            style={styles.logo}
          />

          {/* --- Textos de Boas-Vindas --- */}
          <Text style={styles.preTitle}>OLÁ!</Text>
          <Text style={styles.title}>BEM-VINDO</Text>
          <Text style={styles.subtitle}>Let's create an account</Text>

          {/* --- Formulário --- */}
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={INPUT_PLACEHOLDER}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={INPUT_PLACEHOLDER}
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={INPUT_PLACEHOLDER}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

            {/* Container da Senha */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Password"
                placeholderTextColor={INPUT_PLACEHOLDER}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <MaterialCommunityIcons
                  name={isPasswordVisible ? 'eye-off' : 'eye'}
                  size={24}
                  color={INPUT_PLACEHOLDER}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.hintText}>
              Must contain a number and least of 6 characters
            </Text>

            {/* Container de Confirmar Senha */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Confirm Password"
                placeholderTextColor={INPUT_PLACEHOLDER}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!isConfirmPasswordVisible}
              />
              <TouchableOpacity
                onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              >
                <MaterialCommunityIcons
                  name={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
                  size={24}
                  color={INPUT_PLACEHOLDER}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.hintText}>
              Must contain a number and least of 6 characters
            </Text>

            {/* --- Botão de Sign Up --- */}
            <TouchableOpacity style={styles.actionButton} onPress={handleSignUp} disabled={loading}>
              <Text style={styles.actionButtonText}>{loading ? 'CARREGANDO...' : 'SIGN UP'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- Rodapé para Fazer Login --- */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Have an account? </Text>
          {/* O Link "href='/'" leva para a página inicial (app/index.js) */}
          <Link href="/" asChild>
            <TouchableOpacity>
              <Text style={styles.footerLinkText}>LOG IN</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  scrollContainer: {
    flexGrow: 1, // Garante que o scroll ocupe a altura
  },
  // --- MODIFICAÇÃO APLICADA AQUI ---
  contentContainer: {
    // flex: 1, // REMOVIDO - Isso estava empurrando o footer para fora
    justifyContent: 'flex-start', // ALTERADO - Para alinhar o conteúdo no topo
    paddingHorizontal: 24,
    paddingTop: 40, // Adiciona espaço no topo
    paddingBottom: 24, // Adiciona espaço no final, antes do footer
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 24,
    backgroundColor: '#333', // Placeholder
  },
  preTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: LIGHT_TEXT,
    textAlign: 'left',
    marginBottom: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: LIGHT_TEXT,
    textAlign: 'left',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: SECONDARY_TEXT,
    textAlign: 'left',
    marginBottom: 32,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: INPUT_BG,
    color: LIGHT_TEXT,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: INPUT_BG,
    borderRadius: 8,
    marginBottom: 8, // Diminuído para o hintText caber
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  inputPassword: {
    flex: 1,
    color: LIGHT_TEXT,
    paddingVertical: 14,
    fontSize: 16,
  },
  hintText: {
    fontSize: 12,
    color: SECONDARY_TEXT,
    marginBottom: 16,
    marginLeft: 4,
  },
  actionButton: {
    backgroundColor: BUTTON_BG,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16, // Adiciona espaço acima do botão
  },
  actionButtonText: {
    color: BUTTON_TEXT,
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    color: SECONDARY_TEXT,
    fontSize: 14,
  },
  footerLinkText: {
    color: GOLD_COLOR,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
