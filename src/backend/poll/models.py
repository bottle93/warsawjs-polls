from django.db import models


class Poll(models.Model):
    name = models.CharField(max_length=255)
    objects = models.Manager()


class Question(models.Model):
    text = models.CharField(max_length=255)
    poll = models.ForeignKey(Poll, related_name='questions', on_delete='DELETE')
