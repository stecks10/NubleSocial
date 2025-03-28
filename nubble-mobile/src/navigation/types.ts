import { NavigatorScreenParams } from '@react-navigation/native';

export type AppTabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  NewPostTab: undefined;
  NotificationsTab: undefined;
  ProfileTab: undefined;
};

export type AppStackParamList = {
  AppTabNavigator: NavigatorScreenParams<AppTabParamList>;
  PostDetails: { postId: number };
  UserProfile: { userId: number };
};

// Define all available screens in the app
export type AppScreens = keyof AppStackParamList | keyof AppTabParamList;