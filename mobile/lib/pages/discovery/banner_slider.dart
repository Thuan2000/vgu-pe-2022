import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';

class BannerSlider extends StatefulWidget {
  const BannerSlider({Key? key}) : super(key: key);

  @override
  State<BannerSlider> createState() => _BannerSliderState();
}

class _BannerSliderState extends State<BannerSlider> {
  final int _numberOfBanners = 3;
  CarouselController bannerController = CarouselController();
  int _selectedBanner = 0;

  void _handleSliderAutoToggle(int index, CarouselPageChangedReason reason) {
    setState(() {
      _selectedBanner = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: AlignmentDirectional.bottomCenter,
      children: [
        CarouselSlider.builder(
          itemCount: _numberOfBanners,
          itemBuilder: _buildBanners,
          options: CarouselOptions(
            autoPlay: true,
            autoPlayInterval: const Duration(seconds: 3),
            viewportFraction: 1,
            height: 360.0,
            onPageChanged: _handleSliderAutoToggle,
          ),
        ),
        Container(
          margin: EdgeInsets.all(15.0),
          child: AnimatedSmoothIndicator(
            activeIndex: _selectedBanner,
            count: _numberOfBanners,
            effect: ExpandingDotsEffect(
              dotWidth: 12.0,
              dotHeight: 12.0,
              expansionFactor: 2,
              activeDotColor: Theme.of(context).primaryColor,
              dotColor: Colors.white,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildBanners(BuildContext context, int index, int realIndex) {
    return Container(
      color: Theme.of(context).primaryColor,
      child: Image(
        image: NetworkImage(
            "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/mobile/banners/banner-${index + 1}.png"),
        fit: BoxFit.fill,
      ),
    );
  }
}
