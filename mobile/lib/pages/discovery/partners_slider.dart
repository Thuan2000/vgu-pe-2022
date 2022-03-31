import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

const String getPartner = '''
  query Partners {
  partners {
    id
    title
    logoUrl
    websiteUrl
  }
}
''';

class PartnersSlider extends StatelessWidget {
  const PartnersSlider({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Query(
      options: QueryOptions(
        document: gql(getPartner),
        pollInterval: const Duration(seconds: 10),
      ),
      // Just like in apollo refetch() could be used to manually trigger a refetch
      // while fetchMore() can be used for pagination purpose
      builder: (QueryResult result,
          {VoidCallback? refetch, FetchMore? fetchMore}) {
        if (result.hasException) {
          return Text(result.exception.toString());
        }

        if (result.isLoading) {
          return const Text('Loading ...');
        }

        List? partners = result.data?['partners'];

        if (partners == null) {
          return const Text('No repositories');
        }
        final slideCount = partners.length;

        return CarouselSlider.builder(
          itemCount: (slideCount / 2).round(),
          options: CarouselOptions(
            autoPlay: true,
            autoPlayInterval: const Duration(seconds: 4),
            aspectRatio: 2.0,
            viewportFraction: 1.0,
            height: 100.0,
            enableInfiniteScroll: false,
          ),
          itemBuilder: (context, index, realIndex) {
            final int first = index * 2;
            final int? second = index < slideCount - 1 ? first + 1 : null;

            return Row(
              children: [first, second].map((idx) {
                return idx != null
                    ? Expanded(
                        flex: 1,
                        child: Container(
                          padding: EdgeInsets.all(5.0),
                          margin: EdgeInsets.symmetric(horizontal: 16),
                          width: 160.0,
                          height: 90.0,
                          decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(5.0),
                              boxShadow: [
                                BoxShadow(
                                    color: Theme.of(context)
                                        .shadowColor
                                        .withOpacity(0.18),
                                    blurRadius: 4.0),
                              ]),
                          child: Image(
                            image: NetworkImage(partners[idx]['logoUrl']),
                          ),
                        ),
                      )
                    : Expanded(
                        flex: 1,
                        child: Container(
                          margin: EdgeInsets.symmetric(horizontal: 16),
                        ),
                      );
              }).toList(),
            );
          },
        );
      },
    );
  }
}
