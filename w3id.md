# w3id
https://w3id.org entry for this project:

https://github.com/perma-id/w3id.org/tree/master/cocoon

[How to submit pull requests](https://gist.github.com/miranda-zhang/4fd587c2a793e85667c1938eda782217#submitting-a-pull-request)

# Issues with w3id
https://github.com/perma-id/w3id.org/issues/1063

# Testing htaccess
1. [Linux on Windows](https://gist.github.com/miranda-zhang/422929059e0df1a22f2b9fd35fa97a78#linux-on-windows)
2. [Apache How-to](https://gist.github.com/miranda-zhang/937b613cd61c850ffd9f578fa72ac648)

`.htaccess` url rewrite rules can be tested in an Apache server local enviroment.

    cd /var/www/html/cocoon
    cp /mnt/c/Users/admin-u5214628/Documents/w3id.org/cocoon/.htaccess .
    service apache2 restart
    service apache2 status
    service apache2 reload

Test local url, like http://localhost/cocoon/v1.0.1
