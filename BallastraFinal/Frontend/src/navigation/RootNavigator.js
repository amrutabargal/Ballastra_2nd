
import React from 'react';
import { View } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
/* Screens */
import Logoscreen from '../screens/Logoscreen';
import signin_up from '../screens/signin_up';
import Loginscreen from '../screens/Loginscreen';
import CreateAccount from '../screens/CreateAccount';
import GoogleLogin from '../screens/GoogleLogin';
import VerifyOtpScreen from '../screens/VerifyOtpScreen';
import Login_Successful from '../screens/Login_Successful'; 
import Password_Successful from '../screens/Password_Successful';
import HomeScreen from '../screens/HomeScreen';
import CreateBlipsScreen from '../screens/CreateBlipsScreen';
import Blips_History from '../screens/Blips_History';
import Create_Nexus from '../screens/Create_Nexus';
import My_Own_Nexus from '../screens/My_Own_Nexus';
import Build_Your_Nexus from '../screens/Build_Your_Nexus';
import Share_Profile from '../screens/Share_Profile';
import CommunityDetails from '../screens/CommunityDetails';
import Press_Space_Creation_Flow from '../screens/Press_Space_Creation_Flow';
import Start_a_Space from '../screens/Start_a_Space';
import create_Category from '../screens/create_Category';
import Space_Settings from '../screens/Space_Settings';
import SpacePermissionsScreen from '../screens/Space_Permissions';
import Nexus_Setting from '../screens/Nexus_Setting';
import Nexus_Setting_Overview from '../screens/Nexus_Setting_Overview';
import Nexus_Setting_Spaces from '../screens/Nexus_Setting_Spaces';
import Nexus_Setting_Categories from '../screens/Nexus_Setting_Categories';
import Setting_category_create_category from '../screens/Setting_category_create_category';
import Nexus_Setting_Members from '../screens/Nexus_Setting_Members';
import Nexus_Setting_Invites from '../screens/Nexus_Setting_Invites';
import Nexus_Setting_Moderation from '../screens/Nexus_Setting_Moderation';
import Activity_History from '../screens/Activity_History';
import Nexus_Setting_Security from '../screens/Nexus_Setting_Security';
import Nexus_Setting_Emoji from '../screens/Nexus_Setting_Emoji';
import Nexus_Setting_Stickers from '../screens/Nexus_Setting_Stickers';
import NexusCommunity from '../screens/NexusCommunity';
import NexusManagement from '../screens/NexusManagement';









import ChannelScreen from '../screens/ChannelScreen';
import ChatScreen from '../screens/ChatScreen';

import Setting_category_create_Space from '../screens/Setting_category_create_Space';

import EditMemberScreen from '../screens/EditMemberScreen';
import Timeout from '../screens/Timeout';
import Kick from '../screens/Kick';
import Ban from '../screens/Ban';
import TransferOwnershipScreen from '../screens/Transfer_Ownership';
import FilterUser from '../screens/FilterUser';
import FilterAction from '../screens/FilterAction';
import Nexuschat from '../screens/Nexuschat';
import MediaViewer from '../screens/MediaViewer';
import VoiceCallScreen from '../screens/VoiceCallScreen';
import VideoCallScreen from '../screens/VideoCallScreen';
import IncomingCallScreen from '../screens/IncomingCallScreen';
import ForwardScreen from '../screens/ForwardScreen';
import ReportScreen from '../screens/ReportScreen';

// Report detail screens
import Nudity_or_sexual_activity from '../screens/Nudity_or_sexual_activity';
import Hate_speech_or_symbols from '../screens/Hate_speech_or_symbols';
import Scam_or_fraud from '../screens/Scam_or_fraud';
import Violence_or_dangerous_organisations from '../screens/Violence_or_dangerous_organisations';
import Sale_of_illegal_or_regulated_goods from '../screens/Sale_of_illegal_or_regulated_goods';
import Bullying_or_harassment from '../screens/Bullying_or_harassment';
import Terrorism from '../screens/Terrorism';
import Human_trafficking from '../screens/Human_trafficking';
import Violent_or_graphic_content from '../screens/Violent_or_graphic_content';
import Organized_crime from '../screens/Organized_crime';
import Sale_popup from '../screens/Sale_popup';
import Bullying_or_harassment_popup from '../screens/Bullying_or_harassment_popup';
import Intellectual_property_violation from '../screens/Intellectual_property_violation';
import Suicide_self_injury_or_eating_disorder from '../screens/Suicide_self_injury_or_eating_disorder';
import Suicide_or_self_injury from '../screens/Suicide_or_self_injury';
import Eating_disorder from '../screens/Eating_disorder';
import Spam from '../screens/Spam';
import Problem_not_listed from '../screens/Problem_not_listed';
import Report_as_unlawful from '../screens/Report_as_unlawful';
import Defamation from '../screens/Defamation';
import Content from '../screens/Content';
import Done from '../screens/Done';
import NotificationsScreen from '../screens/NotificationsScreen';
import Notification_popup from '../screens/Notification_popup';
import ProfileScreen from '../screens/ProfileScreen';
import Header_media from '../screens/Header_media';
import Call_friends_invites from '../screens/Call_friends_invites';
import Member_Setting from '../screens/Member_Setting';
import Voice_Setting from '../screens/Voice_Setting';
import Vedio_Setting from '../screens/Vedio_Setting';
import Name_Click_Settings from '../screens/Name_Click_Settings';
import New_Share from '../screens/New_Share';
import Header_media_memeberprofile from '../screens/Header_media_memeberprofile';
import HEaderMediachat from '../screens/HEaderMediachat';
import Scanershare from '../screens/Scanershare';
import SearchScreen from '../screens/Search';

/* Footer Component */
import Footer from '../components/Footer';

const Stack = createStackNavigator();

const withFooter = (ScreenComponent) => {
  return (props) => (
    <View style={{ flex: 1 }}>
      <ScreenComponent {...props} />
      <Footer />
    </View>
  );
};

/* Screens that need footer */
const HomeWithFooter = withFooter(HomeScreen);
const ChatWithFooter = withFooter(ChatScreen);
const CommunityWithFooter = withFooter(CommunityDetails);
const NexuschatWithFooter = withFooter(Nexuschat);
const NotificationsScreenWithFooter = withFooter(NotificationsScreen);
const ProfileWithFooter = withFooter(ProfileScreen);

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      {/* onboarding / auth */}
      <Stack.Screen name="Logoscreen" component={Logoscreen} />
      <Stack.Screen name="signin_up" component={signin_up} />
      <Stack.Screen name="GoogleLogin" component={GoogleLogin} />
      <Stack.Screen name="Loginscreen" component={Loginscreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
       <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
      <Stack.Screen name="Login_Successful" component={Login_Successful} />
      <Stack.Screen name="Password_Successful" component={Password_Successful} />
      <Stack.Screen name="Home" component={HomeWithFooter} />
      <Stack.Screen name="CreateBlipsScreen" component={CreateBlipsScreen} />
      <Stack.Screen name="Blips_History" component={Blips_History} />
      <Stack.Screen name="Create_Nexus" component={Create_Nexus} />
      <Stack.Screen name="My_Own_Nexus" component={My_Own_Nexus} />
      <Stack.Screen name="Build_Your_Nexus" component={Build_Your_Nexus} />
      <Stack.Screen name="Share_Profile" component={Share_Profile} />
      <Stack.Screen name="CommunityDetails" component={CommunityWithFooter} />
      <Stack.Screen name="Press_Space_Creation_Flow" component={Press_Space_Creation_Flow}  />
      <Stack.Screen name="Start_a_Space" component={Start_a_Space} />
      <Stack.Screen name="create_Category" component={create_Category} />
      <Stack.Screen name="Space_Settings" component={Space_Settings} />
      <Stack.Screen name="Space_Permissions" component={SpacePermissionsScreen} />
      <Stack.Screen name="Nexus_Setting" component={Nexus_Setting} />
      <Stack.Screen name="Nexus_Setting_Overview" component={Nexus_Setting_Overview} />
      <Stack.Screen name="Nexus_Setting_Spaces" component={Nexus_Setting_Spaces} />
      <Stack.Screen name="Nexus_Setting_Categories" component={Nexus_Setting_Categories} />
      <Stack.Screen name="Setting_category_create_category" component={Setting_category_create_category}  />
      <Stack.Screen name="Setting_category_create_Space" component={Setting_category_create_Space} />
      <Stack.Screen name="Nexus_Setting_Members" component={Nexus_Setting_Members} />

      











      {/* main flows */}
     
      <Stack.Screen name="Search" component={SearchScreen} />
     
      


      <Stack.Screen name="NexusCommunity" component={NexusCommunity} />
      <Stack.Screen name="NexusManagement" component={NexusManagement} />
      
      <Stack.Screen
        name="Nexus_Setting_Stickers"
        component={Nexus_Setting_Stickers}
      />
      <Stack.Screen
        name="Nexus_Setting_Emoji"
        component={Nexus_Setting_Emoji}
      />
      <Stack.Screen
        name="Nexus_Setting_Moderation"
        component={Nexus_Setting_Moderation}
      />
      <Stack.Screen
        name="Nexus_Setting_Invites"
        component={Nexus_Setting_Invites}
      />
      <Stack.Screen
        name="Nexus_Setting_Security"
        component={Nexus_Setting_Security}
      />
     
      <Stack.Screen name="EditMember" component={EditMemberScreen} />
      <Stack.Screen name="Timeout" component={Timeout} />
      <Stack.Screen name="Kick" component={Kick} />
      <Stack.Screen name="Ban" component={Ban} />
      <Stack.Screen
        name="TransferOwnership"
        component={TransferOwnershipScreen}
      />
      <Stack.Screen name="Activity_History" component={Activity_History} />
      <Stack.Screen name="FilterUser" component={FilterUser} />
      <Stack.Screen name="FilterAction" component={FilterAction} />
      <Stack.Screen name="MediaViewer" component={MediaViewer} />
      <Stack.Screen name="Header_media" component={Header_media} />

      <Stack.Screen name="VoiceCall" component={VoiceCallScreen} />
      <Stack.Screen name="VideoCall" component={VideoCallScreen} />
      <Stack.Screen name="IncomingCall" component={IncomingCallScreen} />
      <Stack.Screen name="Name_Click_Settings" component={Name_Click_Settings} />
      <Stack.Screen name="Header_media_memeberprofile" component={Header_media_memeberprofile} />
<Stack.Screen name="HEaderMediachat" component={HEaderMediachat} />
<Stack.Screen name="Scanershare" component={Scanershare} />

      {/* Report detail screens */}
      <Stack.Screen
        name="Nudity_or_sexual_activity"
        component={Nudity_or_sexual_activity}
      />
      <Stack.Screen
        name="Hate_speech_or_symbols"
        component={Hate_speech_or_symbols}
      />
      <Stack.Screen name="Scam_or_fraud" component={Scam_or_fraud} />
      <Stack.Screen
        name="Violence_or_dangerous_organisations"
        component={Violence_or_dangerous_organisations}
      />
      <Stack.Screen
        name="Sale_of_illegal_or_regulated_goods"
        component={Sale_of_illegal_or_regulated_goods}
      />
      <Stack.Screen
        name="Bullying_or_harassment"
        component={Bullying_or_harassment}
      />
      <Stack.Screen name="Terrorism" component={Terrorism} />
      <Stack.Screen name="Human_trafficking" component={Human_trafficking} />
      <Stack.Screen
        name="Violent_or_graphic_content"
        component={Violent_or_graphic_content}
      />
      <Stack.Screen name="Organized_crime" component={Organized_crime} />
      <Stack.Screen name="Sale_popup" component={Sale_popup} />
      <Stack.Screen
        name="Bullying_or_harassment_popup"
        component={Bullying_or_harassment_popup}
      />
      <Stack.Screen
        name="Intellectual_property_violation"
        component={Intellectual_property_violation}
      />
      <Stack.Screen
        name="Suicide_self_injury_or_eating_disorder"
        component={Suicide_self_injury_or_eating_disorder}
      />
      <Stack.Screen name="Eating_disorder" component={Eating_disorder} />
      <Stack.Screen
        name="Suicide_or_self_injury"
        component={Suicide_or_self_injury}
      />
      <Stack.Screen name="Spam" component={Spam} />
      <Stack.Screen
        name="Problem_not_listed"
        component={Problem_not_listed}
      />
      <Stack.Screen
        name="Report_as_unlawful"
        component={Report_as_unlawful}
      />
      <Stack.Screen name="Defamation" component={Defamation} />
      <Stack.Screen name="Content" component={Content} />
      <Stack.Screen name="Done" component={Done} />
      <Stack.Screen
        name="Notification_popup"
        component={Notification_popup}
      />

<Stack.Screen name="Call_friends_invites" component={Call_friends_invites} />
<Stack.Screen name="Member_Setting" component={Member_Setting} />
<Stack.Screen name="Voice_Setting" component={Voice_Setting} />
<Stack.Screen name="Vedio_Setting" component={Vedio_Setting} />
<Stack.Screen name="New_Share" component={New_Share} />



      {/* Forward / Report bottom-popup group */}
      <Stack.Group
        screenOptions={{
          headerShown: false,
          presentation: 'transparentModal',
          cardStyle: { backgroundColor: 'transparent' },
          cardOverlayEnabled: true,
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      >
        <Stack.Screen name="Forward" component={ForwardScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
      </Stack.Group>

      {/* Screens with / without Footer */}
     
      {/* Channel la footer nahi */}
      <Stack.Screen name="Channel" component={ChannelScreen} />
      <Stack.Screen name="Chat" component={ChatWithFooter} />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreenWithFooter}
      />
      {/* IMPORTANT: Profile screen name now "Profile" (not "ProfileScreen") */}
      <Stack.Screen name="Profile" component={ProfileWithFooter} />
     
      <Stack.Screen name="Nexuschat" component={NexuschatWithFooter} />
    </Stack.Navigator>
  );
}
