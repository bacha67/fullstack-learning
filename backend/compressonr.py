import gzip
import shutil

def compress_file(input_file, output_file):
    """
    Compress a file using gzip.

    Args:
        input_file (str): Path to the input file to compress.
        output_file (str): Path to the output compressed file (should end with .gz).
    """
    with open(input_file, 'rb') as f_in:
        with gzip.open(output_file, 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)

# Example usage
if __name__ == "__main__":
    compress_file('/Users/shadow/Desktop/exit_exam_result.pdf', '/Users/shadow/Desktop/exit_exam_result.pdf.gz')
