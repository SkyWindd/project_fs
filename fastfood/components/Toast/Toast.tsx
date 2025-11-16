import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { Animated, Text, View } from "react-native";

interface ToastContextType {
  show: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  return useContext(ToastContext)!;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [msg, setMsg] = useState("");

  // 🆕 Fix: không tạo Animated.Value nhiều lần
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  const show = useCallback((text: string) => {
    setMsg(text);

    // Reset animation vị trí
    translateY.setValue(20);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(2000),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 20,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}

      {/* Toast Overlay */}
      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 120,
          left: 0,
          right: 0,
          opacity,
          transform: [{ translateY }],
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.85)",
            paddingHorizontal: 18,
            paddingVertical: 12,
            borderRadius: 14,
            maxWidth: "80%",
            shadowColor: "#000",
            shadowOpacity: 0.35,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
          }}
        >
          <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
            {msg}
          </Text>
        </View>
      </Animated.View>
    </ToastContext.Provider>
  );
}
