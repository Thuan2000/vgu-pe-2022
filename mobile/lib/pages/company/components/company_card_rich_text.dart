import 'package:flutter/material.dart';

import '../../../theme/color_constants.dart';

class CCRichText extends StatelessWidget {
  const CCRichText({Key? key, required this.title, required this.content})
      : super(key: key);

  final String title;
  final String content;

  @override
  Widget build(BuildContext context) {
    return RichText(
      overflow: TextOverflow.ellipsis,
      maxLines: 1,
      softWrap: false,
      text: TextSpan(
          style: const TextStyle(
            color: titleGray,
            fontSize: 12.0,
          ),
          children: [
            TextSpan(text: title),
            TextSpan(
                text: content,
                style: const TextStyle(fontWeight: FontWeight.w600))
          ]),
    );
  }
}
