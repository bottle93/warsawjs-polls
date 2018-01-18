from django.db import models


class BaseModel(models.Model):

    objects = models.Manager()

    class Meta:
        abstract = True


class Poll(BaseModel):
    name = models.CharField(
        max_length=255)
    created_at = models.DateTimeField(
        auto_now_add=True)

    def __str__(self):
        return f'#{self.pk} {self.name}'


class Question(BaseModel):
    TEXT = 'text'
    OPTION = 'option'
    SCORE = 'score'
    AVAILABLE_TYPES = (
        (TEXT, 'Text question'),
        (OPTION, 'One of provided options'),
        (SCORE, '1-5 Score range'),
    )

    type = models.CharField(
        max_length=50, choices=AVAILABLE_TYPES, default=SCORE)
    text = models.CharField(
        max_length=255)
    poll = models.ForeignKey(
        Poll, related_name='questions',
        on_delete='DELETE')


class QuestionOption(BaseModel):
    text = models.CharField(
        max_length=255)
    question = models.ForeignKey(
        Question, related_name='options',
        on_delete='DELETE')

    def __str__(self):
        return f'#{self.pk} {self.question.pk} {self.text}'


class PollSubmission(BaseModel):
    poll = models.ForeignKey(
        Poll, related_name='submissions',
        on_delete='DELETE')
    created_at = models.DateTimeField(
        auto_now_add=True)


class QuestionAnswer(BaseModel):
    submission = models.ForeignKey(
        PollSubmission, related_name='answers',
        on_delete='DELETE')
    question = models.ForeignKey(
        Question, related_name='answers',
        on_delete='DELETE')
    option = models.ForeignKey(
        QuestionOption, related_name='answer_options',
        on_delete='DELETE', null=True, blank=True)
    text = models.TextField(
        null=True, blank=True)
    score = models.SmallIntegerField(
        null=True, blank=True)
