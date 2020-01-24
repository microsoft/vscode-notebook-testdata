A list of features for a Notebook **client**.

# Top-level structure

- Rendering
- Editor features
- Cell manipulation 
- Keybindings/Commands
- Language features

Annotations

| Mark | Description | 
| --- | --- |
| 🏃 | work in progress |
| ✔️ | supported |

## Rendering

A notebook consists of an ordered list of cells. Each cell can be markdown content or source code with executed outputs. Currently we use `marked.js` to render markdown content and a full size monaco editor for source code.



### Cell

| Cell type | |  Notebook (exploration) | Notes | 
| ------------- | :---------: | ----- | ------------- |
| Code | | | |
| | Render editor with language | ✔️ |  |
| | Editor height grow with content | 🏃 | Note: make sure word wrapping and folding works properly |
| | View output in seperate view | | For example view output in fullscreen |
| Markdown  | | | |
| | Live Preview | ✔️ | |
| | Side by side rendering |  | Google Colab did so |
| | Commonmark  | ✔️ | |
| | GFM  | ✔️ | |
| | LaTeX equations  |  | |
| | HTML  | | Requires sanitization. |
| | Video | | VS Code doesn't ship with ffmpeg |
| | Attachments | | Used in Markdown |


### Output 

Refs:

* [jupyterlab](https://jupyterlab.readthedocs.io/en/stable/user/file_formats.html)
* [ipython](https://ipython.readthedocs.io/en/stable/api/generated/IPython.core.formatters.html?highlight=text%2Flatex#IPython.core.formatters.DisplayFormatter)

The following MIME types are usually implemented by Notebook client.

| Output type | MIME type |  Notebook (exploration) | Notes | 
| :---------: | :--------- | :---------: | :--------- |
| stream |  |  | |
|  | text | ✔️ | |
| error | | | |
| | ansi | ✔️ | |
| display_data |  |  | |
|  | text/plain | ✔️ | |
|  | text/markdown | | |
|  | text/latex |  | | 
|  | text/html | ✔️ | | 
|  | image/png | ✔️ | | 
|  | image/jpeg | ✔️ | | 
|  | image/svg |  | | 
|  | image/bmp |  | | 
|  | image/gif |  | | 
|  | image/svg+xml |  | | 
|  | video | | VS Code doesn't ship with ffmpeg |
|  | application/javascript |  | | 
|  | application/json |  | | 
|  | application/pdf |  | | 
|  | Interactive JavaScript wigets  | ✔️ | Contributed by extensions, like ipywidget or vega/vega-lite |
|  | **Custom Mime Types** (`application/vnd*`) |  | Requires API or extensibility for contributing custom vender mime |  types handlers |

A notebook output might have mutiple mimetypes and a notebook client will choose the richest mime type it can render. A display order for mime types can be as below

* application/json
* application/javascript
* text/html
* image/svg+xml
* text/markdown
* text/latex
* image/svg+xml
* image/gif
* image/png
* image/jpeg
* application/pdf
* text/plain

Internally a notebook client should maintain two lists, one for mime types it can render and one for the display order.


### Cell metadata

Cell metadata is used to control the rendering of a cell, for example we can disable editing of markdown cells by setting `editable` to `false`.

Refs: [nbformat](https://nbformat.readthedocs.io/en/latest/format_description.html#cell-metadata)

|               |  Notebook (exploration) | Notes | 
| ------------- | -----:| ------------- |
| editable |  | |
| scrolled  |  | |
| collapsed  |  | |
| deletable  |  | |
| name  |  | |
| execution  |  | |
| tags |  | |
| format |  | |

### Output metadata

Output metadata can provide information of how to render an output.

Refs: [nbformat](https://nbformat.readthedocs.io/en/latest/format_description.html#output-metadata)

|               |  Notebook (exploration) | Notes | 
| ------------- | -----:| ------------- |
| isolated |  | isolated outpuyt should be isolated into an iframe |
| dimensions |  | `"metadata" : { "image/png": { "width": 640, "height": 480, } }` | 
| needs_background | | light/dark |

## Editor Features

Below are features users usually expect from a normal text editor and we should see what we can support in the Notebook Editor and how.

|               |  Jupyter  | Notebook (exploration) | Notes | 
| ------------- |:-------------:| -----: |:-------------:|
| Find & Replace in File  | ✔️ | | Do we allow F&R in editable Markdown cells? |
| Find & Replace in Cell  | ✔️ | |  |
| Multi Cursor  |  | | Multi Cursor across cells |
| Minimap  |  |  | Minimap for the whole document |
| Auto Save | ✔️ | | |
| Hot Exit |  | | Hook up with Working Copy service |
| Save As | ✔️ | | Notebook provider should implement both `save` and `saveAs` |
| Snippets |  | | Code snippet and Cell snippet |
| Diff | ✔️ | | Rich diff is supported by NBViewer |
| Undo/Redo (across cells) | | | Requires a global undo/redo stack across monaco editors |
| Cursor Movement (across cells) | ✔️ | | Mouse down listeners on editors |
| Line Numbers | ✔️ |  | This might be done by langauge/file specific settings |

## Cell Manipulation

Currently we put all cell related actions in the context menu but it's not easily accessibable, we may want to have a better UX to ensure users can be **productive**.

Refs: [jupyterlab api for cell management](https://jupyterlab.readthedocs.io/en/stable/developer/notebook.html)

|               |  Jupyter   | Notebook (exploration) | Notes | 
| ------------- |:-------------:| :---------: |:-------------:|
| Top level toolbar  | ✔️ |  | |
| Create new markdown cell  | ✔️ | ✔️ | |
| Create new code cell  | ✔️ | 🏃 | we need to implement langauge picker |
| Move cell  | ✔️ |  |  |
| Delete cell  | ✔️ | ✔️ |  |
| Drag and Drop |  | | Supported in JupyterLab |
| Expand/Collapse outputs |  | | |
| Undo/Redo cell manipulation | ✔️ | | |
| Execute code cell | ✔️ | ✔️ | |
| Mutiple cell selection | ✔️ |  | |
| Clear output | ✔️ | | |


## Keybindings

### Command Mode

Command Mode (press Esc to enable)

| Shortcut | Command | Notebook (exploration) |
| --- | --- | --- |
| F | find and replace | |
| ↩ | enter edit mode | |
| ⌘⇧F | open the command palette | |
| ⌘⇧P | open the command palette | |
| P | open the command palette | |
| ⇧↩ | run cell, select below | |
| ⌃↩ | run selected cells | |
| ⌥↩ | run cell and insert below | |
| Y | change cell to code | |
| M | change cell to markdown | |
| R | change cell to raw | |
| 1 | change cell to heading 1 | |
| 2 | change cell to heading 2 | |
| 3 | change cell to heading 3 | |
| 4 | change cell to heading 4 | |
| 5 | change cell to heading 5 | |
| 6 | change cell to heading 6 | |
| K | select cell above | |
| ↑ | select cell above | |
| ↓ | select cell below | |
| J | select cell below | |
| ⇧K | extend selected cells above | |
| ⇧↑ | extend selected cells above | |
| ⇧↓ | extend selected cells below | |
| ⇧J | extend selected cells below | |
| A | insert cell above | |
| B | insert cell below | |
| X | cut selected cells | |
| C | copy selected cells | |
| ⇧V | paste cells above | |
| V | paste cells below | |
| Z | undo cell deletion | |
| D,D | delete selected cells | |
| ⇧M | merge selected cells, or current cell with cell below if only one cell is selected | |
| ⌘S | Save and Checkpoint | |
| S | Save and Checkpoint | |
| L | toggle line numbers | |
| O | toggle output of selected cells | |
| ⇧O | toggle output scrolling of selected cells | |
| H | show keyboard shortcuts | |
| I,I | interrupt the kernel | |
| 0,0 | restart the kernel (with dialog) | |
| Esc | close the pager | |
| Q | close the pager | |
| ⇧L | toggles line numbers in all cells, and persist the setting | |
| ⇧␣ | scroll notebook up | |
| ␣ | scroll notebook down | |

### Edit Mode

Edit Mode (press Enter to enable)

| Shortcut | Command | Notebook (exploration) |
| --- | --- | --- |
| ⇥ | code completion or indent | |
| ⇧⇥ | tooltip | |
| ⌘] | indent | |
| ⌘[ | dedent | |
| ⌘A | select all | |
| ⌘Z | undo | |
| ⌘/ | comment | |
| ⌘D | delete whole line | |
| ⌘U | undo selection | |
| Insert | toggle overwrite flag | |
| ⌘↑ | go to cell start | |
| ⌘↓ | go to cell end | |
| ⌥← | go one word left | |
| ⌥→ | go one word right | |
| ⌥⌫ | delete word before | |
| ⌥⌦ | delete word after | |
| ⌘⇧Z | redo | |
| ⌘⇧U | redo selection | |
| ⌃K | emacs-style line kill | |
| ⌘⌫ | delete line left of cursor | |
| ⌘⌦ | delete line right of cursor | |
| ⌃M | enter command mode | |
| Esc | enter command mode | |
| ⌘⇧F | open the command palette | |
| ⌘⇧P | open the command palette | |
| ⇧↩ | run cell, select below | |
| ⌃↩ | run selected cells | |
| ⌥↩ | run cell and insert below | |
| ⌃⇧Minus | split cell at cursor | |
| ⌘S | Save and Checkpoint | |
| ↓ | move cursor down | |
| ↑ | move cursor up | |

## Language Features

Source code in code cells in a notebook are loosely coupled. You can import a module in one code cell and then use it directly in another code cell, however it doesn't mean that the `import` cell has to be layed before the other cell. As long as the `import` cell is executed first, the other cell is valid.

When the notebook is not connected to a kernel or the execution sequence is unknown (which requires users' input), the language service for code cells needs to be fuzzy. The language service for the notebook may want to analyze all code cells and provide hints/suggestions based on heuristics.

Language features can fall into following groups by their requirements

### Definiton/Suggestion

To support **Completions**, **Parameter hints**, **Hover** and **Diagnostics**, language service will read live content from every code cell

- [ ] Expose code cells contents and event listeners for content change

### Navigation

Code navigation includes **Go to Definition/Implmenation**, **References/Peek View** and **Call hierarchy**. The challenge here is jumping between code cells in a notebook, instead of opening a regular code editor.

- [ ] Support opening editor/models from a notebook document

### Edits across cells

Features like **Refactoring** and **Rename** might require Workspace-like Edits.

- [ ] Support edits for multiple code cells


### Embedded model support

**Formatters** and **Symbols** can work seamlessly on individual code cells but we may also want a Notebook level (between normal document and workspace) formaters or symbols provider

- [ ] Format notebook (format cells with different languages)
- [ ] Notebook symbols (combination of symbols from different cells)


### Cell agnostic

Following features can be cell agnostic and we need to make sure the code cells are labeled as the right language

* Syntax highlighting
* Link detection
* Color
* Folding
* Codelens


Refs:

* [Google Colaboratory](https://colab.research.google.com/notebooks/intro.ipynb#recent=true)


