import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:sdconnect_mobile/generated/l10n.dart';
import 'package:sdconnect_mobile/pages/company/components/company_card.dart';

String getCompanies = '''
query Companies(\$input: FetchCompanyInput!) {
  companies(input: \$input) {
    companies {
      id
      name
      slug
      settings {
        mainProducts
        profileImage {
          url
        }
        gallery {
          url
          fileName
        }
      }
      businessTypeIds
      location
    }
    pagination {
      dataCount
      hasMore
    }
  }
}
''';

// TODO implement pull to refresh page
class ListCompanies extends StatefulWidget {
  const ListCompanies({Key? key}) : super(key: key);

  @override
  _ListCompaniesState createState() => _ListCompaniesState();
}

class _ListCompaniesState extends State<ListCompanies> {
  final ScrollController scrollController = ScrollController();
  final int limit = 5;
  int offset = 0;
  var companiesList = [];

  @override
  Widget build(BuildContext context) {
    return Query(
      options: QueryOptions(
          document: gql(getCompanies),
          variables: {
            "input": {"limit": limit, "offset": offset}
          },
          fetchPolicy: FetchPolicy.networkOnly),
      builder: (QueryResult result,
          {VoidCallback? refetch, FetchMore? fetchMore}) {
        if (result.hasException) {
          return Text(result.exception.toString());
        }

        if (result.isLoading) {
          if (offset == 0) {
            //TODO implement spinning circle
            return const Text('Loading...');
          }
        }

        List? companies = result.data?['companies']['companies'];
        Map paginationInfo =
            result.data?['companies']['pagination'] ?? {"hasMore": true};

        if (companiesList.isEmpty) {
          if (companies == null) {
            // TODO implement "no company" design
            return const Text('No company found');
          }
          companiesList.addAll(companies);
        }

        return NotificationListener(
            child: ListView.builder(
              itemCount: companiesList.length + 1,
              clipBehavior: Clip.none,
              controller: scrollController,
              itemBuilder: (context, index) {
                if (index == companiesList.length) {
                  if (paginationInfo['hasMore']) {
                    return SpinKitThreeBounce(
                      color: Theme.of(context).primaryColor,
                      size: 15.0,
                    );
                  }
                  return Padding(
                    padding: EdgeInsets.only(bottom: 8.0),
                    child: Text(
                      S.of(context).noMoreResultLabel,
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          color: Theme.of(context).colorScheme.inversePrimary),
                    ),
                  );
                }
                final companyItem = companiesList[index];

                return CompanyCard(companyItem);
              },
            ),
            onNotification: (dynamic t) {
              if (t is ScrollEndNotification &&
                  scrollController.position.pixels ==
                      scrollController.position.maxScrollExtent &&
                  paginationInfo['hasMore'] &&
                  result.isNotLoading) {
                _offsetIncrement();
                FetchMoreOptions opts = FetchMoreOptions(
                  variables: {
                    "input": {"limit": limit, "offset": offset}
                  },
                  updateQuery: (previousResultData, fetchMoreResultData) {
                    final List<dynamic> companies = [
                      ...previousResultData!['companies']['companies']
                          as List<dynamic>,
                      ...fetchMoreResultData!['companies']['companies']
                          as List<dynamic>
                    ];

                    setState(() {
                      companiesList.addAll(fetchMoreResultData['companies']
                          ['companies'] as List<dynamic>);
                    });
                    fetchMoreResultData['companies']['companies'] = companies;

                    return fetchMoreResultData;
                  },
                );

                fetchMore!(opts);
              }
              return true;
            });
      },
    );
  }

  void _offsetIncrement() {
    setState(() {
      offset += limit;
    });
  }
}
