import 'package:flutter/material.dart';
import 'package:sdconnect_mobile/pages/discovery/banner_slider.dart';
import 'package:sdconnect_mobile/pages/discovery/partners_slider.dart';

import '../../generated/l10n.dart';

class DiscoveryPage extends StatelessWidget {
  const DiscoveryPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            BannerSlider(),
            const SizedBox(
              height: 10.0,
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 10.0),
              child: Text(
                S.of(context).discoveryPageOurPartnersTitle,
                style: Theme.of(context).textTheme.headline6,
              ),
            ),
            PartnersSlider(),
          ],
        ),
      ),
    );
  }
}
