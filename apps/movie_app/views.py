from django.shortcuts import render

# Create your views here.
def index(request):
	return render(request, 'movie_app/index.html')

def myfavorites(request):
	if request.method == "POST":
		context = {
			'location1': request.POST['location1'],
			'location2': request.POST['location2'],
			'location3': request.POST['location3'],
			'location4': request.POST['location4'],
		}
		return render(request, 'movie_app/myfavorites.html', context)