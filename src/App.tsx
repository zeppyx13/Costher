import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import messaging from "@react-native-firebase/messaging";

// Screens
import HomeScreen from "./screen/HomeScreen";
import RoomsScreen from "./screen/RoomScreen";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import ForgotPasswordScreen from "./screen/ForgotScreen";
import DashboardScreen from "./screen/dashboard/DashboardScreen";
import PaymentScreen from "./screen/dashboard/PaymentScreen";
import DetailRoomScreen from "./screen/DetailRoomScreen";
import UserProfileScreen from "./screen/dashboard/ProfileScreen";
import EditProfileScreen from "./screen/EditProfileScreen";
import MidtransProcessing from "./screen/dashboard/MidtransProcessing";
import DeleteAccountScreen from "./screen/DeleteAccountScreen";
import ComplaintScreen from "./components/Dashboard/ComplaintScreen";
import InvoiceHistoryScreen from "./components/Dashboard/InvoiceHistoryScreen";
import ReviewScreen from "./components/Dashboard/ReviewScreen";
import AnnouncementScreen from "./components/Dashboard/AnnouncementScreen";
import AIInsightScreen from "./screen/dashboard/AIInsightScreen";
import MeterReadingsScreen from "./screen/dashboard/MeterReadingsScreen";
import LeaseInfoScreen from "./screen/dashboard/LeaseInfoScreen";

import {
  requestNotificationPermission,
  getFCMToken,
  registerFCMToken,
  setupForegroundNotification,
} from "./lib/notification";
import { api } from "./lib/api";

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    (async () => {
      const granted = await requestNotificationPermission();
      if (!granted) return;

      const token = await getFCMToken();
      if (token) await registerFCMToken(api, token);

      messaging().onTokenRefresh(async (newToken) => {
        await registerFCMToken(api, newToken);
      });
    })();

    const unsubscribeForeground = setupForegroundNotification();

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log("[FCM] Opened from background:", remoteMessage.data);
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log("[FCM] Opened from quit:", remoteMessage.data);
        }
      });

    return () => {
      unsubscribeForeground();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Room" component={RoomsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: true }} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: true }} />
          <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: true }} />
          <Stack.Screen name="MidtransProcessing" component={MidtransProcessing} options={{ headerShown: false }} />
          <Stack.Screen name="DetailRoom" component={DetailRoomScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={UserProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AIInsight" component={AIInsightScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Complaint" component={ComplaintScreen} options={{ headerShown: false }} />
          <Stack.Screen name="InvoiceHistory" component={InvoiceHistoryScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Review" component={ReviewScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Announcement" component={AnnouncementScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MeterReadings" component={MeterReadingsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LeaseInfo" component={LeaseInfoScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;