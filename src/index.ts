type Matcher<T, U> = (value: T) => [boolean, U]

export const match = <T, M extends Matcher<T, any>, D>(
  discriminant: T,
  opts: {
    matchers: M[]
    default: D
  },
): ReturnType<M>[1] | D => {
  for (const matcher of opts.matchers) {
    const [isMatching, mappedValue] = matcher(discriminant)

    if (isMatching) return mappedValue
  }

  return opts.default
}
