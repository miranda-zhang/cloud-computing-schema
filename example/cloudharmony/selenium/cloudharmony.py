import time
import datetime
import json
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException


driver = webdriver.Chrome()
outputFile="uplink.json"

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


def find_test_data(number, wait):
    while(True):
        try:
            test_data = driver.find_element_by_css_selector(
                "div[data-test='"+str(number)+"'] div")
            header = driver.find_element_by_css_selector(
                "#wrapper > main > div > section > table > thead > tr:nth-child(1) > th:nth-child("+str(2+number)+")")
            subregion = driver.find_element_by_css_selector(
                "#wrapper > main > div > section > table > tbody > tr")
        except NoSuchElementException:
            wait = wait*0.8
            time.sleep(wait)
            print("Sleep:"+str(wait))
        else:
            test = {}
            test["subregion"] = subregion.get_attribute("data-subregion")
            test["size"] = parseSize(header.text)
            test["uplink"] = {"value": test_data.get_attribute(
                "data-metric"), "unit": "Mb/s"}
            test["completion_time"]=datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.%fZ")
            # print(json.dumps(test, indent = 4))
            with open(outputFile, "a") as myfile:
                myfile.write(json.dumps(test, indent = 4)+",")
            break


def uplink_test(url):
    driver.get(url)
    wait = 30
    time.sleep(wait)  # Let the user actually see something!
    find_test_data(0, wait)
    find_test_data(1, wait)


regions = [
    "asia-east1",
    "asia-east2",
    "asia-northeast1",
    "asia-south1",
    "asia-southeast1",
    "australia-southeast1",
    "europe-north1",
    "europe-west1",
    "europe-west2",
    "europe-west3",
    "europe-west4",
    "northamerica-northeast1",
    "southamerica-east1",
    "us-central1",
    "us-east1",
    "us-east4",
    "us-west1",
    "us-west2"
]

with open(outputFile, "a") as myfile:
    myfile.write("[")

for region in regions:
    uplink_test('http://cloudharmony.com/speedtest-uplink-for-google:compute-'+region)

with open(outputFile, "a") as myfile:
    myfile.write("]")

driver.quit()
