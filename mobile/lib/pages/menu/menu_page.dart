import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';
import 'package:sdconnect_mobile/components/mono_icons.dart';
import 'package:sdconnect_mobile/generated/l10n.dart';
import 'package:sdconnect_mobile/pages/company/companies_page.dart';
import 'package:sdconnect_mobile/pages/menu/menu_item.dart';
import 'package:sdconnect_mobile/pages/product/products_page.dart';
import 'package:sdconnect_mobile/pages/service/services_page.dart';
import 'package:sdconnect_mobile/pages/tender/tenders_page.dart';

class MenuPage extends StatelessWidget {
  MenuPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final menuItems = [
      MenuItem(
        title: S.of(context).menuPageCompanyTitle,
        icon: MonoIcons.user,
        route: '/companies',
        screen: CompaniesPage(),
      ),
      MenuItem(
        title: S.of(context).menuPageTenderTitle,
        icon: MonoIcons.clipboard,
        route: '/tenders',
        screen: TendersPage(),
      ),
      MenuItem(
        title: S.of(context).menuPageProductTitle,
        icon: MonoIcons.book,
        route: '/products',
        screen: ProductsPage(),
      ),
      MenuItem(
        title: S.of(context).menuPageServiceTitle,
        icon: MonoIcons.megaphone,
        route: '/services',
        screen: ServicesPage(),
      ),
    ];
    return Scaffold(
      body: ListView.builder(
        itemCount: menuItems.length,
        itemExtent: 60.0,
        itemBuilder: (context, index) {
          return Column(
            children: [
              Expanded(
                child: ListTile(
                  contentPadding:
                      EdgeInsets.symmetric(vertical: 5.0, horizontal: 15.0),
                  title: Text(
                    menuItems[index].title,
                    style: Theme.of(context).textTheme.bodyText1,
                  ),
                  leading: Icon(
                    menuItems[index].icon,
                    color: Theme.of(context).primaryColor,
                  ),
                  trailing: Icon(
                    MonoIcons.chevron_right,
                    color: Theme.of(context).iconTheme.color,
                  ),
                  onTap: () {
                    print("Hahaha" + menuItems[index].route);
                    //Navigator.pushNamed(context, menuItems[index].route);
                    pushNewScreenWithRouteSettings(
                      context,
                      screen: menuItems[index].screen,
                      settings: RouteSettings(name: menuItems[index].route),
                    );
                  },
                  dense: true,
                ),
              ),
              const Divider(
                height: 1.0,
                thickness: 1.0,
              ),
            ],
          );
        },
      ),
    );
  }
}
