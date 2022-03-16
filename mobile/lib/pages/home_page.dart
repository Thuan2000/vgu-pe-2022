import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:sdconnect_mobile/classes/language.dart';
import 'package:sdconnect_mobile/components/custom_app_bar.dart';
import 'package:sdconnect_mobile/localization/language_constants.dart';
import 'package:sdconnect_mobile/main.dart';
import 'package:sdconnect_mobile/router/route_constants.dart';
import 'package:sdconnect_mobile/generated/l10n.dart';
import 'package:sdconnect_mobile/components/custom_app_bar.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final GlobalKey<FormState> _key = GlobalKey<FormState>();
  void _changeLanguage(Language language) async {
    Locale _locale = await setLocale(language.languageCode);
    MyApp.setLocale(context, _locale);
  }

  void _showSuccessDialog() {
    showTimePicker(context: context, initialTime: TimeOfDay.now());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(),
      // drawer: Drawer(
      //   child: _drawerList(),
      // ),
      body: Container(
        padding: const EdgeInsets.all(20),
        child: null,
      ),
    );
  }
}
