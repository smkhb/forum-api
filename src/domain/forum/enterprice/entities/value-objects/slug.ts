export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string) {
    return new Slug(value)
  }

  /**
   * Receives a string and normalize it as a slug.
   *
   * Example: "An example title" => "an-example-title"
   *
   * @param text {string}
   */

  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, '-') // replace spaces with -
      .replace(/[^\w-]+/g, '') // remove all non-word characters
      .replace(/_/g, '-') // replace underscores with -
      .replace(/--+/g, '-') // replace double hyphens with single hyphen
      .replace(/-$/g, '') // remove trailing hyphens

    return new Slug(slugText)
  }
}
