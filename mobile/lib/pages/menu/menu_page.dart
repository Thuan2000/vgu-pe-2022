import 'package:flutter/material.dart';
import 'package:sdconnect_mobile/generated/l10n.dart';

class MenuPage extends StatelessWidget {
  const MenuPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(S.of(context).menuPageTitle),
    );
  }
}
