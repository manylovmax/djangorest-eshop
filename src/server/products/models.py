import os
import uuid

from django.db import models, connection
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
    title = models.CharField("Название", max_length=255)
    path = models.CharField("Путь", max_length=255, editable=False)
    assignable = models.BooleanField("Назначаемое", default=False)
    
    parent = models.ForeignKey("self", null=True, on_delete=models.SET_NULL)

@receiver(models.signals.post_save, sender=ProductCategory)
def auto_set_category_path_on_change(sender, instance, **kwargs):
    if not instance.parent:
        instance_path = f"/{instance.id}/"
    else:
        instance_path = instance.parent.path + f"{instance.id}/"
    
    ProductCategory.objects.filter(pk=instance.pk).update(path=instance_path)


class Product(models.Model):
    title = models.CharField("Название", max_length=255)
    description = models.TextField("Описание")
    price = models.FloatField("Цена")

    published_at = models.DateTimeField("Опубликовано", null=True)
    created_at = models.DateTimeField("Создано", auto_now_add=True)
    updated_at = models.DateTimeField("Обновлено", auto_now=True)

    category = models.ForeignKey(ProductCategory, null=True, on_delete=models.SET_NULL)


class AttributeCategory(models.Model):
    category = models.ForeignKey(ProductCategory, null=True, on_delete=models.SET_NULL)
    title = models.CharField("Название", max_length=255)


class AttributeName(models.Model):
    attribute_category = models.ForeignKey(AttributeCategory, null=True, on_delete=models.SET_NULL)
    title = models.CharField("Название", max_length=255)

class AttributeValue(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    attribute_name = models.ForeignKey(AttributeName, null=True, on_delete=models.SET_NULL)
    value = models.CharField("Значение", max_length=255)


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

def dictfetchall(cursor):
    """
    Return all rows from a cursor as a dict.
    Assume the column names are unique.
    """
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]

def fetch_attribute_values_w_attribute_names_and_attribute_category_by_product_id(id):
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT products_attributevalue.value as value, products_attributename.title as attribute, products_attributecategory.title as attribute_category "\
            "FROM products_attributevalue "\
            "INNER JOIN products_attributename "\
            "ON products_attributevalue.attribute_name_id = products_attributename.id "\
            "INNER JOIN products_attributecategory "\
            "ON products_attributecategory.id = products_attributename.attribute_category_id " \
            f"WHERE products_attributevalue.product_id = {id} "
            )
        return dictfetchall(cursor)
    
def fetch_attributes_and_attribute_categories_by_category_id(id):
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT products_attributename.id as attributeNameId, products_attributename.title as attributeNameTitle, products_attributecategory.title as attributeCategoryTitle, products_attributecategory.id as attributeCategoryId "\
            "FROM products_attributename "\
            "INNER JOIN products_attributecategory "\
            "ON products_attributecategory.id = products_attributename.attribute_category_id " \
            f"WHERE products_attributecategory.category_id = {id} "
            )
        rows = dictfetchall(cursor)
        result_dict = {}
        for row in rows:
            attr_name_dict = {
                'attributeNameId': row['attributeNameId'],
                'attributeNameTitle': row['attributeNameTitle']
            }
            if row['attributeCategoryTitle'] in result_dict.keys():
                result_dict[row['attributeCategoryTitle']].append(attr_name_dict)
            else:
                result_dict[row['attributeCategoryTitle']] = [attr_name_dict]

        return result_dict