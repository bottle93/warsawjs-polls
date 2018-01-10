from rest_framework import serializers
from rest_framework.fields import empty

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
        exclude = ('submission',)

    def validate(self, data):
        question = data.get('question')
        text = data.get('text', '').strip()
        option = data.get('option')
        score = data.get('score')
        if question.type == models.Question.TEXT and not text:
            raise serializers.ValidationError("No text response submitted")
        if question.type == models.Question.SCORE and not score:
            raise serializers.ValidationError("No score submitted")
        if question.type == models.Question.OPTION:
            if not option:
                raise serializers.ValidationError("No option selected")
            if option.question_id != question.pk:
                raise serializers.ValidationError("Option from other question selected")
        return data


class PollSerializer(serializers.ModelSerializer):

    questions = QuestionSerializer(many=True)

    class Meta:
        model = models.Poll
        fields = '__all__'


class PollSubmissionSerializer(serializers.ModelSerializer):

    answers = QuestionAnswerSerializer(many=True)

    class Meta:
        model = models.PollSubmission
        fields = ('poll', 'answers')

    def validate(self, data):
        poll = data['poll']
        question_ids = set()
        for answer in data['answers']:
            if answer['question'].poll_id != poll.pk:
                raise serializers.ValidationError("This question does not belong to this poll!")
            question_ids.add(answer['question'].pk)
        if len(question_ids) != poll.questions.count():
            raise serializers.ValidationError("You need to answer all questions!")
        # raise Exception(f"number of ids {len(question_ids)}, all questions {poll.questions.count()}")
        return data

    def create(self, validated_data):
        submission = models.PollSubmission(poll=validated_data['poll'])
        submission.save()
        for answer in validated_data['answers']:
            models.QuestionAnswer(
                submission=submission,
                **answer
            ).save()
        return submission
