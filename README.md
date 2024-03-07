# L10nization README

"L10nization" is a tool for extracting text to arb files for l10n or [r13n](https://github.com/VeryGoodOpenSource/r13n) in a Flutter application.

## Features

1. You must select the text with the quotes (like "Hello World").
1. In the action code you will find `Extract 'Hello World' to arb files`.
1. You can change the name of the `key` via the command.

![Extract 'Hello World' to arb files](https://github.com/lsaudon/l10nization/blob/main/images/extract-to-arb-files.gif?raw=true)

### App Localizations Variable

By default, the variable used for AppLocalizations is `l10n` you can change it in the parameters as if below:

```json
"l10nization.appLocalizationsVariable": "yourVariable"
```

By default, the extension launches `flutter pub get` via the [Dart extension](https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code). You can disable it in the settings.

### For r13n

To use the extension with [r13n](https://github.com/VeryGoodOpenSource/r13n), the following parameters must be changed.

```json
"l10nization.appLocalizationsVariable": "r13n", // or whatever you want.
"l10nization.yamlFile": "r13n.yaml"
```

### Add description

You can add the description by enabling `l10nization.haveMetadatas`.

### Add message in

You can choose if you want add new message with `addNewMessagesIn` in .
- `all`: all files
- `template`: only in template file

### Sort arb files

You can use the command `L10nization: Sort arb files`.

### Number format

| Message “format” value  | Output for numberOfDataPoints(1200000) |
| ----------------------- | -------------------------------------- |
| "compact"               | "1.2M"                                 |
| "compactCurrency"       | "$1.2M"                                |
| "compactSimpleCurrency" | "$1.2M"                                |
| "compactLong"           | "1.2 million"                          |
| "currency"              | "USD1,200,000.00"                      |
| "decimalPattern"        | "1,200,000"                            |
| "decimalPercentPattern" | "120,000,000%"                         |
| "percentPattern"        | "120,000,000%"                         |
| "scientificPattern"     | "1E6"                                  |
| "simpleCurrency"        | "$1,200,000.00"                        |

### Date format

**The extension does not check that it is correct.**

For the Date format, you can select those already available or write your own.

## Release Notes

For full release notes, see the [changelog](CHANGELOG.md).
