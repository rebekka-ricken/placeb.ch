server 'api.placeb.ch', :app, :web, :primary => true
set :domain, "api.placeb.ch"
set :user, "api_placeb"
set :deploy_to, "/var/www/api_placeb/public_html"
set :branch, "master"



namespace :custom do
    task :urestart do
        run "sudo supervisorctl restart phpfpm-api_placeb"
    end
end
