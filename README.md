Back & Forth
============

Back & Forth is an open source platform that lets you create interactive,
team-based experiences wherever you want them.

Installation
------------

1. Install Node.js version 8.7 or newer
1. Install [Docker](https://www.docker.com/) and (if on Windows) [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/)
1. Clone this repository

Running a local development environment
---------------------------------------

If you use Visual Studio Code, just open this repository.

1. Choose Tasks > Run Task > "Run Back & Forth (Development)"
1. If this is the first time running Back & Forth, apply the migrations: Choose
   Tasks > Run Task > "Apply database migrations"

Go to http://localhost:3333/ to see the application.

You can log in using `alice@example.com` or `bob@example.com`. Once you enter
one of those emails, you'll see an "email" printed out in the app logs in Visual
Studio Code. The login link will look like this:

```
backend_1   | <p>If you're having problems logging in, paste this URL into a different =
backend_1   | browser: http://localhost:3333/auth/login/759d4612-3eae-4e04-b962-007998805=
backend_1   | aff</p>
```

Note that you have to remove the `=` sign which is an unfortunate side-effect of
email encoding, so the link to use in that case would be:

http://localhost:3333/auth/login/759d4612-3eae-4e04-b962-007998805aff

Docker container
----------------

To create a docker container for deployment, run `make container`. Then you can run it with e.g.

```
docker run -t -p 3333:3333 --network back-and-forth_default back-and-forth
```

To run database migrations using the docker image:
```
docker exec -it <container name or ID> node /app/backend/db/migrate.js
```

Deploying to VMs
----------------

Deployment currently needs two VMs, one for databases and the other for the app.

```
cd deploy/
mkdir ../../boris-private/ ../../boris-private/group_vars ../../boris-private/prod ../../boris-private/prod/credentials
touch ../../boris-private/ssh_config ../../boris-private/ansible_hosts
touch ../../boris-private/group-vars/prod.yml ../../boris-private/prod/credentials/mailgun_api_key
# Edit those files accordingly.
# Now deploy:
ansible-playbook playbook-db-server.yml -e "target=prod_db"
ansible-playbook playbook-app.yml -e "target=prod_app"
```
