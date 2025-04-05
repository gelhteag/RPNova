# Utility function to evaluate an RPN (Reverse Polish Notation) expression.
def evaluate_rpn(expression: str) -> float:
    """
    Evaluates a Reverse Polish Notation expression.
    
    Args:
        expression (str): The RPN expression (tokens separated by spaces).

    Returns:
        float: The result of the expression.
    """
    stack = []
    tokens = expression.strip().split()
    for token in tokens:
        if token in "+-*/":
            # Pop the last two numbers from the stack
            b = stack.pop()
            a = stack.pop()
            if token == "+":
                stack.append(a + b)
            elif token == "-":
                stack.append(a - b)
            elif token == "*":
                stack.append(a * b)
            elif token == "/":
                stack.append(a / b)
        else:
            # Convert token to float and push onto the stack
            stack.append(float(token))
    return stack[0] if stack else None
