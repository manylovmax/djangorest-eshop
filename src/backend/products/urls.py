from django.urls import path, include
from rest_framework import routers

from  .views import ProductModelViewSet, ProductCategoryModelViewSet, AttributeCategoryModelViewSet, AttributeNameModelViewSet, AttributeValueModelViewSet, get_asignable_categories, \
    get_attribute_categories_for_product_category, get_attribute_names_for_attribute_category, get_attribute_values_for_product, \
    get_all_categories, get_attributes_and_attribute_categories_for_category, create_attribute_values_for_product, update_attribute_values, \
    delete_attribute_values, get_all_attribute_categories, get_all_attribute_names, get_categories_tree, load_images_for_product, \
    get_images_for_product, delete_images, get_products_cards_for_category, get_product, get_user, signup

router = routers.DefaultRouter()
router.register(r'product', ProductModelViewSet)
router.register(r'product-category', ProductCategoryModelViewSet)
router.register(r'attribute-category', AttributeCategoryModelViewSet)
router.register(r'attribute-name', AttributeNameModelViewSet)
router.register(r'attribute-value', AttributeValueModelViewSet)

urlpatterns = [
    path('api/', include([
        path('get-categories-tree/', get_categories_tree),
        path('get-products-cards/<int:category_id>', get_products_cards_for_category),
        path('get-product/<int:id>', get_product),
        path('attribute-names-for-category/<int:id>', get_attributes_and_attribute_categories_for_category),
        path('attribute-values-for-product/<int:id>', get_attribute_values_for_product),
        path('me', get_user),
        path('signup', signup),
    ])),
    path('api/admin/', include([
        path('', include(router.urls)),
        path('assignable-categories/', get_asignable_categories),
        path('all-categories/', get_all_categories),
        path('attribute-categories-for-product-category/<int:id>/', get_attribute_categories_for_product_category),
        path('attribute-names-for-attribute-category/<int:id>/', get_attribute_names_for_attribute_category),
        path('attribute-values-for-product/<int:id>/', get_attribute_values_for_product),
        path('attribute-names-for-category/<int:id>/', get_attributes_and_attribute_categories_for_category),
        path('create-attribute-values-for-product/', create_attribute_values_for_product),
        path('update-attribute-values/', update_attribute_values),
        path('delete-attribute-values/', delete_attribute_values),
        path('all-attribute-categories/', get_all_attribute_categories),
        path('all-attribute-names/', get_all_attribute_names),
        path('create-images-for-product/', load_images_for_product),
        path('images-for-product/<int:id>/', get_images_for_product),
        path('delete-images/', delete_images),
    ]))
]