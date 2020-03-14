import openapi_client

api_instance = openapi_client.DefaultApi()
#api_response = api_instance.get_cities_from_state("RI", offset=2, limit=2)
api_states = api_instance.get_states()
#print(api_states)
for s in api_states:
    if s != "LA":
        city = api_instance.get_cities_from_state(s)
        print("api_output =", city)