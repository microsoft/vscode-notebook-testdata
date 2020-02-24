A list of features for a Notebook **client**.

# Top-level structure

- Rendering
- Editor features
- Cell manipulation 
  - Commands/Keybindings
- Accessibility
- Language features
- Debug
- MISC

Annotations

| Mark | Description | 
| --- | --- |
| 🏃 | work in progress |
| ✔️ | supported |
| 1️⃣ | p1 |
| 2️⃣ | p2 |
| 🐍 | supported in Python extension | 
# Rendering

A notebook consists of an ordered list of cells. Each cell can be markdown content or source code with executed outputs. Currently we use `marked.js` to render markdown content and a full size monaco editor for source code.

Currently there are still two three missing pieces:

- [x] 🐍 MIME Types. Python ships with `nteract`.
  - [x] LaTeX. Supported by customn renderers.
  - [x] `application/json`.
  - [x] `image/*`. We render PNG and JEPG in core but svg and gifs should be rendered in webview/iframe. (GIF support is a must as we don't support videos).
  - [x] `application/scripts`.
- Metadata
  - [ ] Cell metadata which controls the renderings of cells, like `editable`, `execution_count`
  - [ ] Output metadata, like whether the output should be rendered in an isolated context.
  - [ ] Metadata **editing**
- Comm between output and extension
  - [ ] 2️⃣  API for notebook extensions to talk to the output rendered in webview

Fulls lists of cell types, output mime types and metadata we may want to support are listed below.

## Cell

- Code Cell
  - [x] Render source code in regular editor
  - [x] 🐍 1️⃣ Editor height grow with content.
    - Note: make sure word wrapping and folding (one example for content widgets) work properly.
  - [ ] View output in seperate view. For example view output in fullscreen (contributed by notebook extensions)
- Markdown Cell
  - [x] Live Preview
    - [x] Editor/Preview splited vertically
    - [ ] Side by side. Ref [Google Colab](https://colab.research.google.com/drive/16RMW8h7h2zcfuamLkhWucf2ooo82yky1#scrollTo=0h0u01uSB4nT). (The preview can be in an another editor group, similar to markdown preview to the side)
  - [ ] Markdown engine
    - [x] Commonmark
    - [x] GFM
    - [ ] 🐍 1️⃣ LaTeX
    - [ ] HTML (we have HTML support with marked.js but not full HTML)
    - [ ] Video. Note that VS Code doesn't ship with ffmpeg
    - [ ] Attachments. References to local resources.

## Output 

- [x] Now we delegate custom mimetype rendering to extensions so we will only implement limited mime type rendering in the core.

🐍 Python supports all Mimetypes which are supported by `nteract`.
Refs:

* [jupyterlab](https://jupyterlab.readthedocs.io/en/stable/user/file_formats.html)
* [ipython](https://ipython.readthedocs.io/en/stable/api/generated/IPython.core.formatters.html?highlight=text%2Flatex#IPython.core.formatters.DisplayFormatter)

The following MIME types are usually implemented by Notebook client. We track all mime types we support with [test files](https://github.com/rebornix/notebook-test/blob/master/samples/mimetypes.ipynb).

- Stream
  - [x] Text
  - [x] Error/ANSI
- Display Data
  - [x] text/plain
  - [x] text/markdown
  - [x] text/html
  - [x] image/png
  - [x] image/jpeg
  - [x] 1️⃣ image/svg+xml
  - [x] 1️⃣ application/javascript
  - [x] 1️⃣ application/json

Contributed by extensions

  - [x] Interactive JavaScript wigets. Contributed by extensions, like ipywidget or vega/vega-lite
  - [ ] 1️⃣ text/latex
  - [ ] 1️⃣ image/gif
  - [ ] 1️⃣ image/bmp
  - [ ] application/pdf
  - [ ] **Custom Mime Types** (`application/vnd*`). Similar to above, might require API extensibility for contributing custom vendor mime types handler

Notebook outputs might have mutiple mimetypes and notebook clients will choose the richest mime type they can render. The display order for mime types can be as below

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


## Cell metadata

Cell metadata is used to control the rendering of a cell, for example we can disable editing of markdown cells by setting `editable` to `false`.

Refs: [nbformat](https://nbformat.readthedocs.io/en/latest/format_description.html#cell-metadata)

- [ ] 1️⃣ editable/readonly
- [ ] 1️⃣ deletable
- [ ] 1️⃣ collapsed
- [ ] scrolled
- [ ] name
- [ ] tags
- [ ] format
- [ ] jupyter (namespace)
  - source_hidden
  - outputs_hidden
- [ ] execution (namespace)

## Output metadata

Output metadata can provide information of how to render an output.

Refs: [nbformat](https://nbformat.readthedocs.io/en/latest/format_description.html#output-metadata)

- [ ] 1️⃣ isolated. isolated output should be isolated into an iframe
- [ ] 1️⃣ dimensions. `"metadata" : { "image/png": { "width": 640, "height": 480, } }`
- [ ] needs_background. `light/dark`

# Editor Features

Notebooks contain text (markdown) and source code, so users would expect [code editing features](https://code.visualstudio.com/docs/editor/codebasics) from the notebook editor. 

- View/Model States
  - [x] 1️⃣ Save
  - [ ] 🐍 1️⃣ SaveAs
  - [ ] 🐍 1️⃣ Auto Save
  - [ ] 🐍 Hot Exit
  - [ ] View States
    - [ ] 1️⃣ Cursor/Selection. Cursor states should be tracked when users scroll the notebook (our virtualization optimization leads to state loss now).
    - [ ] 1️⃣ Move editor across editor groups and persist states
- Basic Editing ([ref](https://code.visualstudio.com/docs/editor/codebasics))
  - [ ] 🐍 1️⃣ Find in File. Users might want to F&R in editable markdown cells too.
  - [ ] 1️⃣ Replace in File.
  - [ ] Find & Replace in Cell 
  - [ ] Folding
  - [ ] Multi cursor across cells
  - [ ] Undo/Redo across cells. Cell operations should be saved to Undo stack as well.
  - [ ] 1️⃣ Cursor movement across cells.
  - [ ] Minimap for the whole notebook document
  - [ ] Snippets. Code snippets and cell snippets
  - [ ] Diff. 
    - [ ] Text based diff. This one might require API works as notebook documents might not be persistent on disk.
    - [ ] Rich Diff. Similar to NBViewer, the core needs to diff and render rich diff.

# Cell Manipulation

Currently we put all cell related actions in the context menu but it's not easily accessibable, we may want to have a better UX to ensure users can be **productive**.

Refs: [jupyterlab api for cell management](https://jupyterlab.readthedocs.io/en/stable/developer/notebook.html)

- UX polish
  - [ ] 🐍 Run code cell, Edit
  - [ ] 🐍 Toolbar for other actions
- Commands
  - [x] Create new markdown cell
  - [x] Create new code cell
  - [ ] 🐍 1️⃣ Move Cell
  - [x] Delete Cell
  - [ ] Drag and Drop. Supported in JupyterLab
  - [ ] Expand/Collapse outputs
  - [ ] 🐍 1️⃣ Undo/Redo cell manipulation
  - [x] Execute code cell
  - [ ] Cell selection
  - [ ] 1️⃣ Clear output

## Commands/Keybindings

Jupyter notebook web app has two modes: Command mode and Edit mode, which is similar to Vim's mode system. In Command mode, users can use keybindings to manipulate cells while Edit mode is used to edit content.

Keybindings in Edit mode are pretty close to VS Code's builtin keybindings however Command mode has many conflicts with the core. We are going to implement the commands and users (or we) can build keymaps on top of them.

### Command Mode

Command Mode (press Esc to enable)

| Shortcut | Command | Status | Python | 
| --- | --- | --- | --- | 
| F | find and replace | | |
| ↩ | enter edit mode | | |
| ⌘⇧F | open the command palette | | |
| ⌘⇧P | open the command palette | ✔️ | |
| P | open the command palette | | |
| ⇧↩ | run cell, select below | 1️⃣  | |
| ⌃↩ | run selected cells | 1️⃣ | |
| ⌥↩ | run cell and insert below | 1️⃣ | |
| Y | change cell to code | 1️⃣ | |
| M | change cell to markdown | 1️⃣ | |
| R | change cell to raw | | |
| 1 | change cell to heading 1 | | |
| 2 | change cell to heading 2 | | |
| 3 | change cell to heading 3 | | |
| 4 | change cell to heading 4 | | |
| 5 | change cell to heading 5 | | |
| 6 | change cell to heading 6 | | |
| K | select cell above | | |
| ↑ | select cell above | 1️⃣ | |
| ↓ | select cell below | 1️⃣ | |
| J | select cell below | | |
| ⇧K | extend selected cells above | | |
| ⇧↑ | extend selected cells above | | |
| ⇧↓ | extend selected cells below | | |
| ⇧J | extend selected cells below | | |
| A | insert cell above | 1️⃣ | |
| B | insert cell below | 1️⃣ | |
| X | cut selected cells | 1️⃣ | |
| C | copy selected cells | 1️⃣ | |
| ⇧V | paste cells above | 1️⃣ | |
| V | paste cells below | 1️⃣ | |
| Z | undo cell deletion | 1️⃣ | |
| D,D | delete selected cells | | |
| ⇧M | merge selected cells, or current cell with cell below if only one cell is selected | | |
| ⌘S | Save and Checkpoint | | |
| S | Save and Checkpoint | 1️⃣ | |
| L | toggle line numbers | | |
| O | toggle output of selected cells | | |
| ⇧O | toggle output scrolling of selected cells | | |
| H | show keyboard shortcuts | | |
| I,I | interrupt the kernel | | |
| 0,0 | restart the kernel (with dialog) | | |
| Esc | close the pager | | |
| Q | close the pager | | |
| ⇧L | toggles line numbers in all cells, and persist the setting | | |
| ⇧␣ | scroll notebook up | | |
| ␣ | scroll notebook down | | |

### Edit Mode

Edit Mode (press Enter to enable)

| Shortcut | Command | Status | Python |
| --- | --- | --- | --- |
| ⇥ | code completion or indent | ✔️  | |
| ⇧⇥ | tooltip | | |
| ⌘] | indent | ✔️  | |
| ⌘[ | dedent | ✔️ | |
| ⌘A | select all | ✔️ | |
| ⌘Z | undo | ✔️ | |
| ⌘/ | comment | ✔️ | |
| ⌘D | delete whole line | | |
| ⌘U | undo selection | ✔️ | |
| Insert | toggle overwrite flag | ✔️ | |
| ⌘↑ | go to cell start | ✔️ | |
| ⌘↓ | go to cell end | ✔️ | |
| ⌥← | go one word left | ✔️ | |
| ⌥→ | go one word right | ✔️ | |
| ⌥⌫ | delete word before | ✔️ | |
| ⌥⌦ | delete word after | ✔️ | |
| ⌘⇧Z | redo | ✔️ | |
| ⌘⇧U | redo selection | | |
| ⌃K | emacs-style line kill | ✔️ | |
| ⌘⌫ | delete line left of cursor | ✔️ | |
| ⌘⌦ | delete line right of cursor | ✔️ | |
| ⌃M | enter command mode | | |
| Esc | enter command mode | | |
| ⌘⇧F | open the command palette | | |
| ⌘⇧P | open the command palette | ✔️ | |
| ⇧↩ | run cell, select below | | |
| ⌃↩ | run selected cells | | |
| ⌥↩ | run cell and insert below | | |
| ⌃⇧Minus | split cell at cursor | | |
| ⌘S | Save and Checkpoint | | |
| ↓ | move cursor down | | |
| ↑ | move cursor up | | |

# Accessibility

Classic Jupyter Notebook is lack of good accessibility support for code editing and navigations. While building the native notebook editor in core, we should make sure it's equally accessible as the text editor.

Users from community already provides concrete examples of accessibility issues in classic Jupyter Notebook.

Refs: 
  * https://github.com/jupyter/notebook/issues/1801
  * https://github.com/jupyterlab/jupyterlab/issues/4878
# Language Features

Source code in code cells in a notebook are loosely coupled. You can import a module in one code cell and then use it directly in another code cell, however it doesn't mean that the `import` cell has to be layed before the other cell. As long as the `import` cell is executed first, the other cell is valid.

When the notebook is not connected to a kernel or the execution sequence is unknown (which requires users' input), the language service for code cells needs to be fuzzy. The language service for the notebook may want to analyze all code cells and provide hints/suggestions based on heuristics.

Language features can fall into following groups by their requirements

## Definiton/Suggestion

To support **Completions**, **Parameter hints**, **Hover** and **Diagnostics**, language service will read live content from every code cell

- [ ] API: Expose code cells contents and event listeners for content change
- [ ] Extension register themselves as language features providers

🐍 Completions, Parameter Hints, Hover. Code cells are concatenated from top to bottom. 

## Navigation

Code navigation includes **Go to Definition/Implmenation**, **References/Peek View** and **Call hierarchy**. The challenge here is jumping between code cells in a notebook, instead of opening a regular code editor.

- [ ] Core: Support opening editor/models from a notebook document

## Edits across cells

Features like **Refactoring** and **Rename** might require Workspace-like Edits.

- [ ] Core & API: Support edits for multiple code cells


## Embedded model support

**Formatters** and **Symbols** can work seamlessly on individual code cells but we may also want a Notebook level (between normal document and workspace) formaters or symbols provider

- [ ] Format notebook (format cells with different languages)
- [ ] Notebook symbols (combination of symbols from different cells)


## Cell agnostic

Following features can be cell agnostic and we need to make sure the code cells are labeled as the right language

- [ ] Syntax highlighting
- [ ] Link detection
- [ ] Color
- [ ] Folding
- [ ] Codelens


Refs:

* [Google Colaboratory](https://colab.research.google.com/notebooks/intro.ipynb#recent=true)


# Debug

In Jupyter Notebook, you can run code cell line by line and the kernel behaves like a debugger. In theory, debugging a code cell is similar to debugging a file. The notebook provider provides content from the active code cell in current notebook document, and initializes the debugging session with the kernel. The provider is also the debug adapter in this case.

We need to validate if this can work and investigate how debugging should work when the kernel is not connected.


# MISC

Bugs / Polish items

- [x] Notebook file not loaded from extension when opened the second time
- [x] Activation events for notebook provider. Activate extension when a notebook file is opened.
- [ ] Editing in nested code editor, cursor should always be visible.
- [x] Vim Escape Key 
  * Currently workaround the issue by adding keybinding
  ```json
  {
        "key": "escape",
        "command": "extension.vim_escape",
        "when": "editorTextFocus && vim.active && !inDebugRepl && vim.mode != 'Normal'"
    },
    {
        "key": "escape",
        "command": "-extension.vim_escape",
        "when": "editorTextFocus && vim.active && !inDebugRepl"
    }
  ```
- [x] Python extension activation slows down notebook file opening. (Mitigated when text models in code cells are lazily resolved.)
- [ ] Saving: `activeNotebookDocument` is `undefined` if there is no active code cell being edited. `ExtHostNotebookController._documents` is empty when that happens.
- [ ] Markdown preview and text editor somethings out of sync

