import os
import uuid

from django.db import models
from django.utils import timezone
from django.dispatch import receiver


class Product(models.Model):
    title = models.CharField("Название", max_length=255, null=False, blank=False)
    description = models.TextField("Описание", null=False, blank=False)
    price = models.FloatField("Цена", null=False, blank=False)

    published_at = models.DateTimeField("Опубликовано", default=timezone.now)
    created_at = models.DateTimeField("Создано", auto_now_add=True)
    updated_at = models.DateTimeField("Обновлено", auto_now=True)


class ProductTag(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    title = models.CharField("Название", max_length=255, null=False, blank=False)
    value = models.CharField("Значение", max_length=255, null=False, blank=False)


class ProductImage(models.Model):
    def product_directory_path(instance):
        # file will be uploaded to MEDIA_ROOT/product_<id>/<filename>
        return "product_{0}/{1}".format(instance.product.id, str(uuid.uuid4))
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    file = models.ImageField(upload_to=product_directory_path)
    position = models.IntegerField(null=False, blank=False)


# These two auto-delete files from filesystem when they are unneeded:

@receiver(models.signals.post_delete, sender=ProductImage)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `ProductImage` object is deleted.
    """
    if instance.file:
        if os.path.isfile(instance.file.path):
            os.remove(instance.file.path)

@receiver(models.signals.pre_save, sender=ProductImage)
def auto_delete_file_on_change(sender, instance, **kwargs):
    """
    Deletes old file from filesystem
    when corresponding `ProductImage` object is updated
    with new file.
    """
    if not instance.pk:
        return False

    try:
        old_file = ProductImage.objects.get(pk=instance.pk).file
    except ProductImage.DoesNotExist:
        return False

    new_file = instance.file
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)
