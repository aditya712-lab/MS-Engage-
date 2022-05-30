import pandas as pd;
import numpy as np;
import pickle
import ast

from setup import loadSimilarity
data=pd.read_csv('tmdb_5000_movies.csv')

# print(data.head)
genreList = []
for genre in data.genres:
    val = eval(genre)
    genres = list(map(lambda x: x["name"], val))
    for i in genres:
        if i not in genreList:
            genreList.append(i)
# print(genreList)

def search_byname(dataset,cnt):
    ans=dataset.sort_values(by="budget",ascending=False)
    return ans.head(cnt)


def loadNewMovies(PATH):
	with open(PATH, 'rb') as inp:
		new_game = pickle.load(inp)
	return new_game

def hasGenre(row: pd.DataFrame, genre: list):
   
    for g in genre:
        if g not in row:
            return False
    return True

def searchByGenre(dataset, genre, count=20):
    searchFunc = np.vectorize(lambda x: hasGenre(x, genre))

    resultBoolean = searchFunc(data.genres)
    result = data[resultBoolean]
    return result.head(count)

similarity=loadSimilarity('similarity.pkl')
new_dt=loadNewMovies('new_dt.pkl')
def recommend(movie,count=5):
    index=new_dt[new_dt['title']==movie].index[0]
    distances=similarity[index]
    movies_list=sorted(list(enumerate(distances)),reverse=True,key=lambda x:x[1])[1:count+1]
    l=[]

    for i in movies_list:
        
        # l.append(i[0])
        # print((new_dt.iloc[i[0]].movie_id))
        l.append(int(new_dt.iloc[i[0]].movie_id))
    return l


# print(new_dt)
# recommend('Harry Potter and the Half-Blood Prince')

# print(recommend('Harry Potter and the Half-Blood Prince'))


# print(new_dt)





def category(name):
    
    # for i in range(len(list_of_movies)):
    #     check = check_of_genre(name, list_of_movies.iat[i,2])
    #     if check:
    #         arr.append(list_of_movies.iat[i,2])
    searchByName = np.vectorize(lambda x: name.lower() in x.lower())
    res = searchByName(new_dt.title)
    print(res)
    return new_dt[res]


if __name__ == '__main__':
    print(searchByGenre(data, ["Action", "Science Fiction"]))