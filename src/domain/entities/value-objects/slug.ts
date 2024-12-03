export class Slug{
  public value: string

  constructor(value: string) {
    this.value = value
  }

  static createFromText(text: string){
    const slugText = text
      .normalize("NFKD")
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