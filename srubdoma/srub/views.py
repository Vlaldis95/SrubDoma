from django.core.mail import BadHeaderError, send_mail
from django.http import HttpResponse
from django.shortcuts import render

from .forms import ContactForm
from .models import Feedback, Foundation, Projects


def index(request):
    projects = Projects.objects.all()
    feedback = Feedback.objects.all()
    foundation = Foundation.objects.all()
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            first_name = form.cleaned_data['first_name']
            phone_number = form.cleaned_data['phone_number']
            ln = '\n'
            message = (f"Имя: {first_name}{ln}"
                       f"Номер телефона: {phone_number}{ln}")
            try:
                send_mail("Сообщение с сайта", message, 'vlaldis@yandex.ru', ['vlaldis@yandex.ru'])
                flag = True
                form = ContactForm()
                return render(request, 'srub/index.html',
                              {'projects': projects,
                               'feedback': feedback,
                               'foundation': foundation,
                               'form': form,
                               'flag': flag})
            except BadHeaderError:
                return HttpResponse('Ошибка в теме письма.')
    form = ContactForm()
    return render(request, 'srub/index.html', {'projects': projects,
                                               'feedback': feedback,
                                               'foundation': foundation, 'form': form})
