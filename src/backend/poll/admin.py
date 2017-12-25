from django.contrib import admin

from poll import models


class PollAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'created_at')


class QuestionOptionInline(admin.TabularInline):
    model = models.QuestionOption


class QuestionAdmin(admin.ModelAdmin):
    inlines = [QuestionOptionInline]
    model = models.Question


admin.site.register(models.Poll, PollAdmin)
admin.site.register(models.Question, QuestionAdmin)
admin.site.register(models.QuestionOption)
admin.site.register(models.QuestionAnswer)
admin.site.register(models.PollSubmission)
