import os
import time
import datetime
import json
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException

# global vars
driver = webdriver.Chrome()

def parseSize(string):
    size = {}
    if (string == "Uplink [256KB - 10MB / 2 threads]"):
        size["lower"] = {"value": 256, "unit": "KB"}
        size["upper"] = {"value": 10, "unit": "MB"}
    else:
        # assume "Uplink [1 - 128KB / 4 threads]"
        size["lower"] = {"value": 1, "unit": "KB"}
        size["upper"] = {"value": 128, "unit": "KB"}
    return size


def find_test_data(nth, sec_to_wait, output_file):
    while(True):
        try:
            test_data = driver.find_element_by_css_selector(
                "div[data-test='"+str(nth)+"'] div")
            header = driver.find_element_by_css_selector(
                "#wrapper > main > div > section > table > thead > tr:nth-child(1) > th:nth-child("+str(2+nth)+")")
            uplink = test_data.get_attribute("data-metric")
            region = driver.find_element_by_css_selector(
                "#wrapper > main > div > section > table > tbody > tr")
        except NoSuchElementException:
            if (sec_to_wait < 8):
                break # skip this test
            else:
                sec_to_wait = sec_to_wait*0.8
                time.sleep(sec_to_wait)
        else:
            test = {}
            test["region"] = region.get_attribute("data-region")
            test["subregion"] = region.get_attribute("data-subregion")
            test["size"] = parseSize(header.text)
            test["uplink"] = {"value": uplink, "unit": "Mb/s"}
            test["completion_time"]=datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.%fZ")
            with open(output_file, "a") as myfile:
                myfile.write(json.dumps(test, indent = 4)+",")
            break


def uplink_test(url,output_file):
    driver.get(url)
    wait = 30 # seconds
    time.sleep(wait)  # Let the user actually see something!
    find_test_data(0, wait, output_file)
    find_test_data(1, wait, output_file)

def tests(url_prefix, region_list, output_file):
    with open(output_file, "a") as myfile:
        myfile.write("[")

    for region in region_list:
        uplink_test(url_prefix+region, output_file)

    with open(output_file, "a") as myfile:
        myfile.write("]")

# main
# 20 regions all with zones
gcloud_regions = [
  "asia-east1-b",
  "asia-east2-b",
  "asia-northeast1-b",
  "asia-south1-a",
  "asia-southeast1-b",
  "australia-southeast1-a",
  "europe-north1-b",
  "europe-west1-c",
  "europe-west2-a",
  "europe-west3-c",
  "europe-west4-b",
  "northamerica-northeast1-a",
  "southamerica-east1-a",
  "us-central1-c",
  "us-east1-c",
  "us-east4-a",
  "us-west1-b",
  "us-west2-a",
  "us-west2-b",
  "us-west2-c"
]
if not os.path.exists('gcloud'):
    os.makedirs('gcloud')
tests('http://cloudharmony.com/speedtest-uplink-for-google:compute-', gcloud_regions, "gcloud/uplink.json")

# 43 regions
azure_regions = [
  "asia-east",
  "asia-southeast",
  "australia-central",
  "australia-central2",
  "australia-east",
  "australia-southeast",
  "brazil-south",
  "canada-central",
  "canada-east",
#   "china-east",
#   "china-east2",
  "china-north",
  "china-north2",
  "eu-north",
  "eu-west",
  "france-central",
  "france-south",
  "india-central",
  "india-south",
  "india-west",
  "japan-east",
  "japan-west",
  "korea-central",
  "korea-south",
  "uk-south",
  "uk-west",
  "us-central",
  "us-east",
  "us-east2",
  "us-northcentral",
  "us-southcentral",
  "us-west",
  "us-westcentral",
# with zones
  "us-west2-1",
  "us-west2-2",
  "us-west2-3"
]
if not os.path.exists('azure'):
    os.makedirs('azure')
tests('http://cloudharmony.com/speedtest-uplink-for-azure:compute-', azure_regions, "azure/uplink.json")

driver.quit()
