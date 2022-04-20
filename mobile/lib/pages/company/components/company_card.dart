import 'package:flutter/material.dart';
import 'package:sdconnect_mobile/components/business_types.dart';
import 'package:sdconnect_mobile/components/mono_icons.dart';
import 'package:sdconnect_mobile/generated/l10n.dart';
import 'package:sdconnect_mobile/pages/company/components/company_card_rich_text.dart';
import 'package:sdconnect_mobile/pages/company/components/company_pin.dart';
import 'package:sdconnect_mobile/pages/company/components/gallery_image.dart';

class CompanyCard extends StatelessWidget {
  const CompanyCard(this.companyItem, {Key? key}) : super(key: key);

  final dynamic companyItem;

  @override
  Widget build(BuildContext context) {
    final String companyName = companyItem['name'];
    final String companySlug = companyItem['slug'];
    final String location = companyItem['location'] ?? '';
    final List<int> businessTypeIds =
        companyItem['businessTypeIds']?.cast<int>() ?? [];
    final mainProductsList = companyItem['settings']?['mainProducts'] ?? [];
    final String avatarUrl = companyItem['settings']?['profileImage']?['url'] ??
        'https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/mobile/company-logo-placeholder.png';
    final galleryImages = companyItem['settings']?['gallery'] ?? [];

    final businessTypesString =
        getBusinessTypesString(context, businessTypeIds);
    final String mainProductsString = mainProductsList.join(", ");
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
                  backgroundImage: NetworkImage(avatarUrl),
                ),
                const SizedBox(
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
                                style: const TextStyle(
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
                          const SizedBox(
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
            const SizedBox(
              height: 8.0,
            ),
            Row(
              children: [
                GalleryImage(
                    imageURL: galleryImages.length > 0
                        ? galleryImages[0]['url']
                        : ''),
                GalleryImage(
                    imageURL: galleryImages.length > 1
                        ? galleryImages[1]['url']
                        : ''),
                GalleryImage(
                    imageURL: galleryImages.length > 2
                        ? galleryImages[2]['url']
                        : ''),
                Flexible(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      CCRichText(
                          title: S.of(context).companyCardBusinessTypeLabel,
                          content: businessTypesString.isNotEmpty
                              ? businessTypesString
                              : S.of(context).noInformationLabel),
                      const SizedBox(
                        height: 4.0,
                      ),
                      CCRichText(
                          title: S.of(context).companyCardMainProductsLabel,
                          content: mainProductsString.isNotEmpty
                              ? mainProductsString
                              : S.of(context).noInformationLabel),
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
