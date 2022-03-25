import 'package:flutter/material.dart';
import 'package:sdconnect_mobile/pages/discovery/banner_slider.dart';

class DiscoveryPage extends StatelessWidget {
  const DiscoveryPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: SizedBox(
        height: MediaQuery.of(context).size.height,
        width: MediaQuery.of(context).size.width,
        child: Scaffold(
          body: Column(children: [
            BannerSlider(),
          ]),
        ),
      ),
    );
  }
}
