from rest_framework import serializers

from poll import models


class PollSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Poll
        fields = '__all__'
