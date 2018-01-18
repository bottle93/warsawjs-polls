from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from poll import models, serializers


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


class PollViewset(viewsets.ModelViewSet):

    queryset = models.Poll.objects.all()
    serializer_class = serializers.PollSerializer


class PollSubmissionsViewset(viewsets.ModelViewSet):

    queryset = models.PollSubmission.objects.all()
    serializer_class = serializers.PollSubmissionSerializer
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
