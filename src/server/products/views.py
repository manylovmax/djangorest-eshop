from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product, ProductCategory, AttributeCategory, AttributeName, AttributeValue, \
fetch_attribute_values_w_attribute_names_and_attribute_category_by_product_id
from .serializers import ProductSerializer, ProductCategorySerializer, AttributeCategorySerializer, AttributeNameSerializer, AttributeValueSerializer


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


@api_view(['GET'])
def get_attribute_values_for_product(request, id):
    rows =  fetch_attribute_values_w_attribute_names_and_attribute_category_by_product_id(id)
    return Response(data=rows)

