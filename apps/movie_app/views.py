from django.shortcuts import render
import urllib, json


# Create your views here.
def index(request):
	arr =[""]
	url = "https://data.sfgov.org/api/views/yitu-d5am/rows.json?accessType=DOWNLOAD"
	response = urllib.urlopen(url)
	data = json.loads(response.read())
	for i in data['data']:
		if arr[len(arr)-1] != i[8]:
			arr.append(i[8])
	data = {"titles": arr}
	return render(request, 'movie_app/index.html', data)

def myfavorites(request):
	if request.method == "POST":
		context = {}
	
		return render(request, 'movie_app/myfavorites.html', context)