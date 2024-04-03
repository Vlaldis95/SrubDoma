from django.db import models


class Foundation(models.Model):
    title = models.CharField(verbose_name='Название', max_length=100)
    description = models.TextField(verbose_name='Описание')
    photo = models.ImageField(verbose_name='Фотография',
                              upload_to='fundaments_photos/')
    pub_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Вид фундамента'
        verbose_name_plural = 'Виды фундамента'

    def __str__(self):
        return self.title


class Projects(models.Model):
    title = models.CharField(verbose_name='Название', max_length=100)
    location = models.CharField(verbose_name='Местоположение', max_length=100, blank=True, null=True)
    description = models.TextField(verbose_name='Описание')
    photo = models.ImageField(verbose_name='Фотография',
                              upload_to='projects_photos/')
    pub_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Выполненный проект'
        verbose_name_plural = 'Выполненные проекты'

    def __str__(self):
        return self.title


class Feedback(models.Model):
    title = models.CharField(verbose_name='Имя', max_length=100)
    description = models.TextField(verbose_name='Текст отзыва')
    pub_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'

    def __str__(self):
        return self.title
