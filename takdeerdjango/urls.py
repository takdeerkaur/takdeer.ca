from django.conf.urls import include, url
from django.contrib import admin

from blog import views

urlpatterns = [
    url(r'^$', views.index),
    url(r'^blog/', include('blog.urls')),
    url(r'^admin/', admin.site.urls),
]
