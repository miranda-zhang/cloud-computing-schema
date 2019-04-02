# w3id
https://w3id.org entry for this project:

https://github.com/perma-id/w3id.org/tree/master/cocoon

# Issues with w3id
https://github.com/perma-id/w3id.org/issues/1063

# Testing htaccess
1. [Linux on Windows](https://gist.github.com/miranda-zhang/422929059e0df1a22f2b9fd35fa97a78#linux-on-windows)
2. [Apache How-to](https://gist.github.com/miranda-zhang/937b613cd61c850ffd9f578fa72ac648)

`.htaccess` url rewrite rules can be tested in an Apache server local enviroment.

    cd /var/www/html/cocoon
    cp /mnt/c/Users/admin-u5214628/Documents/w3id.org/cocoon/.htaccess .
    
    service apache2 status
    service apache2 restart
    service apache2 reload

Urls should be test with `curl` command to avoid caching interference, or 
Chrome "Incognito mode" (**Ctl+Shift+N**).

1. http://localhost/cocoon/v1.0.1
2. http://localhost/cocoon/data/v1.0.1
3. http://localhost/cocoon/data/v1.0.1/2019-03-07/CloudStorageTransactionsPriceSpecification/Azure/managed_disk/transactions-ssd

## Debug
1. https://serverfault.com/questions/96421/why-does-my-rewritelog-not-work/96435
2. https://stackoverflow.com/questions/9632852/how-to-debug-apache-mod-rewrite#
3. https://serverfault.com/questions/935361/regex-rewriterule-in-apache-2-4-htaccess

    nano +131 /etc/apache2/apache2.conf
    tail --follow /var/log/apache2/error.log

# Publish change
[How to submit pull requests](https://gist.github.com/miranda-zhang/4fd587c2a793e85667c1938eda782217#submitting-a-pull-request)

    git fetch upstream
    git merge upstream/master