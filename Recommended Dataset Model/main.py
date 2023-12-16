import numpy as np
import pandas as pd
import difflib
import time
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

start_time = time.time()
movies_data = pd.read_csv('/home/ran/trialML/movies.csv')


# movies_data.shape

# selecting the relevant features for recommendation

# selected_features = ['genres','keywords','tagline','cast','director']
selected_features = ['genres']
print(selected_features)

# replacing the null valuess with null string

for feature in selected_features:
  movies_data[feature] = movies_data[feature].fillna('')

# combining all the 5 selected features

# combined_features = movies_data['genres']+' '+movies_data['keywords']+' '+movies_data['tagline']+' '+movies_data['cast']+' '+movies_data['director']
combined_features = movies_data['genres']
# converting the text data to feature vectors

vectorizer = TfidfVectorizer()

feature_vectors = vectorizer.fit_transform(combined_features)


# getting the similarity scores using cosine similarity

similarity = cosine_similarity(feature_vectors)


    
def pastMoviesIndex(movie_name):
  # getting the movie name from the user

    # creating a list with all the movie names given in the dataset
    list_of_all_titles = movies_data['title'].tolist()
    # print(list_of_all_titles)

    # finding the close match for the movie name given by the user

    find_close_match = difflib.get_close_matches(movie_name, list_of_all_titles)

    close_match = find_close_match[0]

    # finding the index of the movie with title

    index_of_the_movie = movies_data[movies_data.title == close_match]['index'].values[0]
    return index_of_the_movie

# getting a list of similar movies
watchedMovies = ['iron man','spider man',"iron man 2",'hulk','Avatar',"Pirates of the Caribbean: At World's End"]
indexes = []
for i in watchedMovies:
   indexes.append(pastMoviesIndex(i))

def sortedSimilarMoviesFunc(sorted_similar_movies):
    moviesSimilar = []
    i = 1

    for movie in sorted_similar_movies:
        index = movie[0]
        title_from_index = movies_data[movies_data.index==index]['id'].values[0]
        if (i<10):
            moviesSimilar.append(title_from_index)
            i+=1

    return moviesSimilar

def similarityScoreCreator(index_of_the_movie):
    similarity_score = list(enumerate(similarity[index_of_the_movie]))
    sorted_similar_movies = sorted(similarity_score, key = lambda x:x[1], reverse = True) 

    return sortedSimilarMoviesFunc(sorted_similar_movies)




# print((similarityScoreCreator(indexes[0])))

commonMovies = []
for i in indexes:
    commonMovies+=(similarityScoreCreator(i))

print(commonMovies)

print('\n\n\n')
print('\n\n\n')
print('\n\n\n')

print(set(list(set(commonMovies))[:10]))  


