import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

class CustomAppBar extends StatelessWidget with PreferredSizeWidget {
  @override
  final Size preferredSize;
  CustomAppBar({
    Key? key,
  })  : preferredSize = const Size.fromHeight(60.0),
        super(key: key);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: SvgPicture.asset("assets/sdconnect-logo.svg"),
      actions: [
        Container(
          margin: const EdgeInsets.symmetric(vertical: 6.0, horizontal: 5.0),
          width: 44.0,
          height: 44.0,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(5.0),
          ),
          child: TextButton(
            onPressed: () {
              print('Hahah');
            },
            child: SvgPicture.asset('assets/icons/message-alt.svg'),
          ),
        ),
        Container(
          margin: const EdgeInsets.only(
              left: 5.0, right: 16.0, top: 6.0, bottom: 6.0),
          width: 44.0,
          height: 44.0,
          decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(5.0),
              border: Border.all(color: Colors.blueGrey.shade100, width: 1.0)),
          child: TextButton(
            onPressed: () {
              print('Hahah');
            },
            child: SvgPicture.asset('assets/icons/search.svg'),
          ),
        ),
      ],
    );
  }
}
// Container(
// margin: const EdgeInsets.symmetric(vertical: 3.0, horizontal: 16.0),
// width: 44.0,
// height: 44.0,
// decoration: BoxDecoration(
// borderRadius: BorderRadius.circular(5.0),
// border: Border.all(color: Colors.blueGrey.shade100, width: 2.0)),
// child: TextButton(
// onPressed: () {
// print('Hahah');
// },
// child: FaIcon(
// FontAwesomeIcons.search,
// color: Theme.of(context).iconTheme.color,
// size: 24,
// ),
// ),
// ),
