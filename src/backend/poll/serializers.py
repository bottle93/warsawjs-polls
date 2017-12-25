from rest_framework import serializers

from poll import models


class QuestionOptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.QuestionOption
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):

    options = QuestionOptionSerializer(many=True)

    class Meta:
        model = models.Question
        fields = '__all__'


class QuestionAnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.QuestionAnswer
        fields = '__all__'


class PollSerializer(serializers.ModelSerializer):

    questions = QuestionSerializer(many=True)

    class Meta:
        model = models.Poll
        fields = '__all__'
