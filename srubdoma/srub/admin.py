from django.contrib import admin
from .models import Foundation, Feedback, Projects
import django.contrib.auth.admin
import django.contrib.auth.models
from django.contrib import auth


admin.site.register(Foundation)
admin.site.register(Feedback)
admin.site.register(Projects)


admin.site.unregister(auth.models.User)
admin.site.unregister(auth.models.Group)
