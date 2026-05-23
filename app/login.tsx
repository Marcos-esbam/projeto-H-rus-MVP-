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
  Alert,
} from 'react-native';
import CheckBox from 'expo-checkbox';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { API_CONFIG } from '../constants/api';


// Declaração de tipo para global
declare const global: any;

// --- Cores ---
const GOLD_COLOR = '#D4AF37';
const LIGHT_TEXT = '#EAEAEA';
const SECONDARY_TEXT = '#AAA';
const DARK_BG = '#000000';
const INPUT_BG = '#1A1A1A';
const INPUT_PLACEHOLDER = '#888';
const BUTTON_BG = '#FFFFFF';
const BUTTON_TEXT = '#000000';

// Variável global para armazenar o token (temporário, sem persistência)
if (typeof global !== 'undefined') {
  global.token = null;
}

const LoginScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 AQUI ESTÁ A NAVEGAÇÃO CORRETA PARA AS TABS
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        global.token = data.token;
        // Navegação para as tabs após login bem-sucedido
        router.replace('/(tabs)/home');
      } else {
        Alert.alert('Erro', data.error || 'Erro ao fazer login');
      }
    } catch {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.contentContainer}>

        {/* Logo */}
        <Image
        //   source={require('../assets/images/logo-horus')}
          style={styles.logo}
        />

        <Text style={styles.title}>BEM-VINDO</Text>
        <Text style={styles.subtitle}>Por favor insira seus dados</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Username or Email"
            placeholderTextColor={INPUT_PLACEHOLDER}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Campo de senha com ícone */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Password"
              placeholderTextColor={INPUT_PLACEHOLDER}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <MaterialCommunityIcons
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={24}
                color={INPUT_PLACEHOLDER}
              />
            </TouchableOpacity>
          </View>

          {/* Remember e esquecer senha */}
          <View style={styles.optionsRow}>
            <View style={styles.rememberMeContainer}>
              <CheckBox
                value={rememberMe}
                onValueChange={setRememberMe}
                color={rememberMe ? GOLD_COLOR : INPUT_PLACEHOLDER}
                style={styles.checkbox}
              />
              <Text style={styles.rememberMeText}>Remember Me</Text>
            </View>

            <Link href="/forgot-password" asChild>
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>
                  Esqueceu sua senha?
                </Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* Botão de Login */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
            <Text style={styles.loginButtonText}>{loading ? 'CARREGANDO...' : 'Log In'}</Text>
          </TouchableOpacity>

          {/* Link para Inscrição */}
          <View style={styles.signupSection}>
            <Text style={styles.signupText}>Não tem uma conta? </Text>
            <Link href="/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.signupLinkText}>Inscreva-se</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerText}></Text>
      </View>
    </SafeAreaView>
  );
};

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 24,
    backgroundColor: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: LIGHT_TEXT,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: SECONDARY_TEXT,
    textAlign: 'center',
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
    marginBottom: 16,
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 8,
    width: 18,
    height: 18,
  },
  rememberMeText: {
    color: SECONDARY_TEXT,
    fontSize: 14,
  },
  forgotPasswordText: {
    color: GOLD_COLOR,
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: BUTTON_BG,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: BUTTON_TEXT,
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  signupText: {
    color: SECONDARY_TEXT,
    fontSize: 14,
  },
  signupLinkText: {
    color: GOLD_COLOR,
    fontSize: 14,
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

export default LoginScreen;
