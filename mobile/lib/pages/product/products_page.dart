import 'package:flutter/material.dart';
import 'package:sdconnect_mobile/generated/l10n.dart';

class ProductsPage extends StatelessWidget {
  const ProductsPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(S.of(context).menuPageProductTitle),
      ),
    );
  }
}
