# Escaping Special Characters in MDX

When writing content in MDX (Markdown + JSX), you might encounter compilation errors when using certain special characters. This is because MDX attempts to parse these characters as code components or variables.

Here is a guide on how to handle the most common troublemakers: `<`, `>`, `{`, and `}`.

## 1. Less Than (`<`) and Greater Than (`>`)

In MDX, the `<` character marks the start of a JSX tag (like `<div>` or `<Component>`). If you write it as plain text, MDX might think you are trying to open a component.

**Problem:**
```text
The value should be <10.
```
*Error: Unexpected character...*

**Solution:**
Use the HTML entity code `&lt;` for "less than" and `&gt;` for "greater than".

```text
The value should be &lt;10.
```
**Output:** The value should be <10.

Alternatively, you can wrap the text in an inline code block if it represents code:
```text
The value should be `<10`.
```

## 2. Curly Braces (`{` and `}`)

Curly braces in MDX are used for JavaScript expressions (interpolation). Even inside normal text, MDX might try to evaluate what is inside them.

**Problem:**
```text
The syntax is {variable}.
```
*Error: variable is not defined*

**Solution:**
You have a few options:

### A. Escape with Backslash
You can sometimes escape them, but it's tricky in MDX. A better way for text is using HTML entities.
- `{` = `&#123;`
- `}` = `&#125;`

### B. Use Code Blocks
If you are showing code, always use backticks. MDX ignores processing inside code blocks.

```javascript
const obj = { key: 'value' };
```

### C. Use the `<span>` trick (Advanced)
If you really need raw text, you can render it as a string literal:
```text
{'This is some text with { braces }'}
```

## 3. LaTeX Math

If you are using a math plugin, `$` signs can also trigger processing. If you just want a dollar sign, escape it: `\$`.

If you are writing complex formulas that use `{}` (like `x_{i}`), make sure you are inside a designated math block or code block, otherwise MDX will try to interpret the `{i}` as a JS variable.

```math
x_{i} = y^{2}
```

## 4. Backticks (`)

Backticks are used for code blocks. But what if you need to show a backtick *inside* an inline code block?

**Problem:**
Writing `` ` `` inside ` ` ends the code block early.

**Solution:**
Use more backticks to wrap the content than what is inside.

- To show one backtick: Use double backticks.
```text
`` ` ``
```
**Output:** ` ` `

- To show three backticks (for a code block example): Use four backticks.
```text
````markdown
```javascript
const x = 1;
```
````
```

## 5. Pipe Character (`|`) in Tables

The pipe symbol is used to separate table cells. If you need to write a literal pipe inside a cell, it will break the table structure.

**Problem:**
```markdown
| Command | Description |
|---------|-------------|
| ls -la | Lists files | grep "txt" |
```
MDX thinks the pipe before `grep` is a cell separator.

**Solution:**
Escape it with a backslash `\|` or use the HTML entity `&#124;`.

## 6. JSX vs HTML Comments

Be careful with comments in MDX.

- **HTML Comments** (`<!-- comment -->`): These are valid in Markdown but might show up in some parsers or cause hydration issues in React if mixed with components.
- **JSX Comments** (`{/* comment */}`): These are safe and strictly removed from the output.

**Recommended:** Use JSX comments when inside the MDX file structure to be safe.

```javascript
{/* This note will not appear in the final page */}
```

## 7. Markdown Syntax Triggers

Some characters have special meaning in Markdown itself, not just MDX/JSX.

*   **Asterisks (`*`) and Underscores (`_`)**: These trigger italics or bold. If you are documenting `variable_name`, the underscore might confuse the parser.
    *   **Solution**: Escape with `\` (e.g. `variable\_name`).
*   **Hashtag (`#`)**: Triggers headers if at the start of a line.
    *   **Solution**: Escape with `\#`.
*   **Brackets (`[]`)**: Triggers links.
    *   **Solution**: Escape with `\[`.

## Summary Table

| Character | Name          | HTML Entity | Escape Method        |
|-----------|---------------|-------------|----------------------|
| `<`       | Less Than     | `&lt;`      | -                    |
| `>`       | Greater Than  | `&gt;`      | -                    |
| `{`       | Opening Brace | `&#123;`    | -                    |
| `}`       | Closing Brace | `&#125;`    | -                    |
| `\|`      | Pipe          | `&#124;`    | `\|`                 |
| `` ` ``   | Backtick      | -           | Use double backticks |
| `*`       | Asterisk      | `&#42;`     | `\*`                 |
| `_`       | Underscore    | `&#95;`     | `\_`                 |
| `#`       | Hash          | `&#35;`     | `\#`                 |
| `[`       | Bracket       | `&#91;`     | `\[`                 |

Happy writing!
