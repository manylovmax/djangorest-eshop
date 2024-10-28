from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product, ProductCategory, AttributeCategory, AttributeName, AttributeValue
from .serializers import ProductSerializer, ProductCategorySerializer, AttributeCategorySerializer, AttributeNameSerializer, AttributeValueSerializer

from django.db import connection


class ProductModelViewSet(ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class ProductCategoryModelViewSet(ModelViewSet):
    serializer_class = ProductCategorySerializer
    queryset = ProductCategory.objects.all()


class AttributeCategoryModelViewSet(ModelViewSet):
    serializer_class = AttributeCategorySerializer
    queryset = AttributeCategory.objects.all()


class AttributeNameModelViewSet(ModelViewSet):
    serializer_class = AttributeNameSerializer
    queryset = AttributeName.objects.all()


class AttributeValueModelViewSet(ModelViewSet):
    serializer_class = AttributeValueSerializer
    queryset = AttributeValue.objects.all()


@api_view(['GET'])
def get_asignable_categories(request):
    categories = ProductCategory.objects.filter(assignable=True).all()
    categories_serializer =  ProductCategorySerializer(categories, many=True)
    return Response(data=categories_serializer.data)

@api_view(['GET'])
def get_attribute_categories_for_product_category(request, id):
    categories = AttributeCategory.objects.filter(category__id=id).all()
    categories_serializer =  AttributeCategorySerializer(categories, many=True)
    return Response(data=categories_serializer.data)

@api_view(['GET'])
def get_attribute_names_for_attribute_category(request, id):
    models = AttributeName.objects.filter(attribute_category__id=id).all()
    models_serializer =  AttributeNameSerializer(models, many=True)
    return Response(data=models_serializer.data)

def dictfetchall(cursor):
    """
    Return all rows from a cursor as a dict.
    Assume the column names are unique.
    """
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]


@api_view(['GET'])
def get_attribute_values_for_product(request, id):
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
        rows = dictfetchall(cursor)
    return Response(data=rows)

