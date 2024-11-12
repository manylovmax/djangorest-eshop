from rest_framework import serializers
from .models import Product, ProductCategory, AttributeCategory, AttributeName, AttributeValue
        

class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class AttributeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AttributeCategory
        fields = '__all__'


class AttributeNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttributeName
        fields = '__all__'


class AttributeValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttributeValue
        fields = '__all__'
