set :stages,        %w(production staging testing)
set :default_stage, "staging"
set :stage_dir,     "app/config/stages"
set :shell,         '/usr/bin/bash'
require 'capistrano/ext/multistage'
set   :application,   "palceb-api"

set   :scm,           :git
set   :repository,    "git@github.com:placeB/placeb-api.git"
set   :deploy_via,    :copy
set   :interactive_mode, false
set   :use_sudo,      false
set   :keep_releases, 3

set :shared_files,    ["app/config/parameters.yml"]

set(:domain) { "#{domain}" }

after "deploy:update_code", "deploy:migrate", "symfony:assets:install", "custom:urestart"

