import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  // Animation values
  const logoScale   = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textY       = useRef(new Animated.Value(30)).current;
  const tagOpacity  = useRef(new Animated.Value(0)).current;
  const dotOpacity1 = useRef(new Animated.Value(0)).current;
  const dotOpacity2 = useRef(new Animated.Value(0)).current;
  const dotOpacity3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Step 1 – logo pops in
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Step 2 – title & tagline slide up
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(textY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(tagOpacity, {
          toValue: 1,
          duration: 700,
          delay: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Step 3 – loading dots bounce in sequence
        const dot = (val: Animated.Value, delay: number) =>
          Animated.loop(
            Animated.sequence([
              Animated.delay(delay),
              Animated.timing(val, { toValue: 1, duration: 300, useNativeDriver: true }),
              Animated.timing(val, { toValue: 0.25, duration: 300, useNativeDriver: true }),
            ]),
            { iterations: 4 }
          );

        Animated.parallel([
          dot(dotOpacity1, 0),
          dot(dotOpacity2, 150),
          dot(dotOpacity3, 300),
        ]).start();

        // Step 4 – navigate to login after 2.6s
        const timer = setTimeout(() => {
          router.replace('/login');
        }, 2600);
        return () => clearTimeout(timer);
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Gradient-like layered background */}
      <View style={styles.bgTop} />
      <View style={styles.bgBottom} />

      {/* Decorative circles */}
      <View style={[styles.circle, styles.circleL]} />
      <View style={[styles.circle, styles.circleR]} />

      {/* Logo */}
      <Animated.View style={[styles.logoWrapper, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      {/* App name */}
      <Animated.Text style={[styles.appName, { opacity: textOpacity, transform: [{ translateY: textY }] }]}>
        LINK
      </Animated.Text>

      {/* Tagline */}
      <Animated.Text style={[styles.tagline, { opacity: tagOpacity, transform: [{ translateY: textY }] }]}>
        Marketplace
      </Animated.Text>

      {/* Loading dots */}
      <View style={styles.dotsRow}>
        <Animated.View style={[styles.dot, { opacity: dotOpacity1 }]} />
        <Animated.View style={[styles.dot, { opacity: dotOpacity2 }]} />
        <Animated.View style={[styles.dot, { opacity: dotOpacity3 }]} />
      </View>

      {/* Bottom slogan */}
      <Animated.Text style={[styles.slogan, { opacity: tagOpacity }]}>
        Buy. Sell. Connect.
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a2980',
    overflow: 'hidden',
  },

  /* Background gradient layers */
  bgTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: '#1a2980',
  },
  

  /* Decorative blurred circles */
  circle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.12,
    backgroundColor: '#fff',
  },
  

  logo: {
    width: '100%',
    height: '100%',
  },

  /* Text */
  appName: {
    fontSize: 52,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 10,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '300',
    color: '#a8d8ea',
    letterSpacing: 6,
    marginTop: 2,
    marginBottom: 44,
  },



  /* Slogan */
  slogan: {
    position: 'absolute',
    bottom: 42,
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 3,
    fontWeight: '400',
  },
});
