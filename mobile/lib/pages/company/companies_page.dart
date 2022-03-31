import 'package:flutter/material.dart';
import 'package:sdconnect_mobile/components/mono_icons.dart';
import 'package:sdconnect_mobile/generated/l10n.dart';

class CompaniesPage extends StatelessWidget {
  const CompaniesPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).primaryColor.withOpacity(0.12),
        titleSpacing: 0.0,
        leading: GestureDetector(
          child: Icon(
            MonoIcons.chevron_left,
            color: Theme.of(context).primaryColor,
          ),
          onTap: () {
            Navigator.of(context).pop();
          },
        ),
        title: Text(
          S.of(context).menuPageCompanyTitle,
          style: Theme.of(context).textTheme.headline6?.copyWith(
                color: Theme.of(context).primaryColor,
              ),
        ),
        actions: [
          IconButton(
              onPressed: () {
                print("hahaha");
              },
              icon: Icon(Icons.filter_alt_outlined))
        ],
      ),
      body: Column(
        children: [],
      ),
    );
  }
}
