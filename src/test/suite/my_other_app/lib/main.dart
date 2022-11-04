import 'package:flutter/material.dart';
import 'package:my_other_app/l10n/l10n.dart';

Future<void> main() async {
  runApp(App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;

    return MaterialApp(
      localizationsDelegates: AppLocalizations.localizationsDelegates,
      supportedLocales: AppLocalizations.supportedLocales,
      home: Scaffold(
        appBar: AppBar(title: Text(l10n.counterAppBarTitle)),
        body: const Center(child: Text("Aujourd'hui il FAIT 50°C.")),
      ),
    );
  }
}
