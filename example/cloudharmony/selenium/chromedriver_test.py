import time
from selenium import webdriver

driver = webdriver.Chrome()
#driver = webdriver.Chrome(executable_path=r'C:\\Users\\admin-u5214628\\Documents\\programs\\chromedriver_win32\\chromedriver.exe')  # Optional argument, if not specified will search path.
driver.get('http://www.google.com/xhtml')
time.sleep(5) # Let the user actually see something!
search_box = driver.find_element_by_name('q')
search_box.send_keys("ChromeDriver")
search_box.submit()
time.sleep(5) # Let the user actually see something!
driver.quit()