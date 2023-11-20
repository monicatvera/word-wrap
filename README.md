# Kata word wrap
Kata proposed by Robert C. Martin to work with the priority of the transformation premise is the "word wrap" kata. It is basically about developing the algorithm implemented by many text editors such as Notepad ++ or gedit, where lines of text that do not fit in the width of the window are split into more shorter lines so that the text can be read in the same width.

The objective is to develop with TDD and apply the premise of transformation priority without being strict in the steps but in the order.

Develop the wordWrap function that consists of two parameters: the first, the text, and the second, the column width.

### Reflection on the list of examples prior to development
In the first example, the function receives a short text smaller than the column width, therefore it does not need to add a line break. The next one is a text that we must split once, then we have a longer word that must be split more times. Other more complex examples in which spaces take precedence over column width. For example, if we have a space at position 3 and a column at position 4, we will start from that space. Finally, we will handle special cases: when we receive null text the function must return empty text and if it receives a column with a negative number it must throw an exception, since negative column sizes are not allowed.

Examples to work on in the tests:

```
- wordWrap('',5) ⇒ ''
- wordWrap('hello',5) ⇒ 'hello'
- wordWrap('longword',4) ⇒ 'long\nword'
- wordWrap('reallylongword',4) ⇒ 'real\nlylo\nngwo\nrd'

- wordWrap('abc def',4) ⇒ 'abc\ndef'
- wordWrap('abc def ghi',4) ⇒ 'abc\ndef\nghi'

- wordWrap(' abcdf',4) ⇒ '\nabcd\nf'
- wordWrap(null,5) ⇒ ''
- wordWrap('hello',-5) ⇒ throw exception
```

## Test list
List of possible tests that we want to do based on their difficulty:
- [x] **{} ⇒ nil**: if there is no code to return null..
- [x] **nil ⇒ constant**: from null to returning a literal value.
- [x] **constant ⇒ constant+**: from a simple literal value to a more complex one.
- [x] **constant ⇒ scalar**: from a literal value to a variable.
- [x] **statement ⇒ statements**: add more lines of code without conditionals.
- [x] **unconditional ⇒ if**: introduce a conditional.
- [x] **scalar ⇒ array**: from simple variable to collection.
- [x] **array ⇒ container**: from collection to container.
- [x] **statement ⇒ recursion**: introduce recursion.
- [x] **if ⇒ while**: convert conditional to loop.
- [x] **expression ⇒ function**: replace expression with function call.
- [x] **variable ⇒ assignment**: mutate the value of a variable.
