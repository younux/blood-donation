import math
import re

from django.utils.html import strip_tags



def count_words(html_string):
    """
     Count the words in the html string
        # html_string = <h1>This is a title</h1>
    """
    word_string = strip_tags(html_string)
    matching_words = re.findall(r'\w+', word_string)
    count = len(matching_words)
    return count


def get_read_time(html_string):
    """
        Calculate the time that will be taken to read html string
    """
    count = count_words(html_string)
    read_time_min = math.ceil(count/200.0) # assuming 200 word per minute reading
    return int(read_time_min)