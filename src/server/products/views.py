from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request

from .models import Product, ProductCategory, AttributeCategory, AttributeName, AttributeValue, \
fetch_attribute_values_w_attribute_names_and_attribute_category_by_product_id, fetch_attributes_and_attribute_categories_by_category_id
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
def get_all_categories(request):
    categories = ProductCategory.objects.all()
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


@api_view(['GET'])
def get_attributes_and_attribute_categories_for_category(request, id):
    rows =  fetch_attributes_and_attribute_categories_by_category_id(id)
    return Response(data=rows)


@api_view(['POST'])
def create_attribute_values_for_product(request):
    productId = request.data['productId']
    attributeNameIdVsAttributeValue = request.data['attributeNameIdVsAttributeValue']
    insert_objects_array = []
    for k,v in attributeNameIdVsAttributeValue.items():
        insert_objects_array.append(AttributeValue(product_id=productId, attribute_name_id=k, value=v))
    
    AttributeValue.objects.bulk_create(insert_objects_array)
    
    return Response(status=201)


@api_view(['POST'])
def update_attribute_values(request):
    attributeValueIdVsAttributeValue = request.data['attributeValueIdVsAttributeValue']
    update_objects_array = []
    for k,v in attributeValueIdVsAttributeValue.items():
        object = AttributeValue.objects.get(id=k)
        object.value = v
        update_objects_array.append(object)
    
    AttributeValue.objects.bulk_update(update_objects_array, ['value'])
    
    return Response(status=201)


@api_view(['POST'])
def delete_attribute_values(request: Request) -> Response:
    attributeValueIds = request.data['attributeValueIdList']   
    AttributeValue.objects.filter(id__in=attributeValueIds).delete()
    
    return Response(status=201)


@api_view(['GET'])
def get_all_attribute_categories(request: Request) -> Response:
    all_categories_objects = AttributeCategory.objects.all()
    attribute_category_serializer = AttributeCategorySerializer(all_categories_objects, many=True)
    return Response(data=attribute_category_serializer.data)


@api_view(['GET'])
def get_all_attribute_names(request: Request) -> Response:
    objects = AttributeName.objects.all()
    serializer = AttributeNameSerializer(objects, many=True)
    return Response(data=serializer.data)


@api_view(['GET'])
def get_categories_tree(request: Request) -> Response:
    def get_category_children(category: ProductCategory) -> list:
        subcategories = ProductCategory.objects.filter(parent=category).all()
        categories_list = list()
        for category in subcategories:
            category_dict = ProductCategorySerializer(category).data
            category_dict['subcategories'] = get_category_children(category)
            categories_list.append(category_dict)
        return categories_list

    first_level_categories = ProductCategory.objects.filter(parent=None).all()
    categories_list = list()
    for category in first_level_categories:
        category_dict = ProductCategorySerializer(category).data
        category_dict['subcategories'] = get_category_children(category)
        categories_list.append(category_dict)

    return Response(data=categories_list)
