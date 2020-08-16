'use babel';

import {
  CompositeDisposable,
  BufferedProcess
} from 'atom';

export default {
  config: {
    fmtOnSave: {
      type: 'boolean',
      default: true,
      title: 'Format Entire File On Save',
      description: 'Run `terragrunt hclfmt` when files are saved.'
    },
    binPath: {
      type: 'string',
      default: 'terragrunt',
      title: 'Path to the `terragrunt` executable'
    },
    extensions: {
      type: 'array',
      default: ['.hcl'],
      title: 'Extension to auto-format'
    }
  },

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.workspace.observeTextEditors((textEditor) => {
      this.subscriptions.add(textEditor.onDidSave((event) => {
        if (!this.grammarInScope(textEditor.getGrammar().fileTypes)) return;
        if (!atom.config.get('atom-terragrunt-hclfmt.fmtOnSave')) return;
        this.format(event.path);
      }));
    }));

    this.subscriptions.add(atom.commands.add('atom-text-editor[data-grammar~="hcl"]', 'atom-terragrunt-hclfmt:format', () => {
      let textEditor = atom.workspace.getActiveTextEditor();
      if (!this.grammarInScope(textEditor.getGrammar().fileTypes)) return;
      textEditor.save();
      if (!atom.config.get('atom-terragrunt-hclfmt.fmtOnSave')) {
        this.format(textEditor.getPath());
      }
    }));
  },

  grammarInScope(fileTypes) {
    for (let t of fileTypes) {
      for (let e of atom.config.get('atom-terragrunt-hclfmt.extensions')) {
        if (e.replace(/^\./, '') == t) {
          return true;
        }
      }
    }
    return false;
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  format(file) {
    new BufferedProcess({
      command: atom.config.get('atom-terragrunt-hclfmt.binPath'),
      args: ['hclfmt', '--terragrunt-hclfmt-file', file]
    });
  }

};
