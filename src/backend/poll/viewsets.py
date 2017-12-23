from rest_framework import viewsets

from poll import models, serializers


class PollViewset(viewsets.ModelViewSet):

    queryset = models.Poll.objects.all()
    serializer_class = serializers.PollSerializer
