import {StatusBar, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './views/Home';
import AccountStack from './views/Account';
import {
  DefaultTheme,
  NavigationContainer,
  StackActions,
} from '@react-navigation/native';
import NutritionScreen from './views/Nutrition';
import ExercisesScreen from './views/Exercises';
import {getHeaderTitle} from '@react-navigation/elements';
import Header from './components/header/Header';
import {ThemeProvider, useTheme} from './utils/ThemeContext';
import {useEffect, useState} from 'react';
import {getItem} from './utils/Storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {useFonts} from 'expo-font';
import LoginScreen from './views/LoginView';
import RegisterScreen from './views/Register';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

function AppNavigator({navigation}) {
  const {theme} = useTheme();

  // const [fontsLoaded] = useFonts({
  //   Roboto: require('./assets/fonts/RobotoMono-Regular.ttf'),
  //   'Roboto-Bold': require('./assets/fonts/RobotoMono-Bold.ttf'),
  //   'Roboto-ExtraLight': require('./assets/fonts/RobotoMono-ExtraLight.ttf'),
  //   'Roboto-Light': require('./assets/fonts/RobotoMono-Light.ttf'),
  //   'Roboto-Medium': require('./assets/fonts/RobotoMono-Medium.ttf'),
  //   'Roboto-SemiBold': require('./assets/fonts/RobotoMono-SemiBold.ttf'),
  //   'Roboto-Thin': require('./assets/fonts/RobotoMono-Thin.ttf'),
  // });

  useEffect(() => {
    async function getUser() {
      const user = await getItem('Authorization');
      if (!user) {
        setTimeout(() => {
          navigation.dispatch(StackActions.push('LoginScreen'));
        }, 1);
      }
    }

    getUser();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        header: ({navigation, route, options}) => {
          const title = getHeaderTitle(options, route.name);

          return <Header title={title} theme={theme} route={route.name} />;
        },
        tabBarLabel: ({focused}) => {
          const fontFamily = focused ? 'Roboto-Medium' : 'Roboto-Light';
          const fontSize = 10;
          const color = focused ? 'tomato' : 'gray';

          return (
            <Text style={{fontFamily, fontSize, color}}>
              {/* Display the tab label text */}
              {route.name}
            </Text>
          );
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Exercises') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name === 'Nutrition') {
            iconName = focused ? 'nutrition' : 'nutrition-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#333333' : 'white', // Change to your dark theme color
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Exercises" component={ExercisesScreen} />
      <Tab.Screen name="Nutrition" component={NutritionScreen} />
      <Tab.Screen name="Account" component={AccountStack} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    async function getTheme() {
      const theme = await getItem('theme');
      setTheme(theme);
    }

    getTheme();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {theme === 'dark' ? (
        <StatusBar barStyle="light-content" backgroundColor={'#2a2a2a'} />
      ) : (
        <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />
      )}
      <ThemeProvider setGlobalTheme={setTheme}>
        <NavigationContainer
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: theme === 'dark' ? '#1e1e1e' : '#f2f2f2',
            },
          }}>
          <Stack.Navigator
            screenOptions={({route}) => ({
              header: ({navigation, route, options}) => {
                return null;
              },
            })}>
            <Stack.Screen name="MainContent" component={AppNavigator} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
