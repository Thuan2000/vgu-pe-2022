import 'package:flutter/material.dart';
import 'package:sdconnect_mobile/components/mono_icons.dart';
import 'package:sdconnect_mobile/pages/company/components/company_card_rich_text.dart';
import 'package:sdconnect_mobile/pages/company/components/company_pin.dart';
import 'package:sdconnect_mobile/pages/company/components/gallery_image.dart';

class CompanyCard extends StatelessWidget {
  const CompanyCard(
      {Key? key,
      required this.companyName,
      required this.companySlug,
      required this.businessTypes,
      required this.mainProducts,
      required this.location})
      : super(key: key);

  final String companyName;
  final String companySlug;
  final String location;
  final String businessTypes;
  final String mainProducts;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10.0),
        color: Colors.white,
        boxShadow: [
          BoxShadow(
              color: Theme.of(context).shadowColor.withOpacity(0.18),
              blurRadius: 3.0),
        ],
      ),
      margin: const EdgeInsets.only(bottom: 10.0),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            Row(
              children: [
                CircleAvatar(
                  radius: 20,
                  backgroundImage: NetworkImage(
                      "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/Group+17.png"),
                ),
                SizedBox(
                  height: 45.0,
                  width: 8.0,
                ),
                Flexible(
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Flexible(
                            child: Container(
                              child: Text(
                                companyName,
                                style: TextStyle(
                                    fontSize: 14.0,
                                    fontWeight: FontWeight.w600),
                                overflow: TextOverflow.ellipsis,
                                maxLines: 1,
                                softWrap: false,
                              ),
                            ),
                          ),
                          Icon(
                            MonoIcons.round_verified,
                            color: Theme.of(context).primaryColor,
                          )
                        ],
                      ),
                      const SizedBox(
                        height: 2.0,
                      ),
                      Row(
                        children: [
                          CompanyPin(
                            color: Theme.of(context).primaryColor,
                            content: location,
                          ),
                          SizedBox(
                            width: 5.0,
                          ),
                          CompanyPin(
                            color: Theme.of(context).colorScheme.secondary,
                            content: "16 years",
                          )
                        ],
                      ),
                    ],
                  ),
                )
              ],
            ),
            SizedBox(
              height: 8.0,
            ),
            Row(
              children: [
                GalleryImage(
                    imageURL:
                        "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/sdc_banners-01.png"),
                GalleryImage(
                    imageURL:
                        "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/sdc_banners-02.png"),
                GalleryImage(
                    imageURL:
                        "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/sdc_banners-03.png"),
                Flexible(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      CCRichText(
                          title: "Business Type: ", content: businessTypes),
                      const SizedBox(
                        height: 4.0,
                      ),
                      CCRichText(
                          title: "Main Products: ", content: mainProducts),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

// Padding(
// padding: EdgeInsets.all(8.0),
// child: Card(
// color: Colors.blue,
// child: Column(
// mainAxisSize: MainAxisSize.max,
// children: [
// Container(
// height: 125,
// child: Image(
// image: NetworkImage(
// "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/Group+17.png"),
// fit: BoxFit.fitWidth,
// width: 200,
// ),
// ),
// Text("Card"),
// ],
// ),
// ),
// ),
