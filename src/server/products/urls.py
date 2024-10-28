from django.urls import path, include
from rest_framework import routers

from  .views import ProductModelViewSet, ProductCategoryModelViewSet, AttributeCategoryModelViewSet, AttributeNameModelViewSet, AttributeValueModelViewSet, get_asignable_categories, \
    get_attribute_categories_for_product_category, get_attribute_names_for_attribute_category, get_attribute_values_for_product

router = routers.DefaultRouter()
router.register(r'product', ProductModelViewSet)
router.register(r'product-category', ProductCategoryModelViewSet)
router.register(r'attribute-category', AttributeCategoryModelViewSet)
router.register(r'attribute-name', AttributeNameModelViewSet)
router.register(r'attribute-value', AttributeValueModelViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('assignable-categories/', get_asignable_categories),
    path('attribute-categories-for-product-category/<int:id>/', get_attribute_categories_for_product_category),
    path('attribute-names-for-attribute-category/<int:id>/', get_attribute_names_for_attribute_category),
    path('attribute-values-for-product/<int:id>/', get_attribute_values_for_product),
]