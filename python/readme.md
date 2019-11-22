## Python Notebook

* Install Python extension
* Open `hello.py`. Python notebook related commands should be rendered as codelens
  * Click **Run Cell**
  * For first time users, it will install Notebook related dependencies for you, which might take a few minutes
  * Once all the dependencies installed, you can
* Open `hello.ipynb`. A jupyter notebook will be opened in a webview
  * Every cell in the editor is a monaco editor, in which you can write code with proper language features, like Auto Complete, Hover and Siganature help.


## Technical Details

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
* keybindings
  * listen to keyboard events on the editor and handle simple ones `meta+up/down`, `meta+s`.
  * the rest of them are all Monaco builtin ones
