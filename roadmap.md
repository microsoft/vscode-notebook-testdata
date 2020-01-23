A list of features for a Notebook **client**.


## Top-level structure

- Rendering
  - Cell
  - Output
  - Cell metadata
  - Output metadata
- Editor features
- Cell manipulation 
- Keybindings/Commands
  - Command mode
  - Editing mode
- Language features


Annotations

| Mark | Description | 
| --- | --- |
| 🏃 | work in progress |
| ✔️ | supported |


## Rendering

### Cell

| Cell type | |  Notebook (exploration) | Notes | 
| ------------- | :---------: | ----- | ------------- |
| Code | | ✔️ | |
| | View output separately | | For example view output in fullscreen |
| Markdown  | | | |
| | Top Down rendering | ✔️ | |
| | Side by side rendering |  | Google Colab did so |
| | Commonmark  | ✔️ | |
| | GFM  | ✔️ | |
| | LaTeX equations  |  | |
| | HTML  | | Simple HTML like tables |
| | Video | | VS Code doesn't ship with ffmpeg |
| | Attachments | | Used in Markdown |

### Output 

Refs: [jupyterlab](https://jupyterlab.readthedocs.io/en/stable/user/file_formats.html)

| Output type | MIME type |  Notebook (exploration) | Notes | 
| :---------: | :--------- | :---------: | :--------- |
| stream |  |  | |
|  | text | ✔️ | |
| error | | | |
| | ansi | ✔️ | |
| display_data |  |  | |
|  | text/plain | | |
|  | text/markdown | | |
|  | text/latex |  | | 
|  | image/png | ✔️ | | 
|  | image/svg |  | | 
|  | image/bmp |  | | 
|  | image/gif |  | | 
|  | image/jpeg |  | | 
|  | image/svg+xml |  | | 
|  | video | | VS Code doesn't ship with ffmpeg |
|  | text/html | ✔️ | | 
|  | application/javascript |  | | 
|  | application/json |  | | 
|  | application/pdf |  | | 
|  | Interactive JavaScript wigets  | ✔️ | Contributed by extensions, like ipywidget or vega/vega-lite |
|  | **Custom Mime Types** (`application/vnd*`) |  | Requires API or extensibility for contributing custom vender mime |  types handlers |


### Cell metadata

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

Refs: [nbformat](https://nbformat.readthedocs.io/en/latest/format_description.html#output-metadata)

|               |  Notebook (exploration) | Notes | 
| ------------- | -----:| ------------- |
| isolated |  | isolated outpuyt should be isolated into an iframe |
| dimensions |  | `"metadata" : { "image/png": { "width": 640, "height": 480, } }` |


## Editor Features

Ideally users can get similar experience with Notebook Editor as a normal Monaco editor.

|               |  Jupyter  | Notebook (exploration) | Notes | 
| ------------- |:-------------:| -----:| ------------- |:-------------:|
| Find & Replace in File  | ✔️ | |  |
| Find & Replace in Cell  | ✔️ | |  |
| Multi Cursor  |  | |  |
| Minimap  |  |  | |
| Auto Save | ✔️ | | |
| Hot Exit |  | | |
| Save As | ✔️ | | |
| Snippets |  | | |
| Diff | ✔️ | | Rich diff is supported by NBViewer |
| Undo/Redo (across cells) | | | |
| Cursor Movement (across cells) | ✔️ | | |
| Line Numbers | ✔️ |  | This can be done by langauge/file specific settings |



## Cell Manipulation

Refs: [jupyterlab api for cell management](https://jupyterlab.readthedocs.io/en/stable/developer/notebook.html)

|               |  Jupyter   | Notebook (exploration) | Notes | 
| ------------- |:-------------:| :---------: |:-------------:|
| Top level toolbar  | ✔️ |  | |
| Create new markdown cell  | ✔️ | ✔️ | |
| Create new code cell  | ✔️ | 🏃 | we need to implement langauge picker |
| Move cell  | ✔️ |  |  |
| Delete cell  | ✔️ | 🏃 |  |
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

|               |  Jupyter  | Notebook (exploration) | Notes | 
| ------------- |:-------------:| -----:| ------------- |
| Rename  |  | |  |
| Refactor  |  | |  |
| Diagnostics  |  | |  |
| Completion  |  | |  |
| Go to Definition/Implmenation  |  | |  |
| Codelens  |  | |  |
| Hover  |  | |  |
| Symbol  |  | |  |
| References  |  | |  |
| Formatters  |  | |  |
| Link  |  | |  |
| Color  |  | |  |
| Folding  |  | |  |
| Call hierarchy  |  | |  |
| Breadcrumbs |  | | |
| Peek View |  | | |





---


Refs:

* [Google Colaboratory](https://colab.research.google.com/notebooks/intro.ipynb#recent=true)