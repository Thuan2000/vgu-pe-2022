import 'package:flutter/material.dart';
import 'package:sdconnect_mobile/classes/language.dart';
import 'package:sdconnect_mobile/localization/language_constants.dart';
import 'package:sdconnect_mobile/main.dart';
import 'package:sdconnect_mobile/generated/l10n.dart';

class ProfilePage extends StatefulWidget {
  ProfilePage({Key? key}) : super(key: key);

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  void _changeLanguage(Language language) async {
    Locale _locale = await setLocale(language.languageCode);
    MyApp.setLocale(context, _locale);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: DropdownButton<Language>(
          iconSize: 30,
          hint: Text(S.of(context).formFieldChangeLanguage),
          onChanged: (Language? language) {
            _changeLanguage(language!);
          },
          items: Language.languageList()
              .map<DropdownMenuItem<Language>>(
                (e) => DropdownMenuItem<Language>(
                  value: e,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: <Widget>[
                      Text(
                        e.flag,
                        style: TextStyle(fontSize: 30),
                      ),
                      Text(e.name)
                    ],
                  ),
                ),
              )
              .toList(),
        ),
      ),
    );
  }
}
