import 'package:flutter/material.dart';
import 'package:sdconnect_mobile/generated/l10n.dart';

const List<Map> kBusinessTypes = [
  {
    "id": 1,
    "label": "SERVICE",
  },
  {
    "id": 2,
    "label": "TRADING_COMPANY",
  },
  {
    "id": 3,
    "label": "MANUFACTURER",
  },
];

String getBusinessTypesString(BuildContext context, List<int> businessTypeIds) {
  List<String> businessTypesMap = [
    S.of(context).businessTypeService,
    S.of(context).businessTypeTrading,
    S.of(context).businessTypeManufacturer
  ];

  return businessTypeIds.map((id) => businessTypesMap[id - 1]).join(", ");
}
