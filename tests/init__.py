import unittest
from app.utils import evaluate_rpn

class TestRPNCalculator(unittest.TestCase):

    def test_simple_addition(self):
        self.assertEqual(evaluate_rpn("3 5 +"), 8)

    def test_complex_expression(self):
        self.assertEqual(evaluate_rpn("5 1 2 + 4 * + 3 -"), 14)

    def test_division(self):
        self.assertEqual(evaluate_rpn("10 2 /"), 5)

    def test_multiplication(self):
        self.assertEqual(evaluate_rpn("6 2 3 + *"), 30)

    def test_invalid_expression(self):
        with self.assertRaises(IndexError):
            evaluate_rpn("5 +")

    def test_empty_expression(self):
        self.assertIsNone(evaluate_rpn(""))

if __name__ == "__main__":
    unittest.main()
