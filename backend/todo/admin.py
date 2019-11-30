
# todo/admin.py

from django.contrib import admin
from .models import (Todo, Customer, Snippet)

class TodoAdmin(admin.ModelAdmin):
  list_display = ('title', 'description', 'completed')

class CustomerAdmin(admin.ModelAdmin):
  list_display = (
      'first_name',
      'last_name',
      'email',
      'phone',
      'address',
      'description',
      'created_at'
    )

class SnippetAdmin(admin.ModelAdmin):
  list_display = (
      'created',
      'title',
      'code',
      'linenos',
      'language',
      'style',
      'owner',
      'highlighted'
    )

# Register your models here.
admin.site.register(Todo, TodoAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Snippet, SnippetAdmin)