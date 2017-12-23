from django.contrib import admin

from poll.models import Poll, Question

admin.site.register(Poll)
admin.site.register(Question)
