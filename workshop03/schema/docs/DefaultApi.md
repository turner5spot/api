# openapi_client.DefaultApi

All URIs are relative to *http://localhost:3040*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_cities_from_state**](DefaultApi.md#get_cities_from_state) | **GET** /api/state/{stateId} | 
[**get_states**](DefaultApi.md#get_states) | **GET** /api/states | 


# **get_cities_from_state**
> list[City] get_cities_from_state(state_id, offset=offset, limit=limit)



get a city in state

### Example

```python
from __future__ import print_function
import time
import openapi_client
from openapi_client.rest import ApiException
from pprint import pprint

# Enter a context with an instance of the API client
with openapi_client.ApiClient() as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    state_id = openapi_client.States() # States | 
offset = 3.4 # float |  (optional)
limit = 3.4 # float |  (optional)

    try:
        api_response = api_instance.get_cities_from_state(state_id, offset=offset, limit=limit)
        pprint(api_response)
    except ApiException as e:
        print("Exception when calling DefaultApi->get_cities_from_state: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **state_id** | [**States**](.md)|  | 
 **offset** | **float**|  | [optional] 
 **limit** | **float**|  | [optional] 

### Return type

[**list[City]**](City.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_states**
> list[str] get_states()



get a list of all /api/states

### Example

```python
from __future__ import print_function
import time
import openapi_client
from openapi_client.rest import ApiException
from pprint import pprint

# Enter a context with an instance of the API client
with openapi_client.ApiClient() as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    
    try:
        api_response = api_instance.get_states()
        pprint(api_response)
    except ApiException as e:
        print("Exception when calling DefaultApi->get_states: %s\n" % e)
```

### Parameters
This endpoint does not need any parameter.

### Return type

**list[str]**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Default reprezentation |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

