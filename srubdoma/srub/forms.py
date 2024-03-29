from django import forms


class ContactForm(forms.Form):
    first_name = forms.CharField(widget=forms.TextInput(
            attrs={'placeholder':
                   'Ваше имя', 'class': 'text2 request-popup__input popup__input'}))
    phone_number = forms.RegexField(
        regex='^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$',
        widget=forms.TextInput(attrs={
          'placeholder': '+7-999-999-99-99',
          'type': 'tel',
          'class': 'text2 request-popup__input popup__input request-popup__input_type_tel'}))
