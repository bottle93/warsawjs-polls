import factory
from poll import models


class PollFactory(factory.DjangoModelFactory):

    class Meta:
        model = models.Poll

    name = factory.LazyAttribute(lambda o: f"Poll number {models.Poll.objects.count() + 1}")


class QuestionFactory(factory.DjangoModelFactory):

    class Meta:
        model = models.Question

    type = models.Question.TEXT
    text = factory.Iterator([
        "What most impressed you?",
        "What was the weakest part of our workshops",
        "What could we improve"
    ])
    poll = factory.SubFactory(PollFactory)
