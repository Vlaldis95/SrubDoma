from django.shortcuts import render
from .models import Feedback, Foundation, Projects


def index(request):
    projects = Projects.objects.all()
    feedback = Feedback.objects.all()
    foundation = Foundation.objects.all()
    return render(request, 'srub/index.html', {'projects': projects,
                                               'feedback': feedback,
                                               'foundation': foundation})
