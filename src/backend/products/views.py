from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.request import Request
from django.core.files import File
# from  rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

import math

from .models import Product, ProductCategory, AttributeCategory, AttributeName, AttributeValue, ProductImage, \
fetch_attribute_values_w_attribute_names_by_product_id, fetch_attributes_and_attribute_categories_by_category_id
from .serializers import ProductSerializer, ProductCategorySerializer, AttributeCategorySerializer, AttributeNameSerializer, AttributeValueSerializer, \
ProductImageSerializer


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
    rows =  fetch_attribute_values_w_attribute_names_by_product_id(id)
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

# TODO: кешировать дерево категорий
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


@api_view(['POST'])
@parser_classes([MultiPartParser])
def load_images_for_product(request: Request) -> Response:
    product_id = request.data['productId']

    for idx, image in enumerate(request.FILES.values()):
        model = ProductImage(product_id=product_id, file=File(image), position=idx)
        model.save()
    
    return Response(status=201)


@api_view(['GET'])
def get_images_for_product(request: Request, id: int) -> Response:
    images = ProductImage.objects.filter(product_id=id).all()
    data = ProductImageSerializer(images, many=True).data

    return Response(data)


@api_view(['POST'])
def delete_images(request: Request) -> Response:
    images_ids = request.data["imagesIdList"]
    ProductImage.objects.filter(id__in=images_ids).delete()

    return Response(status=201)


@api_view(['GET'])
def get_products_cards_for_category(request: Request, category_id: int) -> Response:
    PAGE_SIZE = 8
    page_number = int(request.GET.get('page', 1))
    products = Product.objects.filter(category__path__contains=f'/{category_id}/').all()[((page_number -1) * PAGE_SIZE):(page_number * PAGE_SIZE)]
    products_count = Product.objects.filter(category__path__contains=f'/{category_id}/').count()
    pages_count = math.ceil(products_count / PAGE_SIZE)
    products_serialized = ProductSerializer(products, many=True).data
    for product_dict in products_serialized:
        images = ProductImage.objects.filter(product_id=product_dict['id']).all()
        images_serialized = ProductImageSerializer(images, many=True).data
        product_dict['images'] = images_serialized
    
    return Response({
        'count': products_count,
        'pages': pages_count,
        'pageNumber': page_number,
        'hasPrevious': page_number > 1,
        'hasNext': page_number < pages_count,
        'results': products_serialized
    })


@api_view(['GET'])
def get_product(request: Request, id: int) -> Response:
    product = Product.objects.get(pk=id)
    product_serialized = ProductSerializer(product).data
    images = ProductImage.objects.filter(product_id=id).all()
    images_serialized = ProductImageSerializer(images, many=True).data
    product_serialized['images'] = images_serialized
    category = product.category
    category_serialized = ProductCategorySerializer(category).data
    product_serialized['category'] = category_serialized
    categories_ids = category.path.split('/')[1:-1]
    path_categories = ProductCategory.objects.filter(id__in=categories_ids).all()
    path_categories_serialized = ProductCategorySerializer(path_categories, many=True).data
    product_serialized['pathCategories'] = path_categories_serialized

    return Response(data=product_serialized)


@api_view(['GET'])
# @authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_user(request: Request) -> Response:
    return Response(data={
        'firstName': request.user.first_name,
        'lastName': request.user.last_name,
        'isAdmin': request.user.is_superuser
    })
