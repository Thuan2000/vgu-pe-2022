import 'package:flutter/material.dart';
import 'color_constants.dart' as colorConstants;
import 'package:google_fonts/google_fonts.dart';

class CustomTheme {
  static ThemeData get themeData {
    return ThemeData(
      primaryColor: colorConstants.primary,
      colorScheme: const ColorScheme.light(
        primary: colorConstants.primary,
        secondary: colorConstants.secondaryBlue,
        onSecondary: Colors.white,
        tertiary: colorConstants.secondaryDarkBlue,
        onTertiary: Colors.white,
        error: colorConstants.secondaryRed,
        onBackground: colorConstants.secondaryDarkBlue,
        onSurface: colorConstants.secondaryDarkBlue,
        outline: colorConstants.secondaryGray100,
        shadow: colorConstants.dropShadow,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.white,
        centerTitle: false,
        titleSpacing: 16.0,
        elevation: 0,
      ),
      iconTheme: const IconThemeData(
          color: colorConstants.secondaryGray200, size: 24.0),
      scaffoldBackgroundColor: Colors.white,
      textTheme: GoogleFonts.openSansTextTheme().copyWith(
        button: const TextStyle(fontSize: 14.0, fontWeight: FontWeight.w500),
      ),
      buttonTheme: ButtonThemeData(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5.0)),
        height: 40.0,
      ),
    );
  }
}
