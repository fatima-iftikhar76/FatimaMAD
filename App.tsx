
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StatusBar,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';

// User data ka structure
type User = {
  fullName: string;
  email: string;
  password: string;
  dob: string;
  phone: string;
};

// Reusable Input Component
type InputFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
};

function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
}: InputFieldProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  );
}

// Reusable Button Component
type ButtonProps = {
  title: string;
  onPress: () => void;
};

function CustomButton({ title, onPress }: ButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

// Main App Component
function App() {
  // Screen management
  const [screen, setScreen] = useState<'signup' | 'login'>('signup');

  // Store multiple users
  const [users, setUsers] = useState<User[]>([]);

  // Signup fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup Function
  const handleSignup = () => {
    if (!fullName.trim() || !email.trim() || !password) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const newUser: User = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      dob: dob,
      phone: phone,
    };

    setUsers(currentUsers => [...currentUsers, newUser]);

    setLoginEmail(email.trim().toLowerCase());
    setLoginPassword('');

    setScreen('login');

    Alert.alert('Success', 'Registration successful!');
  };

  // Login Function
  const handleLogin = () => {
    const foundUser = users.find(
      user =>
        user.email === loginEmail.trim().toLowerCase() &&
        user.password === loginPassword
    );

    if (foundUser) {
      Alert.alert('Success', 'User login successfully');
    } else {
      Alert.alert('Error', 'User not found');
    }
  };

  // Conditional Rendering
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >

        {screen === 'signup' ? (

          // SIGN UP SCREEN
          <View style={styles.formContainer}>

            <Pressable onPress={() => Alert.alert('Welcome', 'Sign Up')}>
              <Text style={styles.backText}>‹</Text>
            </Pressable>

            <Text style={styles.title}>Sign up</Text>
            <Text style={styles.subtitle}>
              Create an account to continue
            </Text>

            <InputField
              label="Full Name"
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
            />

            <InputField
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <InputField
              label="Date of Birth"
              placeholder="DD/MM/YYYY"
              value={dob}
              onChangeText={setDob}
            />

            <InputField
              label="Phone Number"
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <InputField
  label="Set Password"
  placeholder="Enter your password"
  value={password}
  onChangeText={setPassword}
  secureTextEntry={true}
/>

            <CustomButton
              title="Register"
              onPress={handleSignup}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Already have an account?{' '}
              </Text>

              <Pressable onPress={() => setScreen('login')}>
                <Text style={styles.link}>Login</Text>
              </Pressable>
            </View>

          </View>

        ) : (

          // LOGIN SCREEN
          <View style={styles.formContainer}>

            <Text style={styles.logo}>🔹 Task Manager</Text>

            <Text style={styles.title}>Sign in to your Account</Text>

            <Text style={styles.subtitle}>
              Enter your email and password to log in
            </Text>

            <InputField
              label="Email"
              placeholder="Enter your email"
              value={loginEmail}
              onChangeText={setLoginEmail}
              keyboardType="email-address"
            />

            <InputField
              label="Password"
              placeholder="Enter your password"
              value={loginPassword}
              onChangeText={setLoginPassword}
              secureTextEntry
            />

            <Pressable
              style={styles.forgotContainer}
              onPress={() =>
                Alert.alert('Information', 'Please contact your administrator.')
              }
            >
              <Text style={styles.link}>Forgot Password?</Text>
            </Pressable>

            <CustomButton
              title="Log in"
              onPress={handleLogin}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Don't have an account?{' '}
              </Text>

              <Pressable onPress={() => setScreen('signup')}>
                <Text style={styles.link}>Sign Up</Text>
              </Pressable>
            </View>

          </View>

        )}

      </ScrollView>
    </View>
  );
}

// Styling
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 30,
  },

  formContainer: {
    paddingHorizontal: 28,
  },

  backText: {
    fontSize: 35,
    color: '#222222',
    marginBottom: 15,
  },

  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 35,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 30,
  },

  inputContainer: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 9,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#222222',
    backgroundColor: '#FFFFFF',
  },

  button: {
    height: 52,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  footerText: {
    color: '#777777',
    fontSize: 13,
  },

  link: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '600',
  },

  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 15,
  },

});

export default App;
