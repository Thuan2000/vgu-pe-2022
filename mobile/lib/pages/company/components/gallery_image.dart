import 'package:flutter/material.dart';

class GalleryImage extends StatelessWidget {
  const GalleryImage({Key? key, this.imageURL = ""}) : super(key: key);

  final String imageURL;

  @override
  Widget build(BuildContext context) {
    if (imageURL.isEmpty) {
      return Container();
    }
    return Padding(
      padding: const EdgeInsets.only(right: 8.0),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(5.0),
        child: Image(
          image: NetworkImage(imageURL),
          width: 40.0,
          height: 40.0,
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}
