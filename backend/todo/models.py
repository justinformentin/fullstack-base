
from django.utils import timezone
from django.db import models
from pygments import highlight
from pygments.formatters.html import HtmlFormatter
from pygments.lexers import get_all_lexers, get_lexer_by_name
from pygments.styles import get_all_styles

class Todo(models.Model):
	title = models.CharField(max_length=120)
	description = models.TextField()
	completed = models.BooleanField(default=False)
	updated_at = models.DateTimeField("Updated At", default=timezone.now)
	created_at = models.DateTimeField("Created At", default=timezone.now, editable=False)

	def __str__(self):
		return self.title

class Customer(models.Model):
	first_name = models.CharField("First name", max_length=255)
	last_name = models.CharField("Last name", max_length=255)
	email = models.EmailField()
	phone = models.CharField(max_length=20)
	address =  models.TextField(blank=True, null=True)
	description = models.TextField(blank=True, null=True)
	updated_at = models.DateTimeField(verbose_name="Updated At", default=timezone.now)
	created_at = models.DateTimeField(verbose_name="Created At", default=timezone.now, editable=False)

	def __str__(self):
		return self.first_name


LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted((item, item) for item in get_all_styles())

class Snippet(models.Model):
    created = models.DateTimeField(default=timezone.now)
    title = models.CharField(max_length=100, blank=True, default='')
    code = models.TextField(blank=True, default='')
    linenos = models.BooleanField(default=False)
    language = models.CharField(
        choices=LANGUAGE_CHOICES, default='python', max_length=100)
    style = models.CharField(
        choices=STYLE_CHOICES, default='friendly', max_length=100)
    owner = models.ForeignKey(
        'auth.User', related_name='snippets', on_delete=models.CASCADE, blank=True, default='')
    highlighted = models.TextField(blank=True, default='')

    class Meta:
        ordering = ('created', )

    def save(self, *args, **kwargs):
        """
        Use the `pygments` library to create a highlighted HTML
        representation of the code snippet.
        """
        lexer = get_lexer_by_name(self.language)
        linenos = self.linenos and 'table' or False
        options = self.title and {'title': self.title} or {}
        formatter = HtmlFormatter(
            style=self.style, linenos=linenos, full=True, **options)
        self.highlighted = highlight(self.code, lexer, formatter)
        super(Snippet, self).save(*args, **kwargs)