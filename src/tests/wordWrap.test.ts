class ColumnWidth {
    private constructor(private readonly width: number) {
    }
  
    static create(width: number) {
      if (width < 0) {
        throw new Error('Negative column width is not allowed');
      }
      return new ColumnWidth(width);
    }
  
    value() {
      return this.width;
    }
}
  
class WrappableText {
    private constructor(private readonly text: string) { }
  
    static create(text: string) {
      if (text == null) {
        return new WrappableText('');
      }
      return new WrappableText(text);
    }
  
    fitsIn(columnWidth: ColumnWidth) {
      return this.value().length <= columnWidth.value();
    }
  
    concat(text: WrappableText) {
      return WrappableText.create(this.value().concat(text.value()));
    }
  
    wrappedText(columnWidth: ColumnWidth) {
      return WrappableText.create(this.value().substring(0, this.wrapIndex(columnWidth)).concat('\n'));
    }
  
    private wrapIndex(columnWidth: ColumnWidth) {
      return this.shallWrapBySpace(columnWidth) ? this.indexOfSpace() : columnWidth.value();
    }
  
    unwrappedText(columnWidth: ColumnWidth) {
      return WrappableText.create(this.value().substring(this.unwrapIndex(columnWidth)));
    }
  
    private unwrapIndex(columnWidth: ColumnWidth) {
      return this.shallWrapBySpace(columnWidth) ? this.indexOfSpace() + 1 : columnWidth.value();
    }
  
    private shallWrapBySpace(columnWidth: ColumnWidth) {
      return this.indexOfSpace() > -1 && this.indexOfSpace() < columnWidth.value();
    }
  
    private indexOfSpace() {
      return this.value().indexOf(' ');
    }
  
    value() {
      return this.text;
    }
}
  
function wordWrap(text: string, columnWidth: number) {
    return wordWrapNoPrimitives(WrappableText.create(text), ColumnWidth.create(columnWidth)).value();
}
  
function wordWrapNoPrimitives(text: WrappableText, columnWidth: ColumnWidth): WrappableText {
    if (text.fitsIn(columnWidth)) {
      return text;
    }
    const wrappedText = text.wrappedText(columnWidth);
    const unwrappedText = text.unwrappedText(columnWidth);
    return wrappedText.concat(wordWrapNoPrimitives(unwrappedText, columnWidth));
}
  
describe('The Word Wrap', () => {
    it('empty text does not need to be wrapped', () => {
        expect(wordWrap('', 5)).toBe('');
        expect(wordWrap(null, 5)).toBe('');
        expect(wordWrap(undefined, 5)).toBe('');
    });

    it('small text does not need to be wrapped', () => {
        expect(wordWrap('hello', 5)).toBe('hello');
    });
      
    it('words are wrapped when do not fit the column width', () => {
        expect(wordWrap('longword', 4)).toBe('long\nword');
        expect(wordWrap('reallylongword', 4)).toBe('real\nlylo\nngwo\nrd');
    });
      
    it('spaces are preferred for wrapping', () => {
        expect(wordWrap('abc def', 4)).toBe('abc\ndef');
        expect(wordWrap('abc def ghi', 4)).toBe('abc\ndef\nghi');
        expect(wordWrap(' abcd', 4)).toBe('\nabcd');
    });
      
    it('does not allow for negative column width', () => {
        expect(() => wordWrap('hello', -5)).toThrow('Negative column width is not allowed');
    });
});