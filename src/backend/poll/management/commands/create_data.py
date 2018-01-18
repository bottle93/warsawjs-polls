from django.core.management.base import BaseCommand

from poll.factories import PollFactory, QuestionFactory


class Command(BaseCommand):
    help = 'Creates poll with random questions and name'

    def add_arguments(self, parser):
        parser.add_argument('--number-of-questions', type=int, default=3)

    def handle(self, *args, **options):
        poll = PollFactory()
        questions = QuestionFactory.create_batch(options['number_of_questions'], poll=poll)
        print(f"Created poll {poll} with {len(questions)} questions.")
