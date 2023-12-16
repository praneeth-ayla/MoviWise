# processData.py
import json
import sys

# Read input from stdin
input_data = sys.stdin.read()

try:
    # Parse JSON input
    input_list = json.loads(input_data)

    # Process the data (e.g., multiply each element by 2)
    output_list = [x * 2 for x in input_list]

    # Convert the result to JSON and write to stdout
    sys.stdout.write(json.dumps(output_list))
except json.JSONDecodeError as e:
    # Handle JSON decoding error
    sys.stderr.write(f'Error decoding JSON: {str(e)}')
    sys.exit(1)
