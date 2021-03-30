Back & Forth
============

Back & Forth is an open source platform that lets you create interactive,
team-based experiences wherever you want them.

Installation
------------

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

Deploying on the Internet
-------------------------

Back & Forth runs in a docker container and requires PostgreSQL and Redis. You
can delpoy it using a cloud provider like Amazon Web Services (RDS, ElastiCache,
and Fargate), though the most cost-effective way is to run it on a single cloud
virtual machine (typically costs $5/month).

Here's how to deploy a public instance of Back & Forth on a virtual machine:

1. Using any cloud VM provider (AWS, DigitalOcean, Linode, etc.), provision an
   Ubuntu 20.04 LTS VM, with at least 512 MB of RAM (1+ GB recommended).
1. Configure the VM's firewall to only allow ingress from the internet on ports
   22, 80, and 443.
1. Note the VM's IP address and ensure that you can SSH into the VM
   (`ssh root@vm-ip-here`).
1. Using any domain name that you own (e.g. `back-and-forth.yoursite.example`),
   update the DNS settings so that the domain's A record points to the IP of your
   new VM. A domain name is required because Back & Forth uses HTTPS. If you need,
   there are many sites on the internet offering free subdomains.

1. In the `deploy/private/` folder, duplicate the `example` folder and rename it
   to `prod`. Edit `deploy/private/prod/vars.yml` and set `backforth_app_domain`
   to your domain, e.g. `back-and-forth.yoursite.example`. Also set the
   `traefik_acme_email` variable to an email address you can use for HTTPS
   verification.
1. Install [ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)
   (e.g. `brew install ansible` on MacOS).
1. Open a terminal in the `deploy` folder. Run this command, substituting your
   VM's new IP. Note that there is a `,` after the IP address.

   ```sh
   ansible-playbook -i 123.123.123.123, -e "backforth_instance_name=prod" playbook.yml
   ```
1. If you get an error about unable to find `mailgun_api_key`, you need to sign
   up for [MailGun](https://www.mailgun.com/) and put an API key (and nothing
   else) into a file at `deploy/private/prod/credentials/mailgun_api_key`. Or,
   if you don't want email sending for now, just create that as a blank file.

Deploying a custom build
------------------------

The above instructions will deploy the latest official release of Back & Forth.
To deploy a customized version with any changes you've made locally, follow
these instructions:

1. First, in VS Code, choose Terminal > Run Task > Build Production Docker Image
   It should eventually say `Successfully tagged back-and-forth:latest`
1. Test the image: go to Terminal > Run Task > Run Back & Forth (Verification)
1. Go to http://localhost:3333/ and make sure everything is working.
1. Back in the VS Code Terminal, press CTRL-C to stop the verification container.
1. Push the resulting image to Docker Hub or any other docker registry.
1. In `deploy/private/prod/vars.yml`, change `backforth_image_repo` to specify
   your custom registry/repository.
1. Run the `ansible-playbook` command again to re-deploy.

Updating package-lock.json
--------------------------

Due to a legacy setup that shares package.json between the backend and frontend,
the containers are unable to update `package-lock.json`. To update dependencies,
open a backend shell, run `npm install`, then copy the container's
`package-lock.json` and overwrite the (older) `package-lock.json` on the host.

(Details: mounting `package-lock.json` as a single bind mount prevents npm
from deleting it during `npm install`.)
