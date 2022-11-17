import { Placeholder } from '../../placeholders/placeholder';
import { PlaceholderType } from '../../placeholders/placeholderType';
import { expect } from 'chai';
import { toJson } from '../../extension/toJson';

const defaultArbJson = `{
  "@@locale": "fr"
}`;

describe('toJson', () => {
  it('should return json when simple messages', () => {
    expect(toJson(defaultArbJson, 'helloWorld', 'Hello World', [])).to.be
      .equal(`{
  "@@locale": "fr",
  "helloWorld": "Hello World"
}`);
  });

  it('should return json when message with 1 placeholder', () => {
    expect(
      toJson(defaultArbJson, 'hello', 'Hello $name', [
        new Placeholder('name', 'name', PlaceholderType.String)
      ])
    ).to.be.equal(`{
  "@@locale": "fr",
  "hello": "Hello {name}",
  "@hello": {
    "placeholders": {
      "name": {
        "type": "String"
      }
    }
  }
}`);
  });

  it('should return json when message with 2 placeholders', () => {
    expect(
      toJson(defaultArbJson, 'hello', 'Hello $name $otherName', [
        new Placeholder('name', 'name', PlaceholderType.String),
        new Placeholder('otherName', 'otherName', PlaceholderType.String)
      ])
    ).to.be.equal(`{
  "@@locale": "fr",
  "hello": "Hello {name} {otherName}",
  "@hello": {
    "placeholders": {
      "name": {
        "type": "String"
      },
      "otherName": {
        "type": "String"
      }
    }
  }
}`);
  });

  it('should return json when message with 2 placeholders', () => {
    expect(
      toJson(
        defaultArbJson,
        'aNameOthernameContextOwnerTostring',
        // eslint-disable-next-line no-template-curly-in-string
        'a $name $otherName ${context.owner.toString()}',
        [
          new Placeholder('firstName', 'name', PlaceholderType.String),
          new Placeholder('lastName', 'otherName', PlaceholderType.String),
          new Placeholder(
            'contextOwnerTostring',
            'context.owner.toString()',
            PlaceholderType.String
          )
        ]
      )
    ).to.be.equal(`{
  "@@locale": "fr",
  "aNameOthernameContextOwnerTostring": "a {firstName} {lastName} {contextOwnerTostring}",
  "@aNameOthernameContextOwnerTostring": {
    "placeholders": {
      "firstName": {
        "type": "String"
      },
      "lastName": {
        "type": "String"
      },
      "contextOwnerTostring": {
        "type": "String"
      }
    }
  }
}`);
  });
});
