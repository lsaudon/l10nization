/* eslint-disable max-lines */
import { Placeholder } from '../../placeholders/placeholder';
import { PlaceholderType } from '../../placeholders/placeholderType';
import { expect } from 'chai';
import { toJson } from '../../extension/toJson';

const defaultArbJson = `{
  "@@locale": "fr"
}`;

describe('toJson', () => {
  it('should return json when simple messages', () => {
    expect(toJson(defaultArbJson, 'helloWorld', 'Hello World', [], false)).to.be
      .equal(`{
  "@@locale": "fr",
  "helloWorld": "Hello World"
}`);
  });

  it('should return json when message with 1 placeholder', () => {
    expect(
      toJson(
        defaultArbJson,
        'hello',
        'Hello $name',
        [new Placeholder('name', 'name', PlaceholderType.String)],
        false
      )
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
      toJson(
        defaultArbJson,
        'hello',
        'Hello $name $otherName',
        [
          new Placeholder('name', 'name', PlaceholderType.String),
          new Placeholder('otherName', 'otherName', PlaceholderType.String)
        ],
        false
      )
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
        ],
        false
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

  it('should return json when message with 1 placeholder int', () => {
    expect(
      toJson(
        defaultArbJson,
        'hello',
        'Hello $name',
        [new Placeholder('name', 'name', PlaceholderType.int)],
        false
      )
    ).to.be.equal(`{
  "@@locale": "fr",
  "hello": "Hello {name}",
  "@hello": {
    "placeholders": {
      "name": {
        "type": "int"
      }
    }
  }
}`);
  });

  it('should return json when message with 1 placeholder int with format', () => {
    expect(
      toJson(
        defaultArbJson,
        'hello',
        'Hello $name',
        [
          new Placeholder('name', 'name', PlaceholderType.int).addFormat(
            'compact'
          )
        ],
        false
      )
    ).to.be.equal(`{
  "@@locale": "fr",
  "hello": "Hello {name}",
  "@hello": {
    "placeholders": {
      "name": {
        "type": "int",
        "format": "compact"
      }
    }
  }
}`);
  });

  it('should return json when message with 1 placeholder int with format with parameters', () => {
    expect(
      toJson(
        defaultArbJson,
        'hello',
        'Hello $name',
        [
          new Placeholder('name', 'name', PlaceholderType.int)
            .addFormat('currency')
            .addSymbol('€')
            .addDecimalDigits(2)
            .addCustomPattern('###.0#')
        ],
        false
      )
    ).to.be.equal(`{
  "@@locale": "fr",
  "hello": "Hello {name}",
  "@hello": {
    "placeholders": {
      "name": {
        "type": "int",
        "format": "currency",
        "optionalParameters": {
          "symbol": "€",
          "decimalDigits": 2,
          "customPattern": "###.0#"
        }
      }
    }
  }
}`);
  });

  it('should return json when message with 1 placeholder num with format with parameters', () => {
    expect(
      toJson(
        defaultArbJson,
        'hello',
        'Hello $name',
        [
          new Placeholder('name', 'name', PlaceholderType.num)
            .addFormat('currency')
            .addSymbol('€')
            .addDecimalDigits(2)
            .addCustomPattern('###.0#')
        ],
        false
      )
    ).to.be.equal(`{
  "@@locale": "fr",
  "hello": "Hello {name}",
  "@hello": {
    "placeholders": {
      "name": {
        "type": "num",
        "format": "currency",
        "optionalParameters": {
          "symbol": "€",
          "decimalDigits": 2,
          "customPattern": "###.0#"
        }
      }
    }
  }
}`);
  });

  it('should return json when message with 1 placeholder double with format with parameters', () => {
    expect(
      toJson(
        defaultArbJson,
        'hello',
        'Hello $name',
        [
          new Placeholder('name', 'name', PlaceholderType.double)
            .addFormat('currency')
            .addSymbol('€')
            .addDecimalDigits(2)
            .addCustomPattern('###.0#')
        ],
        false
      )
    ).to.be.equal(`{
  "@@locale": "fr",
  "hello": "Hello {name}",
  "@hello": {
    "placeholders": {
      "name": {
        "type": "double",
        "format": "currency",
        "optionalParameters": {
          "symbol": "€",
          "decimalDigits": 2,
          "customPattern": "###.0#"
        }
      }
    }
  }
}`);
  });

  it('should return json when message with 1 placeholder DateTime', () => {
    expect(
      toJson(
        defaultArbJson,
        'hello',
        'Hello $name',
        [
          new Placeholder('name', 'name', PlaceholderType.DateTime).addFormat(
            'yMd'
          )
        ],
        false
      )
    ).to.be.equal(`{
  "@@locale": "fr",
  "hello": "Hello {name}",
  "@hello": {
    "placeholders": {
      "name": {
        "type": "DateTime",
        "format": "yMd"
      }
    }
  }
}`);
  });

  it('should return json when message with 1 placeholder DateTime not in valid list', () => {
    expect(
      toJson(
        defaultArbJson,
        'hello',
        'Hello $name',
        [
          new Placeholder('name', 'name', PlaceholderType.DateTime).addFormat(
            'dd/MM/yyyy'
          )
        ],
        false
      )
    ).to.be.equal(`{
  "@@locale": "fr",
  "hello": "Hello {name}",
  "@hello": {
    "placeholders": {
      "name": {
        "type": "DateTime",
        "format": "dd/MM/yyyy",
        "isCustomDateFormat": "true"
      }
    }
  }
}`);
  });

  it('should return json sorted when sort json', () => {
    expect(
      toJson(
        `{
  "@@locale": "fr",
  "@z": {
    "placeholders": {
      "name": {
        "type": "String"
      }
    }
  },
  "z": "Z {name}"
}`,
        'a',
        'A $name',
        [new Placeholder('name', 'name', PlaceholderType.String)],
        true
      )
    ).to.be.equal(`{
  "@@locale": "fr",
  "a": "A {name}",
  "@a": {
    "placeholders": {
      "name": {
        "type": "String"
      }
    }
  },
  "z": "Z {name}",
  "@z": {
    "placeholders": {
      "name": {
        "type": "String"
      }
    }
  }
}`);
  });

  it('should return json when message with 1 placeholder plural', () => {
    expect(
      toJson(
        defaultArbJson,
        'countMessage',
        'You have $count photos',
        [new Placeholder('count', 'count', PlaceholderType.plural)],
        false
      )
    ).to.be.equal(`{
  "@@locale": "fr",
  "countMessage": "{count, plural, other{You have {count} photos}}",
  "@countMessage": {
    "placeholders": {
      "count": {}
    }
  }
}`);
  });

  it('should return json when message with 1 placeholder plural 2', () => {
    expect(
      toJson(
        defaultArbJson,
        'countMessage',
        'You have $otherCount photos',
        [new Placeholder('otherCount', 'otherCount', PlaceholderType.plural)],
        false
      )
    ).to.be.equal(`{
  "@@locale": "fr",
  "countMessage": "{otherCount, plural, other{You have {otherCount} photos}}",
  "@countMessage": {
    "placeholders": {
      "otherCount": {}
    }
  }
}`);
  });
});
