# Uplink Stats
Uplink tests are only for Compute services from CloudHarmony (last checked on 4th March 2019 on Google, Azure).

# Dependencies
We used Selenium version 3.5.0, it can be installed with `pip`.

We coded in Python.

Our platform is Microsoft Windows 10 Enterprise (Version 10.0.17134 N/A Build 17134 x86_64).

Chrome version 72.0.3626.119

Driver version 73.0.3683.20 (8e2b610813e167eee3619ac4ce6e42e3ec622017):[chromedriver.exe](https://chromedriver.storage.googleapis.com/index.html?path=73.0.3683.20/).
Don't forget to add folder paths to the Windows path variable, if you don't want to specify path to executable every time.

[chromedriver_test.py](chromedriver_test.py) can be run to test if all the dependancies are installed: `python chromedriver_test.py`

## Selenium Doc
1. https://selenium-python.readthedocs.io/locating-elements.html
2. https://saucelabs.com/resources/articles/selenium-tips-css-selectors

# Script
See [cloudharmony.py](cloudharmony.py)
The webpage fails if too many service are tested all at once, so tests are carried out one by one.

Run as `python cloudharmony.py`

Output by default saved to:
1. [gcloud/uplink.json](gcloud/uplink.json)
2. [azure/uplink.json](azure/uplink.json)

Results are appended to the files, old contents in the file are not deleted, you need to manully clear the files before you re-run to see only the new results.
