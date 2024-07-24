import unittest
import requests

from selenium import webdriver
from selenium.webdriver import FirefoxOptions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


class PythonOrgSearch(unittest.TestCase):
    def setUp(self):
        opts = FirefoxOptions()
        opts.add_argument("--headless")
        self.driver = webdriver.Firefox(options=opts)

    def test_coffees(self):
        response = requests.get("http://localhost:3000/coffees")
        data = [
            {"id": 1, "name": "Lattee", "price": 5},
            {"id": 2, "name": "Espresso", "price": 3},
            {"id": 3, "name": "Cappuccino", "price": 4},
        ]
        assert data == response.json()
        print("get coffees test pass")

    def test_order_coffee(self):
        driver = self.driver
        driver.get("http://localhost:3000")
        wait = WebDriverWait(driver, timeout=5)
        button = wait.until(EC.element_to_be_clickable((By.ID, "LatteeOrderBtn")));
        button.click();

        # test LatteeOrderBtn
        # driver.find_element(By.ID, "LatteeOrderBtn").click()
        # wait = WebDriverWait(driver, timeout=2)
        alert = wait.until(EC.alert_is_present())
        text = alert.text
        assert text != "Error placing order."
        alert.accept()

        # test EspressoOrderBtn
        driver.find_element(By.ID, "EspressoOrderBtn").click()
        wait = WebDriverWait(driver, timeout=2)
        alert = wait.until(EC.alert_is_present())
        text = alert.text
        assert text != "Error placing order."
        alert.accept()

        # test CappuccinoOrderBtn
        driver.find_element(By.ID, "CappuccinoOrderBtn").click()
        wait = WebDriverWait(driver, timeout=2)
        alert = wait.until(EC.alert_is_present())
        text = alert.text
        assert text != "Error placing order."
        alert.accept()

        response = requests.get("http://localhost:3000/orders")
        data = [
            {"orderId": 1, "coffeeName": "Lattee", "quantity": 1, "total": 5},
            {"orderId": 2, "coffeeName": "Espresso", "quantity": 1, "total": 3},
            {"orderId": 3, "coffeeName": "Cappuccino", "quantity": 1, "total": 4},
        ]
        assert data == response.json()
        print("end to end test passed!")

    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
