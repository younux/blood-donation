from rest_framework import serializers
from ..models import BloodCenter
from accounts.api.serializers import AddressSerializer
from accounts.models import Address

class BloodCenterSerializer(serializers.ModelSerializer):
    """
    Blood Center serializer
    """
    address = AddressSerializer()

    class Meta :
        model = BloodCenter
        fields = [
            'id',
            'name',
            'address',
            'latitude',
            'longitude',
        ]
        extra_kwargs = {
            'id': {"read_only": True},
        }

    def create(self, validated_data):
        """
            Implement .create() to be able to create instances that will be saved by the view.
            This method should defined to be able to create writable nested fields.
        """
        name = validated_data.get('name')
        address = validated_data.get('address')
        latitude = validated_data.get('latitude')
        longitude = validated_data.get('longitude')

        address_obj = Address.objects.create(**address)
        blood_center = BloodCenter.objects.create(name = name,
                                                  address = address_obj,
                                                  latitude = latitude,
                                                  longitude = longitude)
        return blood_center

    def update(self, instance, validated_data):
        """
            Implement .update() to be able to update instances.
            This method should defined to be able to update writable nested fields.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.address.street = validated_data.get('address').get('street', instance.address.street)
        instance.address.city = validated_data.get('address').get('city', instance.address.city)
        instance.address.country = validated_data.get('address').get('country', instance.address.country)
        instance.address.zip_code = validated_data.get('address').get('zip_code', instance.address.zip_code)
        instance.latitude = validated_data.get('latitude', instance.latitude)
        instance.longitude = validated_data.get('longitude', instance.longitude)
        instance.address.save()
        instance.save()
        return instance


