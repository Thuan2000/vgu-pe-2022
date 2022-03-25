import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';
import 'package:sdconnect_mobile/components/custom_app_bar.dart';
import 'package:sdconnect_mobile/components/mono_icons.dart';
import 'package:sdconnect_mobile/pages/discovery/discovery_page.dart';
import 'package:sdconnect_mobile/pages/menu/menu_page.dart';
import 'package:sdconnect_mobile/pages/messages/messages_page.dart';
import 'package:sdconnect_mobile/pages/profile/profile_page.dart';
import 'package:sdconnect_mobile/generated/l10n.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final PersistentTabController _controller =
      PersistentTabController(initialIndex: 0);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: CustomAppBar(),
        // drawer: Drawer(
        //   child: _drawerList(),
        // ),
        body: PersistentTabView(
          context,
          controller: _controller,
          screens: _buildScreens(),
          items: _navBarsItems(),
          confineInSafeArea: true,
          backgroundColor: Colors.white, // Default is Colors.white.
          handleAndroidBackButtonPress: true, // Default is true.
          resizeToAvoidBottomInset:
              true, // This needs to be true if you want to move up the screen when keyboard appears. Default is true.
          stateManagement: true, // Default is true.
          hideNavigationBarWhenKeyboardShows:
              true, // Recommended to set 'resizeToAvoidBottomInset' as true while using this argument. Default is true.
          decoration: NavBarDecoration(
            colorBehindNavBar: Colors.white,
            boxShadow: [
              BoxShadow(
                  color: Theme.of(context).shadowColor.withOpacity(0.18),
                  blurRadius: 5.0),
            ],
          ),
          popAllScreensOnTapOfSelectedTab: true,
          popActionScreens: PopActionScreensType.all,
          itemAnimationProperties: const ItemAnimationProperties(
            // Navigation Bar's items animation properties.
            duration: Duration(milliseconds: 200),
            curve: Curves.ease,
          ),
          screenTransitionAnimation: const ScreenTransitionAnimation(
            // Screen transition animation on change of selected tab.
            animateTabTransition: true,
            curve: Curves.ease,
            duration: Duration(milliseconds: 200),
          ),
          navBarStyle: NavBarStyle
              .style8, // Choose the nav bar style with this property.
        ));
  }

  List<Widget> _buildScreens() {
    return [DiscoveryPage(), MenuPage(), MessagesPage(), ProfilePage()];
  }

  List<PersistentBottomNavBarItem> _navBarsItems() {
    return [
      PersistentBottomNavBarItem(
        icon: Icon(MonoIcons.home),
        title: (S.of(context).discoveryPageTitle),
        activeColorPrimary: Theme.of(context).primaryColor,
        inactiveColorPrimary: Theme.of(context).colorScheme.inversePrimary,
      ),
      PersistentBottomNavBarItem(
        icon: Icon(MonoIcons.list),
        title: (S.of(context).menuPageTitle),
        activeColorPrimary: Theme.of(context).primaryColor,
        inactiveColorPrimary: Theme.of(context).colorScheme.inversePrimary,
      ),
      PersistentBottomNavBarItem(
        icon: Icon(MonoIcons.message),
        title: (S.of(context).messagesPageTitle),
        activeColorPrimary: Theme.of(context).primaryColor,
        inactiveColorPrimary: Theme.of(context).colorScheme.inversePrimary,
      ),
      PersistentBottomNavBarItem(
        icon: Icon(MonoIcons.user),
        title: (S.of(context).profilePageTitle),
        activeColorPrimary: Theme.of(context).primaryColor,
        inactiveColorPrimary: Theme.of(context).colorScheme.inversePrimary,
      ),
    ];
  }
}
