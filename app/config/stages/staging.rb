server 'api-staging.placeb.ch', :app, :web, :primary => true
set :domain, "api-staging.placeb.ch"
set :user, "api-staging_placeb"
set :deploy_to, "/var/www/api-staging_placeb/public_html"
set :branch, "master"


namespace :custom do
    task :urestart do
        run "sudo supervisorctl restart phpfpm-api-staging_placeb"
    end
end
