# tests/test_rpn.py
import unittest
from app.utils import evaluate_rpn

class TestRPNCalculator(unittest.TestCase):
    def test_simple_addition(self):
        self.assertEqual(evaluate_rpn("3 4 +"), 7)

    def test_complex_expression(self):
        self.assertEqual(evaluate_rpn("5 1 2 + 4 * + 3 -"), 14)

    # Add more tests for edge cases and invalid inputs

if __name__ == '__main__':
    unittest.main()
