import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:sdconnect_mobile/generated/l10n.dart';
import 'package:sdconnect_mobile/pages/home_page.dart';
import 'package:sdconnect_mobile/theme/custom_theme.dart';

import 'localization/language_constants.dart';

void main() async {
  await initHiveForFlutter();

  final HttpLink httpLink = HttpLink(
    'https://api.dev.sdconnect.vn/graphql',
  );

  // final AuthLink authLink = AuthLink(
  //   getToken: () async => 'Bearer <YOUR_PERSONAL_ACCESS_TOKEN>',
  //   // OR
  //   // getToken: () => 'Bearer <YOUR_PERSONAL_ACCESS_TOKEN>',
  // );
  //
  // final Link link = authLink.concat(httpLink);

  ValueNotifier<GraphQLClient> client = ValueNotifier(
    GraphQLClient(
      link: httpLink,
      // The default store is the InMemoryStore, which does NOT persist to disk
      cache: GraphQLCache(store: HiveStore()),
    ),
  );
  runApp(GraphQLProvider(client: client, child: const MyApp()));
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);
  static void setLocale(BuildContext context, Locale newLocale) {
    _MyAppState? state = context.findAncestorStateOfType<_MyAppState>();
    state?.setLocale(newLocale);
  }

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  Locale _locale = const Locale('en', 'US');
  setLocale(Locale locale) {
    setState(() {
      _locale = locale;
    });
  }

  @override
  void didChangeDependencies() {
    getLocale().then((locale) {
      setState(() {
        _locale = locale;
      });
    });
    super.didChangeDependencies();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SDConnect',
      theme: CustomTheme.themeData,
      locale: _locale,
      supportedLocales: S.delegate.supportedLocales,
      localizationsDelegates: const [
        S.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      localeResolutionCallback: (locale, supportedLocales) {
        for (var supportedLocale in supportedLocales) {
          if (supportedLocale.languageCode == locale?.languageCode &&
              supportedLocale.countryCode == locale?.countryCode) {
            return supportedLocale;
          }
        }
        return supportedLocales.first;
      },
      home: HomePage(),
    );
  }
}

// class MyHomePage extends StatefulWidget {
//   const MyHomePage({Key? key, required this.title}) : super(key: key);

//   final String title;

//   @override
//   State<MyHomePage> createState() => _MyHomePageState();
// }

// class _MyHomePageState extends State<MyHomePage> {
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text(widget.title),
//       ),
//       body: Center(
//         child: Query(
//           options: QueryOptions(
//             document:
//                 gql(testQuery), // this is the query string you just created
//             variables: {
//               "input": {"limit": 10, "offset": 0}
//             },
//             pollInterval: const Duration(seconds: 10),
//           ),
//           // Just like in apollo refetch() could be used to manually trigger a refetch
//           // while fetchMore() can be used for pagination purpose
//           builder: (QueryResult result,
//               {VoidCallback? refetch, FetchMore? fetchMore}) {
//             if (result.hasException) {
//               return Text(result.exception.toString());
//             }

//             if (result.isLoading) {
//               return const Text('Loading');
//             }
//             List? repositories = result.data?['companies']?['companies'];

//             if (repositories == null) {
//               return const Text('No repositories');
//             }

//             return ListView.builder(
//                 itemCount: repositories.length,
//                 itemBuilder: (context, index) {
//                   final repository = repositories[index];

//                   return Container(
//                     child: Column(children: [
//                       const Text('Name'),
//                       Text(
//                         repository['name'] ?? '',
//                         overflow: TextOverflow.ellipsis,
//                       ),
//                     ]),
//                     margin: const EdgeInsets.all(10.0),
//                     color: Colors.amber[600],
//                     width: 48.0,
//                     height: 48.0,
//                   );
//                 });
//           },
//         ),
//       ),
//     );
//   }
// }
