# L10nization README

"L10nization" is a tool for extracting text to arb files in a Flutter application.

## Features

1. You must select the text with the quotes (like "Hello World").
1. In the action code you will find `Extract 'Hello World' to arb files`.
1. You can change the name of the `key` via the command.

![Extract 'Hello World' to arb files](https://github.com/lsaudon/l10nization/blob/main/images/extract-to-arb-files.gif?raw=true)

By default, the variable used for AppLocalizations is `l10n` you can change it in the parameters as if below:

```json
"l10nization.appLocalizationsVariable": "yourVariable"
```

By default, the extension launches `flutter pub get` via the [Dart extension](https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code). You can disable it in the settings.

## Release Notes

For full release notes, see the [changelog](CHANGELOG.md).
