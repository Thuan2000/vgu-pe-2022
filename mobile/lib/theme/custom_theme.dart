import 'package:flutter/material.dart';
import 'color_constants.dart' as colorConstants;

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
        inversePrimary: colorConstants.secondaryGray200,
      ),
      backgroundColor: Colors.white,
      dividerColor: const Color.fromRGBO(0, 0, 0, 0.1),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.white,
        centerTitle: false,
        titleSpacing: 16.0,
        elevation: 0,
      ),
      iconTheme: const IconThemeData(
          color: colorConstants.secondaryGray200, size: 24.0),
      scaffoldBackgroundColor: Colors.white,
      fontFamily: "OpenSans",
      textTheme: const TextTheme(
        button: TextStyle(
          fontSize: 14.0,
          fontWeight: FontWeight.w600,
        ),
        headline6: TextStyle(
          fontSize: 18.0,
          fontWeight: FontWeight.w600,
        ),
        bodyText1: TextStyle(
          fontSize: 16.0,
          fontWeight: FontWeight.w100,
        ),
        bodyText2: TextStyle(
          fontSize: 14.0,
          fontWeight: FontWeight.w100,
        ),
      ).apply(bodyColor: colorConstants.secondaryDarkBlue),
      buttonTheme: ButtonThemeData(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5.0)),
        height: 40.0,
      ),
    );
  }
}

// GoogleFonts.openSansTextTheme().copyWith(
// button: const TextStyle(fontSize: 14.0, fontWeight: FontWeight.w500),
// headline6: const TextStyle(fontSize: 18.0, fontWeight: FontWeight.w500),
// )
