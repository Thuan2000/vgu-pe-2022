import 'package:flutter/material.dart';

class CompanyPin extends StatelessWidget {
  const CompanyPin({Key? key, this.content = "", required this.color})
      : super(key: key);

  final String content;
  final Color color;

  @override
  Widget build(BuildContext context) {
    if (content.isEmpty) {
      print("empty");
      return Container();
    }
    return Container(
      height: 20.0,
      decoration: BoxDecoration(
          color: color, borderRadius: BorderRadius.circular(20.0)),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 3.0, horizontal: 8.0),
        child: Text(
          content,
          style: TextStyle(
            fontSize: 10.0,
            fontWeight: FontWeight.w600,
            color: Colors.white,
          ),
        ),
      ),
    );
  }
}
