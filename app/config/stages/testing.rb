server 'api-testing.placeb.ch', :app, :web, :primary => true
set :domain, "api-testing.placeb.ch"
set :user, "api-testing_placeb"
set :deploy_to, "/var/www/api-testing_placeb/public_html"
set :branch, "develop"


namespace :custom do
    task :urestart do
        run "sudo supervisorctl restart phpfpm-api-testing_placeb"
    end
end
