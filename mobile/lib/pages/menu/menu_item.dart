import 'package:flutter/material.dart';

class MenuItem {
  final String title;
  final IconData icon;
  final String route;
  final Widget screen;

  const MenuItem({
    required this.title,
    required this.icon,
    required this.route,
    required this.screen,
  });
}
