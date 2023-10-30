# TMUX CONFIG

## Change prefix
1. open `~/.tmux.conf`
2. add `set -g prefix KEY` (replace `KEY` with your key, example `set -g prefix C-a` for `Ctrl+a`
3. using prefix with `Ctrl` you need to add `set -s escape-time 0` (to make `a` as part of prefix for instead)
4. update `~/.tmux.conf` using `tmux source-file ~/.tmux.conf`

## Adding tpm plugins

### install tpm

go to git tpm

1. clone tpm `git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm`
2. create ` in `~/.tmux.conf` if does not exist
3. set `set -g @plugin 'github-username/plugin-name'` in `~/.tmux.conf`
4. update `~/.tmux.conf` using `tmux source-file ~/.tmux.conf`

### install tmux-ressurect

go to git tmux-ressurect

1. set `set -g @plugin 'tmux-plugins/tmux-resurrect'` in `~/.tmux.conf`
2. clone `git clone https://github.com/tmux-plugins/tmux-resurrect ~/clone/path`*
3. add `run-shell ~/clone/path/resurrect.tmux` to the bottom of `~/.tmux.conf`
4. update `~/.tmux.conf` using `tmux source-file ~/.tmux.conf`
