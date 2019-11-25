# Notebook

## Python Notebook

* Install [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
* Open `samples/hello.py`. Python notebook related commands should be rendered as codelens
  * Click **Run Cell**
  * For first time users, it will install Notebook related dependencies, which might take a few minutes
  * Once all the dependencies installed, you can
* Open `samples/hello.ipynb`. A jupyter notebook will be opened in a webview
  * Every cell in the editor is a monaco editor, in which you can write code with language features support, like Auto Complete, Hover and Siganature help.


### Technical Details

* open a `ipynb` file
  * a text editor is opened first, then closed and finally a webview is opened
* editors in the webview
  * load `monaco-editor` through webpack
  * no web worker in webview, everything then runs in the main thread, e.g., link detection
  * every notebook cell is a monaco editor with its own standalone services.
    * 👓standalone services can be shared across different instances of monaco editor.
  * full monaco editor created even when it's readonly mode
    * 👓`colorize` api can be used here
* themes
  * tokenization with textmate web assembly
* language features
  * language services run in the main extension side, which listen to changes and requests from the webview
    * model creation/deletion and content change
    * completion, hover and signature requests
    * 👓 it's not using [`monaco-languageclient`](https://github.com/TypeFox/monaco-languageclient)
* keybindings
  * listen to keyboard events on the editor and handle simple ones `meta+up/down`, `meta+s`.
  * the rest of them are all Monaco builtin ones
* missing pieces
  * debugging
  * keymaps/commands from VS Code
  * decorations/codelens/etc contributed by other extensions



## ADS

* Install [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download?view=sql-server-ver15)
* Open `hello.ipynb`. Choose `Python3` from Kernel dropdown list


### Technical Details

* Editor
    * Custom Editor with mixed rendering:
        * markdown, html, latex, svg, text. Sanitize and render as HTML
        * source code with Monaco Editor
    * Every cell and output is a web component
* Data are loaded through Notebook Provider
    * the shape is similar to all other providers
    * provide available kernels
    * notebook manager (for managing notebook file in the custom editor)
        * provides content (`Cell`s)
        * provides a session manager
            * creates a session for every notebook
            * session is responsible for launching kernels and handling requests and responses to the kernel
        * kernel is responsible for code cell execution
    * provide `save` handler for notebooks
 * Missing pieces
    * Currently all editors in the notebook is specially initialzied
        * It pretends to be in a diff editor (to disable a bunch of features)
        * No minimap, rulers, indent guides
        * No **parameter hints**, no bracket matching
    * Since every code cell is a standalone monaco editor, there is no language features across cells, like suggestions from above code cells.
        * Technically it can be solved by registering a completion provider for Notebook cells' models.
    * No virtualization.


## Benchmarks

See [details](https://github.com/rebornix/notebook-test/issues/1#issue-527483193)