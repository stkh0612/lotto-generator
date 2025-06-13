# lotto-generator

Simple lotto number generator written in Ruby.

## Usage

Run the `bin/lotto` script to generate lotto numbers:

```bash
$ bin/lotto            # generate one set of numbers
$ bin/lotto 3          # generate three sets
```

You can customize the generation with environment variables:

- `COUNT` - how many numbers in each set (default: 6)
- `RANGE_MAX` - maximum number in the range starting from 1 (default: 45)
- `SEED` - seed value for reproducible results

Example:

```bash
$ COUNT=7 RANGE_MAX=55 SEED=123 bin/lotto 2
```
