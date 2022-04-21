import 'package:flutter/material.dart';
import 'package:sdconnect_mobile/components/mono_icons.dart';
import 'package:sdconnect_mobile/generated/l10n.dart';
import 'package:sdconnect_mobile/pages/company/components/list_companies.dart';
import 'package:sdconnect_mobile/theme/color_constants.dart' as colorConstant;

class CompaniesPage extends StatelessWidget {
  const CompaniesPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: colorConstant.appBarLightGreen,
        titleSpacing: 0.0,
        iconTheme: IconThemeData(
          color: Theme.of(context).primaryColor,
          size: 24,
        ),
        leading: GestureDetector(
          child: Icon(
            MonoIcons.chevron_left,
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
              print("sort");
            },
            icon: Icon(
              MonoIcons.sort,
            ),
          ),
          IconButton(
            onPressed: () {
              print("filter");
            },
            icon: const Icon(
              MonoIcons.filter,
            ),
          ),
          const SizedBox(
            width: 5.0,
          )
        ],
      ),
      body: const Padding(
        padding: EdgeInsets.only(
          left: 16.0,
          right: 16.0,
          top: 16.0,
        ),
        child: ListCompanies(),
      ),
    );
  }
}
