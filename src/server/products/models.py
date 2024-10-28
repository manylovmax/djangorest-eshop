import os
import uuid

from django.db import models
from django.dispatch import receiver

# PRODUCT_CATEGORIES = (
#     "Электроника",
#     "Одежда",
#     "Обувь",
#     "Дом и сад",
#     "Детские товары",
#     "Красота и здоровье",
#     "Бытовая техника",
#     "Спорт и отдых",
#     "Строительство и ремонт",
#     "Продукты питания",
#     "Аптека",
#     "Товары для животных",
#     "Книги",
#     "Туризм, рыбалка, охота",
#     "Автотовары",
#     "Мебель",
#     "Хобби и творчество",
# )

class ProductCategory(models.Model):
    title = models.CharField("Название", max_length=255, null=False, blank=False)
    path = models.CharField("Путь", max_length=255, editable=False)
    assignable = models.BooleanField("Назначаемое", default=False, null=False, blank=False)
    
    parent = models.ForeignKey("self", null=True, on_delete=models.SET_NULL)

@receiver(models.signals.post_save, sender=ProductCategory)
def auto_set_category_path_on_change(sender, instance, **kwargs):
    if not instance.parent:
        instance_path = f"/{instance.id}/"
    else:
        instance_path = instance.parent.path + f"{instance.id}/"
    
    instance.update(path=instance_path)


class Product(models.Model):
    title = models.CharField("Название", max_length=255, null=False, blank=False)
    description = models.TextField("Описание", null=False, blank=False)
    price = models.FloatField("Цена", null=False, blank=False)

    published_at = models.DateTimeField("Опубликовано")
    created_at = models.DateTimeField("Создано", auto_now_add=True)
    updated_at = models.DateTimeField("Обновлено", auto_now=True)

    category = models.ForeignKey(ProductCategory, null=True, on_delete=models.SET_NULL)


class AttributeCategory(models.Model):
    category = models.ForeignKey(ProductCategory, null=True, on_delete=models.SET_NULL)
    title = models.CharField("Название", max_length=255, null=False, blank=False)


class AttributeName(models.Model):
    attribute_category = models.ForeignKey(AttributeCategory, null=True, on_delete=models.SET_NULL)
    title = models.CharField("Название", max_length=255, null=False, blank=False)

class AttributeValue(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False, blank=False)
    attribute_name = models.ForeignKey(AttributeName, null=True, on_delete=models.SET_NULL)
    value = models.CharField("Значение", max_length=255, null=False, blank=False)


class ProductImage(models.Model):
    def product_directory_path(instance):
        # file will be uploaded to MEDIA_ROOT/product_<id>/<filename>
        return "product_{0}_images/{1}".format(instance.product.id, str(uuid.uuid4()))
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    file = models.ImageField(upload_to=product_directory_path)
    position = models.IntegerField(null=False, blank=False)


# These two auto-delete files from filesystem when they are unneeded:

@receiver(models.signals.post_delete, sender=ProductImage)
def auto_delete_product_image_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `ProductImage` object is deleted.
    """
    if instance.file:
        if os.path.isfile(instance.file.path):
            os.remove(instance.file.path)

@receiver(models.signals.pre_save, sender=ProductImage)
def auto_delete_product_image_on_change(sender, instance, **kwargs):
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
